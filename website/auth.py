from flask import Blueprint, render_template, request, redirect, url_for
from .models import *
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('views.find_roomie'))
    else:
        if request.method == "POST":
            username = request.form.get('username')
            password = request.form.get('password')
            user = User.query.filter_by(username=username).first()
            if user:
                if check_password_hash(user.password, password):
                    login_user(user, remember=True)
                    return redirect(url_for('views.homepage'))
                else:
                    return render_template("login.html", comment="Username and/or incorrect!")
            else:
                return render_template("login.html", comment="Email does not exist")
    return render_template('login.html')


@auth.route('/logout', methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.homepage'))


@auth.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('views.find_roomie'))
    else:
        if request.method == "POST":
            username = request.form.get("username")
            email = request.form.get("email")
            password = request.form.get("password")
            phone = request.form.get("phone")
            new_user = User(email=email, password=generate_password_hash(password, method='sha256'),username=username,phone_number=phone)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            return redirect(url_for('views.homepage'))
    return render_template("register.html", user=current_user)

