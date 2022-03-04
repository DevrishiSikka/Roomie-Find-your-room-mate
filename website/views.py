from flask import Blueprint, render_template, request
from flask_login import login_required, current_user

views = Blueprint('views', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


@views.route('/')
def homepage():
    return render_template("homepage.html", user=current_user)


@views.route('/about')
def about():
    return render_template("about.html", user=current_user)


@views.route("/find")
@login_required
def find_roomie():
    return "<h1>here is roomie</h1>"


@views.route("/profile", methods=["POST","GET"])
def profile():
    if request.method == "POST":
        print(request.form)
    return render_template("profile.html")
