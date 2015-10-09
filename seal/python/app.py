from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import logging

#logging.basicConfig(level=logging.DEBUG)
#t@github.com:thefridge111/ProjectWalrus.gitlogging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)

app = Flask('seal')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

import model

