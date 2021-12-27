import React, {  useEffect, useState } from 'react';
import './App.css';
import NewTask from './components/NewTasks/NewTasks';
import Tasks from './components/Tasks/Tasks';
import UseHttp from './hooks/UseHttp';
function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading,error,sendRequest:fetchTasks } = UseHttp();
  useEffect(() => {
    const transformedTasks = (tasksObj)=>{
      let loadedTask = [];
      for (const key in tasksObj) {
        loadedTask.push({id:key,text:tasksObj[key].text})
      }
      setTasks(loadedTask);
    };
    fetchTasks({url :"https://tasks-c9acd-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"},transformedTasks);
  },[fetchTasks])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return (
<React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
