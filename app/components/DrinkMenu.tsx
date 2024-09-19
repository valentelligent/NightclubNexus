import React from 'react';
import styles from '../styles/DrinkMenu.module.css';

// Mock data for drinks
const drinks = [
  { id: 1, name: 'Espresso', price: 2.50, description: 'Strong and aromatic' },
  { id: 2, name: 'Cappuccino', price: 3.50, description: 'Espresso with steamed milk and foam' },
  { id: 3, name: 'Latte', price: 3.75, description: 'Espresso with lots of steamed milk' },
  { id: 4, name: 'Mocha', price: 4.00, description: 'Espresso with chocolate and steamed milk' },
  { id: 5, name: 'Green Tea', price: 2.75, description: 'Refreshing and healthy' },
];

const DrinkMenu: React.FC = () => {
  return (
    <div className={styles.drinkMenu}>
      <h2>Our Drink Menu</h2>
      <ul className={styles.drinkList}>
        {drinks.map((drink) => (
          <li key={drink.id} className={styles.drinkItem}>
            <h3 className={styles.drinkName}>{drink.name} - ${drink.price.toFixed(2)}</h3>
            <p className={styles.drinkDescription}>{drink.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkMenu;