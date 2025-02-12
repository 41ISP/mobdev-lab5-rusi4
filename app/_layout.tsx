import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<any[]>([])

  const addTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, {text: task, completed: false}]);
      setTask('');
    }
  }

  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Список дел</Text>
    <View style={styles.inputContainer}>

     <TextInput
      style={styles.input}
      placeholder="Добавьте задачу..."
      value={task}
      onChangeText={setTask}
     />
 
     <Button title="Добавить" onPress={addTask} />

    </View>
    <FlatList
     data={tasks}
     keyExtractor={(item, index) => index.toString()}
     renderItem={({ item, index }) => (

      <View style={styles.taskContainer}>
       <TouchableOpacity onPress={() => toggleComplete(index)}>

        <Text style={[styles.task, item.completed && styles.completed]}>
         {item.text}
        </Text>
       </TouchableOpacity>
       
       <Button title="Удалить" onPress={() => deleteTask(index)} />
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


// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {

//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   const handleSubmit = () => {
//     alert(firstName)
//   }

//   const [firstName, setFirstName] = useState('');

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

//       <View style={styles.container}>
//         <Text style={styles.title}>Введите запись</Text>
//         <TextInput value={firstName} onChangeText={setFirstName} onSubmitEditing={handleSubmit} style={styles.input}/>
//         <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}><text>Нажми</text></TouchableOpacity>
//       </View>
//     </ThemeProvider>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     display: 'flex',
//   },
//   input: {
//     fontSize: 20,
//     borderWidth: 2,
//     borderRadius: 5,
//     textAlign: 'center'
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: "100%",
//     height: "100%"
//   },
//   buttonStyle: {
//     marginTop: 5,
//     width: 160,
//     height: 35,
//     borderWidth: 2,
//     borderRadius: 5,
//     textAlign: 'center',
//     fontSize: 25,
//     fontFamily: 'bahnschrift',
//     backgroundColor:'rgb(226, 226, 226)'
//   }
// })