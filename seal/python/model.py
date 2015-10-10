#!/usr/bin/env python

from flask.ext.sqlalchemy import SQLAlchemy
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    location = db.Column(db.String(120))

    scheduled_trips = db.relationship('ScheduledTrip', backref='user')
    trip_reservations = db.relationship('TripReservation', backref='user')
    cars = db.relationship('Car', backref='user')
    trip_passengers = db.relationship('TripPassenger', backref='user')

    def __init__(self, username, first_name, last_name, email, location):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.location = location

    def __repr__(self):
        return '<User {0}>'.format(self.username)
    def to_json(self):
        return {
                    'id': self.id,
                    'username': self.username,
                    'first_name': self.first_name,
                    'last_name': self.last_name,
                    'email': self.email,
                    'location': self.location,
                    'cars':[item.to_json() for item in self.cars]
                }


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    year = db.Column(db.Integer)
    mpg = db.Column(db.Float)
    emissions = db.Column(db.Float)

    trips = db.relationship('Trip', backref='car')

    def __init__(self, user, make, model, year, mpg, emissions):
        self.user = user
        self.make = make
        self.model = model
        self.year = year
        self.mpg = mpg
        self.emissions = emissions
    def __repr__(self):
        return "<Car userid:{0} carid:{1}>".format(self.user_id, self.car_type_id)
    def to_json(self):
        print self.emissions
        return {
                    'id' : self.id,
                    'user': self.user.to_json(),
                    'make': self.make,
                    'model': self.model,
                    'year': self.year,
                    'mpg': self.mpg,
                    'emissions': self.emissions,
                }

class ScheduledTrip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    lat_start = db.Column(db.Float)
    long_start = db.Column(db.Float)
    lat_end = db.Column(db.Float)
    long_end = db.Column(db.Float)
    date = db.Column(db.DateTime)


    trip_reservations = db.relationship('TripReservation', backref='scheduledtrip')
    trips = db.relationship('Trip', backref='scheduledtrip')

    def __init__(self, user, lat_start, long_start, lat_end, long_end, date):
        self.user = user
        self.lat_start = lat_start
        self.long_start = long_start
        self.lat_end = lat_end
        self.long_end = long_end
        self.date = date
    def __repr__(self):
        return '<ScheduledTrip {0}>'.format(self.id)
    def to_json(self):
        return {
                    'id' : self.id,
                    'user': self.user.to_json(),
                    'lat_start': self.lat_start,
                    'long_start': self.long_start,
                    'lat_end': self.lat_end,
                    'long_end': self.long_end,
                    'date': self.date,
                }

class TripReservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    sch_trip_id = db.Column(db.Integer, db.ForeignKey('scheduled_trip.id'))

    def __init__(self, user, scheduledtrip):
        self.user = user
        self.scheduledtrip = scheduledtrip

    def to_json(self):
        return {
                    'id' : self.id,
                    'user': self.user.to_json(),
                    'scheduledtrip': self.scheduledtrip.to_json(),
                }
class TripPassenger(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    emissions_saved = db.Column(db.Float)
    fuel_saved = db.Column(db.Float)

    def __init__(self, trip, user, emissions_saved, fuel_saved):
        self.trip = trip
        self.user = user
        self.emissions_saved = emissions_saved
        self.fuel_saved = fuel_saved

    def to_json(self):
        return {
                    'id' : self.id,
                    'user': self.user.to_json(),
                    'trip': self.trip.to_json(),
                    'emissions_saved': self.emissions_saved,
                    'fuel_saved': self.fuel_saved
                }


class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sch_trip_id = db.Column(db.Integer, db.ForeignKey('scheduled_trip.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('car.id'))

    trip_passengers = db.relationship('TripPassenger', backref='trip')

    def __init__(self, sch_trip, car):
        self.scheduledtrip = sch_trip
        self.car = car

    def to_json(self):
        return {
                    'id' : self.id,
                    'scheduledtrip': self.scheduledtrip.to_json(),
                    'car': self.car.to_json(),
                }
