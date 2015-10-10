import flask
from flask import Flask, request
from flask.ext.sqlalchemy import SQLAlchemy
import logging
import json

app = Flask('seal')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

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
    return flask.jsonify(**model.User.query.filter_by(id=profile_id).first().to_json())

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
    id = model.User.query.filter_by(username=r["username"]).first().id
    response = {
                'id': id
                }

    return flask.jsonify(**response)



if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', debug=True)


