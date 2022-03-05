from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user, login_user
from .models import *
from faker import Faker

fake_data = Faker()

views = Blueprint('views', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
loginned = True


@views.route('/')
def homepage():
    return render_template("homepage.html", user=current_user)


@views.route('/about')
def about():
    return render_template("about.html", user=current_user)


@views.route("/info", methods=["POST", "GET"])
def additional_info():
    if current_user.is_authenticated:
        return redirect(url_for('views.find_roomie'))
    else:
        if request.method == "POST":
            f_name = request.form.get('f_name')
            l_name = request.form.get('l_name')
            addr = request.form.get('addr')
            city = request.form.get('city')
            state = request.form.get('state')
            zip = request.form.get('zip')
            country = request.form.get('country')
            college_name = request.form.get('college_name')
            course = request.form.get('course')
            branch = request.form.get('branch')
            year = request.form.get('year')
            h_1 = request.form.get('h1')
            h_2 = request.form.get('h2')
            h_3 = request.form.get('h3')
            h_4 = request.form.get('h4')
            h_5 = request.form.get('h5')
            bio = request.form.get('bio')
            new_user_info = GeneralInfo(f_name=f_name, l_name=l_name, address=addr, city=city, state=state, zip=zip,
                                        country=country, college=college_name, course=course, branch=branch, year=year,
                                        hobby_1=h_1, hobby_2=h_2, hobby_3=h_3, hobby_4=h_4, hobby_5=h_5)
            db.session.add(new_user_info)
            db.session.commit()
            login_user(new_user_info, remember=True)
            return redirect(url_for('auth.login'))
    return render_template('dashboard.html')
