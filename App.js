import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { initialState, reducer } from './TodoReducer';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };

  const removeTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  // !!!!!! add FlatList to display list on screen

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={state}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTodo(item.id)}>
            <Text style={styles.item}>{item.text}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },

  input: {
    flex: 1,
    height: 40,
    padding: 10,
    height: 50,
    marginRight: 10,
    fontSize: 20,
  },

  item: {
    padding: 10,
    fontSize: 20,
    height: 50,
    textAlign: 'left',
  },

  list: {
    width: '100%',
  },
  
  button: {
    backgroundColor: 'white',
    padding: 10,
    
  },

  buttonText: {
    color: 'red',
    fontSize: 20,
  },

});