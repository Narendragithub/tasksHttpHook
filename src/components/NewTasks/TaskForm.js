import React,{useRef} from 'react';
import classes from './TaskForm.module.css';
function TaskForm(props) {
    const inputRef = useRef('');
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredValue = inputRef.current.value;
        if (enteredValue.trim().length > 0) {
            props.onEnterTask(enteredValue);
          }

    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <input type='text' ref={inputRef}/>
            <button>{props.loading ? 'Loading...' : 'Add Task'}</button>    
        </form>
    );
}

export default TaskForm;