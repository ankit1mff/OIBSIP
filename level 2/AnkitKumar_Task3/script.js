const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

// Add Task Event
addBtn.addEventListener('click', function() {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    addTaskElement(taskText, false);
    taskInput.value = "";
});

// Helper function to create task items manually
function addTaskElement(text, isCompleted) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;
    if (isCompleted) {
        span.classList.add('completed-text');
    }

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    // Complete / Toggle Button
    const doneBtn = document.createElement('button');
    doneBtn.textContent = isCompleted ? 'Undo' : 'Done';
    doneBtn.className = 'done-btn';
    doneBtn.onclick = function() {
        if (span.classList.contains('completed-text')) {
            span.classList.remove('completed-text');
            doneBtn.textContent = 'Done';
            pendingList.appendChild(li);
        } else {
            span.classList.add('completed-text');
            doneBtn.textContent = 'Undo';
            completedList.appendChild(li);
        }
    };

    // Edit Button (only for pending tasks)
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = function() {
        if (!span.classList.contains('completed-text')) {
            let updatedText = prompt("Edit your task:", span.textContent);
            if (updatedText !== null && updatedText.trim() !== "") {
                span.textContent = updatedText.trim();
            }
        } else {
            alert("Cannot edit completed tasks!");
        }
    };

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        li.remove();
    };

    actionsDiv.appendChild(doneBtn);
    if (!isCompleted) {
        actionsDiv.appendChild(editBtn);
    }
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionsDiv);

    if (isCompleted) {
        completedList.appendChild(li);
    } else {
        pendingList.appendChild(li);
    }
}