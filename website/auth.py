from flask import Blueprint, render_template, request, redirect, url_for
from .models import *
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_user, login_required, logout_user, current_user
from .views import *
from faker import Faker
import random
from random import randrange

fake_data = Faker()

auth = Blueprint('auth', __name__)
global new_user


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
            use_case_email = User.query.filter_by(email=email).first()
            use_case_phone = User.query.filter_by(phone_number=phone).first()
            use_case_username = User.query.filter_by(username=username).first()
            if use_case_email or use_case_phone or use_case_username:
                return render_template('register.html', confirmation="User already exists", user=current_user)
            new_user = User(email=email, password=generate_password_hash(password, method='sha256'), username=username,
                            phone_number=phone)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('views.additional_info'))
    return render_template("register.html", user=current_user)


@views.route("/find")
@login_required
def find_roomie():
    fake_name = []
    fake_text = []
    fake_hobbies = []
    fake_nums = []
    bios = [
        " I am currently a freshman student pursuing my Bachelor's degree in Law At VIPS, Delhi. I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At KIIT, Odisha. I love to do Community work and generally help people!",
        "I am currently a fresher at Chandigarh University pursuing my Bachelor's degree in Computer Applications . I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Fashion At Amity , Noida. I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At JIMS, Rohini. I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At VIPS, Rohini. I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Computer Applications from ASCM Panipath. I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At IMS Ghaziabad. I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At . I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Administration At IMS , Rohtak. I love to do Community work and generally help people!",
        ", I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At ABES Noida. I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Economics At JIMS, Rohini. I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At ABES Delhi. I love to play football and basketball and read comics in my free times",
        "I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At VIT Chennai.I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Medicine At BMSIT ,Bangalore I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At LPU . I love to do read books and to do coding in my free time",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At Benett University. I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Finance At Op Jindal, Sonipat.I love to do Community work and generally help people!",
        "I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At Vit Bhopal. I love to do Community work and generally help people!",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At IIT Bombay. I love to take part in Hackathons and to make projects!",
        " I am currently a freshman student pursuing my medical degree  at ASMC Pratapgarh . I love to do social help and to be a part of NGOs.",
        " I am currently a freshman student pursuing my Bachelor's degree in Computer Applications At IIT Madrass. I love to do Community work and generally help people!"]
    prifile_pic_list = []
    for i in range(5):
        fake_name.append(fake_data.name())
    for i in range(5):
        fake_text.append(random.choice(bios))
    my_skills = ["Reading", "Writing", "Movies", "Cooking", "Comedy", "Sports", "Marvel", "Anime", "Manga", "Cycling",
                 "Fitness", "Gymming", "Photography", "Coding", "Gaming", "Studying", "Travel", "Partying",
                 "Content Creation", "Languages", "Philosophy", "Binge watching", "Dancing", "Singing", "Song Writing",
                 "Beatboxing", "Martial arts", "Kdramas", "Public speaking", "Hollywood", "Painting"]
    for i in range(5):
        fake_nums.append(random.randint(0, 14))
    for i in range(5):
        fake_hobbies.append(random.sample(my_skills, 5))
    for i in range(5):
        num = random.randint(1,14)
        prifile_pic_list.append(num)

    fake_data_handler = zip(fake_name, fake_text, fake_hobbies, fake_nums,prifile_pic_list)
    # print(list(fake_data_handler))
    return render_template('find_roomie.html', user=current_user,
                           suggested_data=fake_data_handler)
