import React, { useEffect, useState } from 'react';
import './App.css';
import NewTask from './components/NewTasks/NewTasks';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let response = await fetch("https://tasks-c9acd-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      let data = await response.json();
      let loadedTask = [];
      for (const key in data) {
        loadedTask.push({id:key,text:data[key].text})
      }
      setTasks(loadedTask);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.massage || "Something went worng!");
    }

  }

  useEffect(() => {
    fetchTasks();
  }, [])

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
