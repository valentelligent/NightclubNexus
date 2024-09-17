from flask import Blueprint, request, jsonify, render_template, redirect, url_for, flash, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app import db
import logging

bp = Blueprint('auth', __name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if not username or not email or not password:
            flash('All fields are required.', 'error')
            return redirect(url_for('auth.register'))
        
        try:
            if User.query.filter_by(username=username).first():
                flash('Username already exists', 'error')
                return redirect(url_for('auth.register'))
            if User.query.filter_by(email=email).first():
                flash('Email already exists', 'error')
                return redirect(url_for('auth.register'))
            
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            
            logger.info(f"New user registered: {username}")
            flash('Registration successful. Please log in.', 'success')
            return redirect(url_for('auth.login'))
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error during registration: {str(e)}")
            flash('An error occurred during registration. Please try again.', 'error')
    
    return render_template('auth/register.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if not username or not password:
            flash('Both username and password are required.', 'error')
            return redirect(url_for('auth.login'))
        
        try:
            user = User.query.filter_by(username=username).first()
            if user and user.check_password(password):
                login_user(user)
                access_token = create_access_token(identity=user.id)
                response = make_response(redirect(url_for('main.index')))
                set_access_cookies(response, access_token)
                response.set_cookie('access_token_cookie', access_token, httponly=True, secure=True, samesite='Strict')
                logger.info(f"User logged in: {username}")
                flash('Logged in successfully.', 'success')
                return response
            
            flash('Invalid username or password', 'error')
        except Exception as e:
            logger.error(f"Error during login: {str(e)}")
            flash('An error occurred during login. Please try again.', 'error')
    
    return render_template('auth/login.html')

@bp.route('/logout')
@login_required
def logout():
    username = current_user.username
    logout_user()
    response = make_response(redirect(url_for('main.index')))
    unset_jwt_cookies(response)
    logger.info(f"User logged out: {username}")
    flash('Logged out successfully.', 'success')
    return response

@bp.route('/protected')
@login_required
def protected():
    return jsonify(logged_in_as=current_user.username), 200
