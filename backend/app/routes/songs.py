from flask import Blueprint, jsonify, request, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import SongRequest
from app import db, socketio
from app.services.song_service import get_all_song_requests, create_song_request, update_song_request_status

bp = Blueprint('songs', __name__)

@bp.route('/request')
def request():
    return render_template('songs/request.html')

@bp.route('/api/song-requests', methods=['GET'])
@jwt_required()
def get_song_requests():
    requests = get_all_song_requests()
    return jsonify([request.to_dict() for request in requests]), 200

@bp.route('/api/song-requests', methods=['POST'])
@jwt_required()
def add_song_request():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_request = create_song_request(data, user_id)
    socketio.emit('new_song_request', new_request.to_dict(), broadcast=True)
    return jsonify(new_request.to_dict()), 201

@bp.route('/api/song-requests/<int:id>', methods=['PUT'])
@jwt_required()
def update_song_request(id):
    data = request.get_json()
    updated_request = update_song_request_status(id, data['status'])
    if updated_request:
        socketio.emit('song_request_update', updated_request.to_dict(), broadcast=True)
        return jsonify(updated_request.to_dict()), 200
    return jsonify({"msg": "Song request not found"}), 404
