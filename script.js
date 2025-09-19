const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDateInput = document.querySelector('input[name="todo-date"]');
const todoList = document.getElementById('todo-list');
const filterButton = document.querySelector('.filter-btn');  
const clearAllButton = document.querySelector('.clear-all-btn'); 

let tasks = [];

function renderTasks(tasksToRender = tasks) {
    todoList.innerHTML = '';  

    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');  

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = `${task.text} (Tanggal: ${task.date})`;
        if (task.completed) {
            taskTextSpan.classList.add('done');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);  
            renderTasks();  
        });

        taskTextSpan.addEventListener('click', () => {
            task.completed = !task.completed;  
            renderTasks();  
        });

        li.appendChild(taskTextSpan);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = todoInput.value.trim();
    const taskDate = todoDateInput.value;

    if (taskText && taskDate) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            date: taskDate,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
        todoInput.value = '';
        todoDateInput.value = '';
    }
});

filterButton.addEventListener('click', () => {
    const completedTasks = tasks.filter(task => task.completed);
    renderTasks(completedTasks);
});

clearAllButton.addEventListener('click', () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua tugas?")) {
        tasks = [];
        renderTasks();
    }
});

document.addEventListener('DOMContentLoaded', renderTasks);