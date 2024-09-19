import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SongRequest = () => {
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');

  const handleSongRequest = async () => {
    try {
      const response = await fetch('http://localhost:8000/song-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${/* Get token from storage */}`,
        },
        body: JSON.stringify({ song_name: songName, artist }),
      });
      const data = await response.json();
      console.log('Song request submitted:', data);
      // Clear form after submission
      setSongName('');
      setArtist('');
    } catch (error) {
      console.error('Error submitting song request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Charlie's Phoenix Song Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Song Name"
        value={songName}
        onChangeText={setSongName}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TouchableOpacity style={styles.button} onPress={handleSongRequest}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SongRequest;
