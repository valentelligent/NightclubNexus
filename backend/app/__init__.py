from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
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

    from app.routes import auth, drinks, events, songs
    app.register_blueprint(auth.bp)
    app.register_blueprint(drinks.bp)
    app.register_blueprint(events.bp)
    app.register_blueprint(songs.bp)

    return app
