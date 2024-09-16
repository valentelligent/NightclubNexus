from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
jwt = JWTManager()
socketio = SocketIO()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app)
    CORS(app)  # Enable CORS for all routes

    from app.routes import main, auth, drinks, events, songs
    app.register_blueprint(main.bp)
    app.register_blueprint(auth.bp, url_prefix='/auth')
    app.register_blueprint(drinks.bp, url_prefix='/drinks')
    app.register_blueprint(events.bp, url_prefix='/events')
    app.register_blueprint(songs.bp, url_prefix='/songs')

    return app
