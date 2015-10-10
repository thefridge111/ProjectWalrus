import flask
from flask import Flask, request
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.cors import CORS
import logging
import json
from geopy.distance import vincenty
from datetime import datetime

app = Flask('seal')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
CORS(app)
db = SQLAlchemy(app)

DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
VERSION = 'v1.0'
URL_PREFIX = '/api/{0}'.format(VERSION)

import model



@app.route(URL_PREFIX + '/profile', methods=['GET'])
def get_profiles():
    response = {
            'results': ([item.to_json() for item in model.User.query.all()])
            }
    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/profile/<int:profile_id>', methods=['GET'])
def get_profile(profile_id):
    user = model.User.query.filter_by(id=profile_id).first()
    if user is None:
        return "{}"
    return flask.jsonify(**user.to_json())

@app.route(URL_PREFIX + '/profile', methods=['POST'])
def create_profile():
    if not request.json:
        abort(400)

    r = request.json
    new_user = model.User(r['username'], r['first_name'], r['last_name'], r['email'], r['location'])

    db.session.add(new_user)
    db.session.commit()

    response = {
                'id': new_user.id
                }

    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/login', methods=['POST'])
def login_user():
    if not request.json:
        abort(400)

    r = request.json
    nuser = model.User.query.filter_by(username=r["username"]).first()
    if nuser is None:
        id = -1
    else:
        id = nuser.id

    response = {
                'id': id
                }

    return flask.jsonify(**response)


@app.route(URL_PREFIX + '/car/reserve/<int:reservation_id>', methods=['GET'])
def get_cars_for_reservation(reservation_id):
    reservation = model.TripReservation.query.filter_by(id=reservation_id).first()

    if reservation is None:
        cars = []
    else:
        other_reserve = model.TripReservation.query.filter_by(sch_trip_id=reservation.sch_trip_id)
        cars = []
        for reserve in other_reserve:
            cars += reserve.user.cars

    response = {
                'results': [item.to_json() for item in cars]
                }

    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/car/<int:profile_id>', methods=['GET'])
def get_cars(profile_id):
    user = model.User.query.filter_by(id=profile_id).first()
    if user is None:
        cars = []
    else:
        cars = user.cars
    response = {
                'results': [item.to_json() for item in cars]
                }

    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/car/<int:profile_id>', methods=['POST'])
def add_car(profile_id):
    if not request.json:
        abort(400)

    r = request.json

    user = model.User.query.filter_by(id=profile_id).first()
    new_car = model.Car(user, r['make'], r['model'], r['year'],r['mpg'],r['emissions'])
    user.cars.append(new_car)
    db.session.commit()

    return '{}'

@app.route(URL_PREFIX + '/scheduledtrip', methods=['POST'])
def create_scheduled_trip():
    if not request.json:
        abort(400)

    r = request.json

    date = datetime.strptime(r["date"], DATE_FORMAT)

    user = model.User.query.filter_by(id=r["user_id"]).first()
    new_trip = model.ScheduledTrip(user, r["lat_start"], r["long_start"], r["lat_end"], r["long_end"], date)

    db.session.add(new_trip)
    db.session.commit()

    response = {
            'id': new_trip.id
            }
    return flask.jsonify(**response)


@app.route(URL_PREFIX + '/scheduledtrip', methods=['GET'])
def get_scheduled_trips():

    lat_start = float(request.args.get("lat_start"))
    long_start = float(request.args.get("long_start"))
    lat_end = float(request.args.get("lat_end"))
    long_end = float(request.args.get("long_end"))

    start_time = datetime.strptime(request.args.get("start_time"), DATE_FORMAT)
    end_time = datetime.strptime(request.args.get("end_time"), DATE_FORMAT)

    distance = float(request.args.get("distance"))

    scheduled_trips = model.ScheduledTrip.query.filter(db.and_(model.ScheduledTrip.date <= end_time, model.ScheduledTrip.date >= start_time))

    trips = []

    for trip in scheduled_trips:
        start_distance = vincenty((lat_start, long_start), (trip.lat_start, trip.long_start)).miles
        start_good = start_distance < distance
        end_distance = vincenty((lat_end, long_end), (trip.lat_end, trip.long_end)).miles
        end_good =  end_distance < distance
        print (lat_start, long_start), (trip.lat_start, trip.long_start)
        print "{0} {1}".format(start_distance, end_distance)
        print start_good, end_good
        if start_good and end_good:
            trips.append(trip.to_json())

    response = {
            'results': trips
            }
    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/reservation', methods=['POST'])
def create_reservation():
    if not request.json:
        abort(400)

    r = request.json
    user = model.User.query.filter_by(id=r["user_id"]).first()
    scheduled_trip = model.ScheduledTrip.query.filter_by(id=r["sch_trip_id"]).first()

    if user is None:
        abort(400)
    if scheduled_trip is None:
        abort(400)

    reservation = model.TripReservation(user, scheduled_trip)
    user.trip_reservations.append(reservation)

    response = {
            'id': reservation.id
            }
    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/reservation/<int:userId>', methods=['GET'])
def get_reservations_for_user(userId):
    user = model.User.query.filter_by(id=userId).first()

    if user is None:
        results = []
    else:
        results = [item.to_json() for item in user.trip_reservations]
        results = []
        for item in user.trip_reservations:
            found = False
            if len(item.scheduledtrip.trips) == 0:
                results.append(item.to_json())
                continue
            for passenger in item.scheduledtrip.trips[0].trip_passengers:
                if passenger.user_id == user.id:
                    found = True
                    break
            if not found:
                results.append(item.to_json())

    response = {
            'results': results
            }
    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/reservation/id/<int:reservationId>', methods=['GET'])
def get_reservations_by_id(reservationId):
    reservation = model.TripReservation.query.filter_by(id=reservationId).first()
    return flask.jsonify(**reservation.to_json())


@app.route(URL_PREFIX + '/confirm/<int:reservationId>', methods=['POST'])
def confirm_reservation(reservationId):
    if not request.json:
        abort(400)

    r = request.json
    carId = r["car_id"]


    car = model.Car.query.filter_by(id=carId).first()
    reservation = model.TripReservation.query.filter_by(id=reservationId).first()
    sch_trip = reservation.scheduledtrip

    user = reservation.user
    if len(sch_trip.trips) <= 0:
        ntrip = model.Trip(sch_trip, car)
        sch_trip.trips.append(ntrip)
    else:
        ntrip = sch_trip.trips[0]

    #todo choose best car

    distance = vincenty((sch_trip.lat_start, sch_trip.long_start), (sch_trip.lat_end, sch_trip.long_end)).miles

    passenger_car = user.cars[0]
    if passenger_car is None:
        emis_saved = 0
        fuel_saved = 0
    else:
        emis_saved = passenger_car.emissions - (car.emissions / len(sch_trip.trip_reservations))

        passenger_car_gas = distance * passenger_car.mpg
        driver_car_gas = distance * car.mpg

        fuel_saved = passenger_car_gas - (driver_car_gas / len(sch_trip.trip_reservations))

    npassenger = model.TripPassenger(ntrip, user, emis_saved, fuel_saved)

    ntrip.trip_passengers.append(npassenger)
    db.session.commit()

    response = {
            'emission_saved': emis_saved,
            'fuel_saved': fuel_saved
            }
    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/stats/<int:userId>', methods=['GET'])
def stats(userId):
    user = model.User.query.filter_by(id=userId).first()
    emis_saved = 0
    fuel_saved = 0
    for trip in user.trip_passengers:
        emis_saved += trip.emissions_saved
        fuel_saved += trip.fuel_saved


    response = {
            'emission_saved': emis_saved,
            'fuel_saved': fuel_saved
            }
    return flask.jsonify(**response)

@app.route(URL_PREFIX + '/leaderboard/', methods=['GET'])
def leaderboard():
    users = model.User.query.all()
    for user in users:
        emis_sum = 0
        for trippass in user.trip_passengers:
            emis_sum += trippass.emissions_saved
        user.emis_sum = emis_sum
    def getKey(user):
        return user.emis_sum
    users = sorted(users, user, reverse=True)

    results = []
    for item in users:
        n_item = item.to_json()
        n_item["emis_sum"] = item.emis_sum
        results.append(n_item)
    response = {
            'results': results
            }
    return flask.jsonify(**response)


if __name__ == '__main__':
    from app import db
    db.create_all()
    app.run(host='0.0.0.0', debug=True)


