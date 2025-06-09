 document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);
      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div>
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="delete" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  };

  // Save tasks to localStorage
  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add a new task
  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, completed: false });
      saveTasks(tasks);
      loadTasks();
      taskInput.value = "";
    }
  });

  // Edit a task
  window.editTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      tasks[index].text = newText.trim();
      saveTasks(tasks);
      loadTasks();
    }
  };

  // Delete a task
  window.deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
  };

  // Toggle task completion
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-text")) {
      const li = e.target.closest("li");
      const index = Array.from(taskList.children).indexOf(li);
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      loadTasks();
    }
  });

  // Initial load
  loadTasks();
});
