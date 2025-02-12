import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { Todo } from '../entity/todo.modal'

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Todo[]>([])

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('Задачи');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Ошибка загрузки задач: ', error);        
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('Задачи',JSON.stringify(tasks));
      } catch (error) {
        console.error('Ошибка сохранения задач: ', error);        
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTask: Todo = {
        id: Math.random().toString(36).substring(2,15), 
        text: task,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };


const toggleComplete = (id:string) => {
  setTasks(tasks.map((task) => 
  task.id === id ? {...task, completed: !task.completed} : task
));
};

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !==id));
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Список дел</Text>
    <View style={styles.inputContainer}>

     <TextInput
      style={styles.input}
      placeholder="Добавьте задачу..."
      value={task}
      onChangeText={setTask}
      onSubmitEditing={addTask}
     />
 
     <Button title="Добавить" onPress={addTask} />

    </View>
    <FlatList
     data={tasks}
     keyExtractor={(item, index) => index.toString()}
     renderItem={({ item, index }) => (

      <View style={styles.taskContainer}>
       <TouchableOpacity onPress={() => toggleComplete(index.toString())}>

        <Text style={[styles.task, item.completed && styles.completed]}>
         {item.text}
        </Text>
       </TouchableOpacity>
       
       <Button title="Удалить" onPress={() => deleteTask(index.toString())} />
      </View>

     )}
    />
   </View>
  ); 
}

const styles = StyleSheet.create({

  container: {
   flex: 1,
   backgroundColor: '#fff',
   padding: 20,
  },
 
  title: {
   fontSize: 24,
   marginBottom: 20,
  },
 
  inputContainer: {
   flexDirection: 'row',
   marginBottom: 20,
  },
 
  input: {
   flex: 1,
   borderWidth: 1,
   borderColor: '#ccc',
   padding: 10,
   marginRight: 10,
  },
 
  taskContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 10,
  },
 
  task: {
   fontSize: 18,
  },
 
  completed: {
   textDecorationLine: 'line-through',
   color: '#888',
  },
 });