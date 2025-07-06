import React, { useState } from 'react';


function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskCount, setTaskCount] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const currentCount = tasks.length;
    const input = document.getElementById('add-button');

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function handleKeyPress(event){
        if(event.key === "Enter") {
            addTask();
        }
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("")
        }
        setTaskCount(prevCount => prevCount + 1)
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setDeleteCount(prevCount => prevCount + 1)

    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    

    function completeTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setCompleteCount(prevCount => prevCount + 1)
        
    }

  


    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div id='task-entry'>
                <div id='enter-taskbox'>
                    <input
                        type='text'
                        placeholder='Enter a task...'
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        id='input-box'
                    />
                    <button
                        className="add-button"
                        onClick={addTask}
                        id='add-button'
                    >
                        ➕
                    </button>
                </div>
                <div id='counter'>
                    <p className='counter-name'>Total Items</p>
                    <p className='counter-value'>{taskCount}</p>
                </div>
                <div id='counter'>
                    <p className='counter-name'>Current Items</p>
                    <p className='counter-value'>{currentCount}</p>
                </div>
                <div id='counter'>
                    <p className='counter-name'>Completed Items</p>
                    <p className='counter-value'>{completeCount}</p>
                </div>
                <div id='counter'>
                    <p className='counter-name'>Deleted Items</p>
                    <p className='counter-value'>{deleteCount}</p>
                </div>
            </div>
            <div id='to-do-items'>
                <ol>
                    {tasks.map((task, index) => 
                        <li key={index}>
                            <span className="text">{task}</span>
                            <button
                                className="complete-button"
                                onClick={() => completeTask(index)}>
                                ✔️
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deleteTask(index)}>
                                🗑️
                            </button>
                            <button
                                className="move-button"
                                onClick={() => moveTaskUp(index)}>
                                🔺
                            </button>
                            <button
                                className="move-button"
                                onClick={() => moveTaskDown(index)}>
                                🔻
                            </button>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default ToDoList