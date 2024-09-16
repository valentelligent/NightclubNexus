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
      <Text style={styles.title}>Request a Song</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SongRequest;
