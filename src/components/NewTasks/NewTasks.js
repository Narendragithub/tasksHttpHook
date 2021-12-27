import UseHttp from '../../hooks/UseHttp';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

function NewTasks(props) {
    const createTask = (taskText,data) =>{
        const genaretedId = data.name;
        const createdTask = { id: genaretedId, text: taskText }
        props.onAddTask(createdTask);
    }

    const {isLoading,error,sendRequest:sendTaskRequest } = UseHttp();
    const enterTaskHandler = async (taskText) => {
        sendTaskRequest({
            url:'https://tasks-c9acd-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: {text: taskText}
        },createTask.bind(null,taskText));
    }
    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
}

export default NewTasks;