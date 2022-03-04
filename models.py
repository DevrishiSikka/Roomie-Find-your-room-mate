from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class GeneralInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    college = db.Column(db.String(10000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(255))
    username = db.Column(db.String(255))
    phone_number = db.Column(db.Integer, unique=True)
    date = db.Column(db.DateTime(timezone=True), default=func.now())

# first_name = db.Column(db.String(255))
# last_name = db.Column(db.String(255))
