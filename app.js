//Selector
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//Functions
const addToDo = (e) => {
    e.preventDefault();
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = toDoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);
    //Add todo do localstorage
    saveLocalTodos(toDoInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton);
    //Check trash button
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add("remove-btn")
    todoDiv.appendChild(removeButton);

    if (toDoInput.value == "") return;

    //Append to main list
    toDoList.appendChild(todoDiv)
    //Clear input value
    toDoInput.value = "";
}

const deleteCheck = (e) => {
    const item = e.target;
    //Delete todo
    if (item.classList[0] === 'remove-btn') {
        const todo = item.parentNode;
        //Animation
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentNode;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

function filterTodo(e) {
    const todos = toDoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const getTodos = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        //Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);
        //Check trash button
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.classList.add("remove-btn")
        todoDiv.appendChild(removeButton);
        //Append to main list
        toDoList.appendChild(todoDiv)
    })
}

const removeLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);