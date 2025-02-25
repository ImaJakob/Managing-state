import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task || !description) return alert("Task and description are required!");
    
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, task, description } : t));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { id: Date.now(), task, description, isDone: false }]);
    }
    setTask("");
    setDescription("");
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  const editTask = (task) => {
    setTask(task.task);
    setDescription(task.description);
    setEditingTask(task);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTask}>{editingTask ? "Update Task" : "Add Task"}</button>
      
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ textDecoration: t.isDone ? "line-through" : "none" }}>
            {t.task}: {t.description}
            <button onClick={() => toggleCompletion(t.id)}>{t.isDone ? "Undo" : "Done"}</button>
            <button onClick={() => editTask(t)}>Edit</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
