let todoItems = [];

if (JSON.parse(localStorage.getItem("todoItems") !== null)) {
  todoItems = JSON.parse(localStorage.getItem("todoItems"));
}

function updateLocalStorage() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function renderTodoItems() {
  const todoListCompleted = document.querySelector(".toDo__list__completed");
  todoListCompleted.innerHTML = "";
  const todoListNotCompleted = document.querySelector(
    ".toDo__list__notCompleted"
  );
  todoListNotCompleted.innerHTML = "";

  if (todoItems !== null) {
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].isDone) {
        todoListCompleted.innerHTML += ` <div class="toDo__list__Completed--item">
                      <div><input class="checker" checked disabled type="checkbox" name="checker"></div>
                      <div class="toDo__item__Completed--text"><p>${todoItems[i].title}</p></div>
                      </div>`;
      } else {
        todoListNotCompleted.innerHTML += ` <div class="toDo__list__notCompleted--item">
                      <div><input class="checker" type="checkbox" name="checker" onclick="completeTask(${i})"></div>
                      <div class="toDo__item__notCompleted--text"><p>${todoItems[i].title}</p></div>
                      <div><button class="trashButton hidden fade" onclick="removeTodoItem(${i})"><i class="fa-solid fa-trash"></i></button></div>
                      </div>`;
      }
    }
  }
}

const showDate = document.querySelector(".date__dateTime");
const showDateDay = document.querySelector(".date__day");
const input = document.querySelector(".input__toDo");
const plusButton = document.querySelector(".plusButton");
const toDoList = document.querySelector(".toDo__list__notCompleted");
const toDoCounter = document.querySelector(".toDoCounter");
const showHideButton = document.querySelector(".buttons__showCompleteButton");
const completedTitle = document.querySelector(".preToDo__list__Completed");
const clearButton = document.querySelector(".buttons__clearButton");
const percent = document.querySelector(".completed__percent");

function refreshDate() {
  const date = new Date().toLocaleDateString("hu-HU", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const dateDay = new Date().toLocaleDateString("hu-HU", {
    weekday: "long",
  });
  showDateDay.innerHTML = dateDay.charAt(0).toUpperCase() + dateDay.slice(1);
  showDate.innerHTML = date;
}

refreshDate();

plusButton.addEventListener("click", clickAddButton);

function clickAddButton() {
  console.log(`clickre látja a ${input.value}-t`);
  if (input.value === "") {
    return;
  } else if (
    input.value !== "" &&
    toDoCounter.textContent !== "You have 6 pending items"
  ) {
    removeAndPushInput(input.value);
    input.value = "";
    counterRefresh();
  } else alert("To much pending. Do something!");
}

//pusholom az inputot és kitörlöm, ahonnan jön

function removeAndPushInput(inputText) {
  console.log(`megvan a berít szöveg: ${inputText}`);
  todoItems.push({ title: inputText, isDone: false });
  renderTodoItems();
  updateLocalStorage();
  effect();
  counterRefresh();
}

function completeTask(i) {
  todoItems[i].isDone = true;
  completedTasksNumber = document.querySelectorAll(
    ".toDo__list__Completed--item"
  );
  if (completedTasksNumber.length < 6) {
    renderTodoItems();
    updateLocalStorage();
    counterRefresh();
  } else alert("To much Completed task. Pls Clear All!!");
}

function removeTodoItem(i) {
  todoItems.splice(i, 1);
  renderTodoItems();
  updateLocalStorage();
  counterRefresh();
}

function counterRefresh() {
  completed = document.querySelectorAll(".toDo__list__Completed--item");
  pending = document.querySelectorAll(".toDo__list__notCompleted--item");
  pendingString = document.querySelector(".pendingString");
  if (todoItems !== null) {
    let counter = todoItems.length - completed.length;
    toDoCounter.textContent = `You have ${counter} pending items`;
    if (counter === 0) {
      toDoCounter.textContent = `Nothing to do yet.`;
    }
    if (completed.length + pending.length === 0) {
      percent.innerHTML = "100%";
    } else {
      completionPercentage =
        (completed.length / (pending.length + completed.length)) * 100;
      percent.innerHTML = Math.trunc(completionPercentage) + "%";
    }
  } else;
}

showHideButton.addEventListener("click", showHideCompleted);

function showHideCompleted() {
  completedTitle.classList.toggle("turnedOff");
  document
    .querySelector(".toDo__list__completed")
    .classList.toggle("turnedOff");
  if (showHideButton.textContent === "Hide Complete") {
    showHideButton.textContent = "Show Complete";
  } else {
    showHideButton.textContent = "Hide Complete";
  }
}

clearButton.addEventListener("click", deleteAllTask);

function deleteAllTask() {
  localStorage.clear();
  document.location.reload();
}

function effect() {
  document
    .querySelector(".toDo__list__notCompleted--item")
    .classList.add("fade");
  setTimeout(() => {
    document
      .querySelector(".toDo__list__notCompleted--item")
      .classList.remove("fade");
  }, 500);
}

renderTodoItems();
counterRefresh();
