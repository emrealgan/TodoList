const taskAdd = document.querySelector("#add-task");
const addButton = document.querySelector("#add-button");
const taskSearch = document.querySelector("#search-task");
const listContainer = document.querySelector(".list-container");

addArray = [];

listenerEvent();

function listenerEvent()
{
    addButton.addEventListener("click", listenerClick);
    taskAdd.addEventListener("keydown", listenerKeydown);
    taskSearch.addEventListener("input", searchList);
}
function searchList(e) 
{
    const find = e.target.value.toLowerCase().trim();
    const listItems = document.querySelectorAll(".list-container li");

    if (listItems.length > 0) 
    {
        listItems.forEach((item) => 
        {
            const contentDiv = item.querySelector("div");
            const delButton = item.querySelector("button");

            if (contentDiv.textContent.toLowerCase().includes(find)) 
            {
                item.style.display = "flex";
                delButton.style.display = "block";
            } else 
            {
                item.style.display = "none";
            }
        });
    } 
    else 
    {
        alert("Your list is empty");
    }
}
function listenerClick(e)
{   
    e.preventDefault();
    let adding = taskAdd.value;
    addTodo(adding);
}
function listenerKeydown(e)
{
    if(e.key == "Enter")
    {
        let adding = taskAdd.value;
        addTodo(adding);
    }
}
function addTodo(add)
{   
    if(add.trim() == "")
    {
        alert("You must write something!");
        return;
    }
    let todo =
    {
        id: Date.now(), 
        content: add 
    };
    addArray.push(todo);

    displayTodo(todo);

    saveTodoLocalStorage();

    taskAdd.value = "";
}
function displayTodo(todo) 
{
    let li = document.createElement("li");
    li.style.fontSize = "1.4rem"
   
    let contentText = document.createElement("div");
    contentText.textContent = todo.content;
    li.appendChild(contentText);
    li.setAttribute("data-id", todo.id);

    listContainer.appendChild(li);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", deleteTodo);
   
    li.appendChild(deleteButton);
}
function deleteTodo(event) 
{   
    const todoId = parseInt(event.target.parentElement.getAttribute("data-id"));

    for (let i = 0; i < addArray.length; i++) 
    {
        if (addArray[i].id == todoId)
        {
                addArray.splice(i, 1);
                break;
        }
    }

    event.target.parentElement.remove();

    saveTodoLocalStorage();
}
function saveTodoLocalStorage() 
{
    let todosStr = '';
    for (let i = 0; i < addArray.length; i++) 
    {
        const todo = addArray[i];
        todosStr += `${todo.id}:${todo.content};`;
    }
    localStorage.setItem("todo", todosStr);
}
function getTodosFromLocalStorage() 
{
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) 
    {
        addArray = [];
        const todoArr = storedTodos.split(';').filter((str) => str !== '');
        for (let i = 0; i < todoArr.length; i++) 
        {
            const [id, content] = todoArr[i].split(':');
            if (content.trim() !== "") 
            {
                addArray.push({ id: parseInt(id), content });
            }
        }

        listContainer.innerHTML = "";
        for (let i = 0; i < addArray.length; i++) 
        {
            displayTodo(addArray[i]);
        }
    }
}
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage);