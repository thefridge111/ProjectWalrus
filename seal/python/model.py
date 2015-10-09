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


class CarType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    year = db.Column(db.Integer)
    mpg = db.Column(db.Float)
    emissions = db.Column(db.Float)

    cars = db.relationship('Car', backref='cartype')

    def __init__(self, make, model, year, mpg, emissions):
        self.make = make
        self.model = model
        self.year = year
        self.mpg = mpg
        self.emissions = emissions

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('car_type.id'))

    trips = db.relationship('Trip', backref='car')

    def __init__(self, user, cartype):
        self.user = user
        self.cartype = cartype
    def __repr__(self):
        return "<Car userid:{0} carid:{1}>".format(self.user_id, self.car_id)

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

    def __init__(self, user_id, lat_start, long_start, lat_end, long_end, date):
        self.user_id = user_id
        self.lat_start = lat_start
        self.long_start = long_start
        self.lat_end = lat_end
        self.long_end = long_end
    def __repr__(self):
        return '<ScheduledTrip {0}>'.format(self.id)

class TripReservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    sch_trip_id = db.Column(db.Integer, db.ForeignKey('scheduled_trip.id'))

    def __init__(self, user_id, sch_trip_id):
        self.user_id = user_id
        self.sch_trip_id = sch_trip_id
class TripPassenger(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    emissions_saved = db.Column(db.Float)
    fuel_saved = db.Column(db.Float)

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sch_trip_id = db.Column(db.Integer, db.ForeignKey('scheduled_trip.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('car.id'))

    trip_passengers = db.relationship('TripPassenger', backref='trip')

