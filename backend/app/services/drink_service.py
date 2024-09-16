from app.models import Drink
from app import db

def get_all_drinks():
    return Drink.query.all()

def create_drink(data):
    new_drink = Drink(name=data['name'], price=data['price'], description=data.get('description', ''))
    db.session.add(new_drink)
    db.session.commit()
    return new_drink

def update_drink(id, data):
    drink = Drink.query.get(id)
    if drink:
        drink.name = data.get('name', drink.name)
        drink.price = data.get('price', drink.price)
        drink.description = data.get('description', drink.description)
        db.session.commit()
    return drink

def delete_drink(id):
    drink = Drink.query.get(id)
    if drink:
        db.session.delete(drink)
        db.session.commit()
        return True
    return False
