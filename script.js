// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Event listener for click
    addButton.addEventListener('click', addTask);

    // Event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask(taskText = null, save = true) {
        const text = taskText !== null ? taskText.trim() : taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromStorage(text);
        };
        li.appendChild(removeBtn);

        // Append to the list
        taskList.appendChild(li);

        // Clear input only when creating a new task
        if (taskText === null) {
            taskInput.value = '';
        }

        // Save to storage
        if (save) {
            saveTaskToStorage(text);
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => {
            addTask(task, false);
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
