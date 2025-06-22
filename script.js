// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add a new task// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and display them
    loadTasks();

    // Add task when Add Task button is clicked
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

   
    function addTask(taskText = null, save = true) {
        // Retrieve task text from parameter or input field
        const text = taskText !== null ? taskText.trim() : taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item element for the task
        const li = document.createElement('li');
        li.textContent = text;

        // Create Remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Attach click event to Remove button to delete the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(text);
        };

        // Append Remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list in the DOM
        taskList.appendChild(li);

        // Clear input field if this is a new task added from input
        if (taskText === null) {
            taskInput.value = '';
        }

        // Save to Local Storage if required
        if (save) {
            saveTaskToStorage(text);
        }
    }

   
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => {
            addTask(task, false); // Do not save again when loading
        });
    }

   
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

 
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});

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
