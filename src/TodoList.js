import React, { useState, useEffect } from 'react';
import './TodoList.css';

function ToDoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      const newTask = { text: task, completed: false, date: new Date() };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => 
    sort === 'date' ? new Date(a.date) - new Date(b.date) : a.text.localeCompare(b.text)
  );

  return (
    <div className="ToDoList">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="date">By Date</option>
          <option value="alphabetical">By Alphabetical</option>
        </select>
      </div>
      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <button className="complete" onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className="remove" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
