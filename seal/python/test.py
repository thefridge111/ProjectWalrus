from app import db
from model import *

db.create_all()

jhartley = User('jhartley', 'Josh', 'Hartley', 'jhartley@jhartley.net', 'Northfield, MA')
carty = CarType('make', 'model', 1023, 23, 33)
car = Car(jhartley, carty)

db.session.add(jhartley)
db.session.add(carty)
db.session.add(car)

db.session.commit()

users = User.query.all()

print jhartley.cars
