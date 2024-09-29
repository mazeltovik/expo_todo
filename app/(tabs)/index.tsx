import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CreateTaskInput from '@/components/createTask';
import AllActiveTask from '@/components/allActiveTask';
import AllDoneTask from '@/components/allDoneTask';
import { TaskType } from '../../types/activeTackType';
import { AllTask } from '../..//types/allTaskType';
import axios from 'axios';



export default function HomeScreen() {
  const [activeTask, setActiveTask] = useState<TaskType[]>([]);
  const [doneTask, setDoneTask] = useState<TaskType[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    async function getAll() {

      try {
        setLoading(true);
        const response = await axios.get<AllTask>(
          `http://${process.env.IP}:3000/tasks`
        );
        if (response) {
          console.log(response.data);
          setActiveTask(response.data.activeTask);
          setDoneTask(response.data.doneTask);
        }
      } catch(err){
        console.log("Data fetching cancelled");
      } finally {
        setLoading(false);
      }
    }
    getAll();
  }, []);
  return (
    <ScrollView>
      <View style={styles.wrapper}>
      <View style={styles.container}>
      <CreateTaskInput 
          activeTask={activeTask}
          setActiveTask={setActiveTask}/>
      <AllActiveTask 
        doneTask={doneTask}
        setActiveTask={setActiveTask}
        setDoneTask={setDoneTask}
        isLoading={isLoading}
        allActiveTask={activeTask} 
      />
      <AllDoneTask
          allDoneTask={doneTask}
          isLoading={isLoading}
          setDoneTask={setDoneTask}
        />
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper:{

  },
  container: {
    marginTop: 20,
    justifyContent:'center',
    marginLeft:16,
    marginRight:16
  },
});

