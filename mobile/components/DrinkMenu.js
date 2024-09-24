// DrinkMenu.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './DrinkMenu.styles';

const DrinkMenu = () => {
  const [drinks, setDrinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      const response = await fetch('https://api.nightclubnexus.com/drinks');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setDrinks(data);
    } catch (error) {
      console.error('Error fetching drinks:', error);
      setError('Failed to load drinks. Please try again later.');
    }
  };

  const renderDrinkItem = ({ item }) => (
    <View style={styles.drinkItem}>
      <Text style={styles.drinkName}>{item.name}</Text>
      <Text style={styles.drinkPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drink Menu</Text>
      <FlatList
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DrinkMenu;