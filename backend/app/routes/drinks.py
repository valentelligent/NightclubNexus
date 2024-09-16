from flask import Blueprint, jsonify, request, render_template
from flask_jwt_extended import jwt_required
from app.models import Drink
from app import db
from app.services.drink_service import get_all_drinks, create_drink, update_drink, delete_drink

bp = Blueprint('drinks', __name__)

@bp.route('/menu')
def menu():
    drinks = get_all_drinks()
    return render_template('drinks/menu.html', drinks=drinks)

@bp.route('/api/drinks', methods=['GET'])
def get_drinks():
    drinks = get_all_drinks()
    return jsonify([drink.to_dict() for drink in drinks]), 200

@bp.route('/api/drinks', methods=['POST'])
@jwt_required()
def add_drink():
    data = request.get_json()
    new_drink = create_drink(data)
    return jsonify(new_drink.to_dict()), 201

@bp.route('/api/drinks/<int:id>', methods=['PUT'])
@jwt_required()
def update_drink_route(id):
    data = request.get_json()
    updated_drink = update_drink(id, data)
    if updated_drink:
        return jsonify(updated_drink.to_dict()), 200
    return jsonify({"msg": "Drink not found"}), 404

@bp.route('/api/drinks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_drink_route(id):
    if delete_drink(id):
        return jsonify({"msg": "Drink deleted"}), 200
    return jsonify({"msg": "Drink not found"}), 404
