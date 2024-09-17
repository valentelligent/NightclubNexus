from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_login import LoginManager
from config import Config

db = SQLAlchemy()
jwt = JWTManager()
socketio = SocketIO()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app)
    login_manager.init_app(app)
    CORS(app, supports_credentials=True)  # Updated CORS configuration

    from app.models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from app.routes import main, auth, drinks, events, songs
    app.register_blueprint(main.bp)
    app.register_blueprint(auth.bp, url_prefix='/auth')
    app.register_blueprint(drinks.bp, url_prefix='/drinks')
    app.register_blueprint(events.bp, url_prefix='/events')
    app.register_blueprint(songs.bp, url_prefix='/songs')

    return app
