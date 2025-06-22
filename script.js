// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add a new task
    addButton.addEventListener('click', function() {
        addTask(taskInput.value.trim());
    });
    // Enter key listener
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }

    // Main Add Task function
    function addTask(taskText, save = true) {
        if (taskText === "") {
            if (save) alert("Please enter a task.");
            return;
        }

        // Create the list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            // Remove item from the DOM
            taskList.removeChild(listItem);
            // Remove item from Local Storage
            removeTaskFromStorage(taskText);
        };
        listItem.appendChild(removeButton);

        // Append the list item
        taskList.appendChild(listItem);

        // Clear input
        taskInput.value = '';

        // Save the task if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Removes a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
