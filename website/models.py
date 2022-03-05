from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class GeneralInfo(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(255))
    l_name = db.Column(db.String(255))
    address = db.Column(db.String(1000))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    zip = db.Column(db.Integer)
    country = db.Column(db.String(255))
    college = db.Column(db.String(10000))
    course = db.Column(db.String(1000))
    branch = db.Column(db.String(100))
    year = db.Column(db.Integer)
    hobby_1 = db.Column(db.String(100))
    hobby_2 = db.Column(db.String(100))
    hobby_3 = db.Column(db.String(100))
    hobby_4 = db.Column(db.String(100))
    hobby_5 = db.Column(db.String(100))
    bio = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(255))
    username = db.Column(db.String(255), unique=True)
    phone_number = db.Column(db.Integer, unique=True)
    date = db.Column(db.DateTime(timezone=True), default=func.now())


