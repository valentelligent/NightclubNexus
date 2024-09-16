from app.models import SongRequest
from app import db

def get_all_song_requests():
    return SongRequest.query.all()

def create_song_request(data, user_id):
    new_request = SongRequest(
        song_name=data['song_name'],
        artist=data['artist'],
        user_id=user_id
    )
    db.session.add(new_request)
    db.session.commit()
    return new_request

def update_song_request_status(id, status):
    request = SongRequest.query.get(id)
    if request:
        request.status = status
        db.session.commit()
    return request
