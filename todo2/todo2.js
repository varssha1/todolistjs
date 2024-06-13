document.getElementById('addbtn').addEventListener('click', function() {
    const input = document.getElementById('ip');
    const inputValue = input.value.trim();
    if (inputValue === "") {
        return;
    }
    if (inputValue) {
        addTodoItem(inputValue);
        input.value = '';   
    }
});
function handle(e){
    if(e.keyCode === 13){
        e.preventDefault();

        const input = document.getElementById('ip');
        const inputValue = input.value.trim();
        if (inputValue === "") {
            return;
        }
        if (inputValue) {
            addTodoItem(inputValue);
            input.value = '';   
        }
        
    }
}


document.getElementById('all').addEventListener('click', function() {
    currentFilter = 'all';
    displayTasks(currentFilter);
});

document.getElementById('pending').addEventListener('click', function() {
    currentFilter = 'pending';
    displayTasks(currentFilter);
});

document.getElementById('completed').addEventListener('click', function() {
    currentFilter = 'completed';
    displayTasks(currentFilter);
});

document.getElementById('clear').addEventListener('click', function() {
    clearCompleted();
});

let tasks = [];
let currentFilter = 'all';

function addTodoItem(tname) {
    const newTask = { name: tname, is_done: false };
    tasks.push(newTask);
    displayTasks(currentFilter);
}

function displayTasks(filter) {
    const ul = document.getElementById('todo-list');
    ul.innerHTML = ''; 

    let filteredTasks = tasks;
    if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.is_done);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.is_done);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.is_done;
        checkbox.addEventListener('change', function() {
            task.is_done = checkbox.checked;
            displayTasks(currentFilter);
        });

        const span = document.createElement('span');
        span.textContent = task.name;
        if (task.is_done) {
            span.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            removeTask(index);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
    console.log(tasks);
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.is_done);
    displayTasks(currentFilter);
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks(currentFilter);
}
