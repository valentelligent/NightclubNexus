from flask import Blueprint, jsonify, request, render_template
from flask_jwt_extended import jwt_required
from app.models import Event
from app import db
from app.services.event_service import get_all_events, create_event, update_event, delete_event

bp = Blueprint('events', __name__)

@bp.route('/list')
def list():
    events = get_all_events()
    return render_template('events/list.html', events=events)

@bp.route('/api/events', methods=['GET'])
def get_events():
    events = get_all_events()
    return jsonify([event.to_dict() for event in events]), 200

@bp.route('/api/events', methods=['POST'])
@jwt_required()
def add_event():
    data = request.get_json()
    new_event = create_event(data)
    return jsonify(new_event.to_dict()), 201

@bp.route('/api/events/<int:id>', methods=['PUT'])
@jwt_required()
def update_event_route(id):
    data = request.get_json()
    updated_event = update_event(id, data)
    if updated_event:
        return jsonify(updated_event.to_dict()), 200
    return jsonify({"msg": "Event not found"}), 404

@bp.route('/api/events/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_event_route(id):
    if delete_event(id):
        return jsonify({"msg": "Event deleted"}), 200
    return jsonify({"msg": "Event not found"}), 404
