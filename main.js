const addItem = document.querySelector("#add-item");
const inputField = document.querySelector("#to-do-text");
const toDos = document.querySelector(".todos");
const completed = document.querySelector(".completed");
const toDoList = document.querySelector("#todos-list");
const completedList = document.querySelector("#completed-list");
let allowOtherEvents = true;

document.addEventListener("DOMContentLoaded", getFromLocalStorage);

function createListItem() {
  if (allowOtherEvents) {
    if (inputField.value !== "") {
      const li = document.createElement("li");
      li.classList.add("list-item");
      toDoList.appendChild(li);
      const check = document.createElement("input");
      check.type = "checkbox";
      li.appendChild(check);
      const label = document.createElement("label");
      label.classList.add("the-label");
      label.innerText = inputField.value;
      li.appendChild(label);
      const editableInput = document.createElement("input");
      editableInput.classList.add("task-edit");
      li.appendChild(editableInput);
      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.innerText = "EDIT";
      li.appendChild(editBtn);
      const doneBtn = document.createElement("button");
      doneBtn.classList.add("done-btn");
      doneBtn.innerText = "DONE";
      li.appendChild(doneBtn);
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "DELETE";
      li.appendChild(deleteBtn);
      saveToLocalStorage(inputField.value);
    } else {
      alert("insert a valid task");
    }
    inputField.value = "";
  } else alert("finish editing first");
}
inputField.addEventListener("click", (e) => {
  if (!allowOtherEvents) {
    e.preventDefault();
    alert("finish editing first");
  }
});
addItem.addEventListener("click", createListItem);

toDoList.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    if (allowOtherEvents) {
      e.target.addEventListener("change", checkThisOut(e.target));
    } else {
      e.preventDefault();
      alert("finish editing first");
    }
  }
  if (e.target.innerText === "DELETE") {
    deleteItem(e.target.parentNode.parentNode, e.target.parentNode);
  }
  if (e.target.innerText === "EDIT") {
    editItem(e);
  }
  if (e.target.innerText === "DONE") {
    closeEdit(e);
  }
});
completedList.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    if (allowOtherEvents) {
      e.target.addEventListener("change", checkThisOut(e.target));
    } else {
      e.preventDefault();
      alert("finish editing first");
    }
  }
  if (e.target.innerText === "DELETE") {
    deleteItem(e.target.parentNode.parentNode, e.target.parentNode);
  }
  if (e.target.innerText === "EDIT") {
    editItem(e);
  }
  if (e.target.innerText === "DONE") {
    closeEdit(e);
  }
});

function checkThisOut(touch) {
  if (allowOtherEvents) {
    if (touch.checked) {
      toDoList.removeChild(touch.parentNode);
      completedList.appendChild(touch.parentNode);
      moveInsideLocalStorage(touch);
    } else {
      completedList.removeChild(touch.parentNode);
      toDoList.appendChild(touch.parentNode);
      moveInsideLocalStorage(touch);
    }
  } else alert("finish editing first");
}

function deleteItem(fromWhereToDelete, itemToDelete) {
  if (allowOtherEvents) {
    if (confirm("are you sure?")) {
      fromWhereToDelete.removeChild(itemToDelete);
      removeFromLocalStorage(itemToDelete, fromWhereToDelete);
      console.log(fromWhereToDelete);
    }
  } else alert("finish editing first");
}

function editItem(e) {
  if (allowOtherEvents) {
    let theLabel = e.target.parentNode.firstChild.nextSibling;
    let editInp = e.target.parentNode.firstChild.nextSibling.nextSibling;
    editInp.value = theLabel.innerText;
    theLabel.style.display = "none";
    editInp.style.display = "block";
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "block";
    allowOtherEvents = false;
  } else {
    e.preventDefault();
    alert("finish editing first");
  }
}

function closeEdit(e) {
  e.preventDefault();
  let theLabel = e.target.parentNode.firstChild.nextSibling;
  let editInp = e.target.parentNode.firstChild.nextSibling.nextSibling;
  theLabel.innerText = editInp.value;
  theLabel.style.display = "block";
  editInp.style.display = "none";
  e.target.style.display = "none";
  e.target.previousSibling.style.display = "block";
  allowOtherEvents = true;
}
function moveInsideLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let done;
  if (localStorage.getItem("done") === null) {
    done = [];
  } else {
    done = JSON.parse(localStorage.getItem("done"));
  }
  if (todo.parentNode.parentNode.id === "completed-list") {
    done.push(todo.nextSibling.innerText);
    localStorage.setItem("done", JSON.stringify(done));
    todos.splice(todos.indexOf(todo.nextSibling.innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (todo.parentNode.parentNode.id === "todos-list") {
    todos.push(todo.nextSibling.innerText);
    localStorage.setItem("todos", JSON.stringify(todos));
    done.splice(done.indexOf(todo.nextSibling.innerText), 1);
    console.log(todos.indexOf(todo.nextSibling.innerText));
    localStorage.setItem("done", JSON.stringify(done));
  }
}
function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFromLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    toDoList.appendChild(li);
    const check = document.createElement("input");
    check.type = "checkbox";
    li.appendChild(check);
    const label = document.createElement("label");
    label.classList.add("the-label");
    label.innerText = todo;
    li.appendChild(label);
    const editableInput = document.createElement("input");
    editableInput.classList.add("task-edit");
    li.appendChild(editableInput);
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "EDIT";
    li.appendChild(editBtn);
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.innerText = "DONE";
    li.appendChild(doneBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "DELETE";
    li.appendChild(deleteBtn);
  });
  let done;
  if (localStorage.getItem("done") === null) {
    done = [];
  } else {
    done = JSON.parse(localStorage.getItem("done"));
  }
  done.forEach(function (todo) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    completedList.appendChild(li);
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = true;
    li.appendChild(check);
    const label = document.createElement("label");
    label.classList.add("the-label");
    label.innerText = todo;
    li.appendChild(label);
    const editableInput = document.createElement("input");
    editableInput.classList.add("task-edit");
    li.appendChild(editableInput);
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "EDIT";
    li.appendChild(editBtn);
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.innerText = "DONE";
    li.appendChild(doneBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "DELETE";
    li.appendChild(deleteBtn);
  });
}

function removeFromLocalStorage(todo, fromWhere) {
  let todos;
  let done;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (localStorage.getItem("done") === null) {
    done = [];
  } else {
    done = JSON.parse(localStorage.getItem("done"));
  }
  if (fromWhere.id === "todos-list") {
    const toDoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(toDoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  if (fromWhere.id === "completed-list") {
    const toDoIndexDone = todo.children[1].innerText;
    done.splice(done.indexOf(toDoIndexDone), 1);
    localStorage.setItem("done", JSON.stringify(done));
  }
}
