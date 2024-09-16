document.addEventListener('DOMContentLoaded', function() {
    // Drink management
    const drinkForm = document.getElementById('drink-form');
    const drinkList = document.getElementById('drink-list');

    if (drinkForm) {
        drinkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(drinkForm);
            const drinkData = Object.fromEntries(formData.entries());

            fetch('/drinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(drinkData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                loadDrinks();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }

    function loadDrinks() {
        fetch('/drinks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(drinks => {
            drinkList.innerHTML = '';
            drinks.forEach(drink => {
                const li = document.createElement('li');
                li.textContent = `${drink.name} - $${drink.price}`;
                drinkList.appendChild(li);
            });
        });
    }

    // Event management
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');

    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(eventForm);
            const eventData = Object.fromEntries(formData.entries());

            fetch('/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(eventData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                loadEvents();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }

    function loadEvents() {
        fetch('/events', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(events => {
            eventList.innerHTML = '';
            events.forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.name} - ${new Date(event.date).toLocaleDateString()}`;
                eventList.appendChild(li);
            });
        });
    }

    // Load initial data
    if (drinkList) loadDrinks();
    if (eventList) loadEvents();
});
