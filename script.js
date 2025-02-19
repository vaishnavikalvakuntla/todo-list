document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button onclick="deleteTask(this)">Delete</button>`;

    taskList.appendChild(li);

    saveTask(taskText);
    taskInput.value = "";
}

function deleteTask(button) {
    let taskText = button.parentElement.textContent.replace("Delete", "").trim();
    button.parentElement.remove();
    removeTask(taskText);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let taskList = document.getElementById("taskList");
        let li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
    });
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
