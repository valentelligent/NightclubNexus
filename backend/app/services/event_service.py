from app.models import Event
from app import db
from datetime import datetime

def get_all_events():
    return Event.query.all()

def create_event(data):
    new_event = Event(
        name=data['name'],
        date=datetime.fromisoformat(data['date']),
        description=data.get('description', '')
    )
    db.session.add(new_event)
    db.session.commit()
    return new_event

def update_event(id, data):
    event = Event.query.get(id)
    if event:
        event.name = data.get('name', event.name)
        event.date = datetime.fromisoformat(data.get('date', event.date.isoformat()))
        event.description = data.get('description', event.description)
        db.session.commit()
    return event

def delete_event(id):
    event = Event.query.get(id)
    if event:
        db.session.delete(event)
        db.session.commit()
        return True
    return False
