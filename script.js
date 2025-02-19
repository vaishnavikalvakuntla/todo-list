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

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function () {
        toggleTaskCompletion(li);
    };

    let span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text"); // Added class to apply correct styling

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        updateLocalStorage();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTask(taskText);
    taskInput.value = "";
}

// Add task when "Enter" is pressed
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

// Toggle task completion
function toggleTaskCompletion(li) {
    li.classList.toggle("completed");
    updateLocalStorage();
}

// Save tasks to localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskObj => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = taskObj.completed;
        if (taskObj.completed) {
            li.classList.add("completed");
        }
        checkbox.onclick = function () {
            toggleTaskCompletion(li);
        };

        let span = document.createElement("span");
        span.textContent = taskObj.text;
        span.classList.add("task-text"); // Apply correct class

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            li.remove();
            updateLocalStorage();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Update localStorage when task is toggled or deleted
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector(".task-text").textContent;
        let completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}
