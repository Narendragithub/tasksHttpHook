import React, { useState } from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';
function NewTasks(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const enterTaskHandler = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://tasks-c9acd-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
                {
                    method: 'POST',
                    body: JSON.stringify({ text: taskText }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Request Failed!");
            }

            const data = await response.json();
            const genaretedId = data.name;
            const createdTask = { id: genaretedId, text: taskText }
            props.onAddTask(createdTask);
        } catch (error) {
            setError(error.massage);
        }
        setIsLoading(false);
    }
    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
}

export default NewTasks;