import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const DrinkMenu = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      const response = await fetch('http://localhost:8000/drinks');
      const data = await response.json();
      setDrinks(data);
    } catch (error) {
      console.error('Error fetching drinks:', error);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  drinkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drinkName: {
    fontSize: 18,
  },
  drinkPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DrinkMenu;
