from app import create_app, db, socketio

app = create_app()

@app.route('/')
def index():
    return "Welcome to the Nightclub App!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    socketio.run(app, host='0.0.0.0', port=8000)
