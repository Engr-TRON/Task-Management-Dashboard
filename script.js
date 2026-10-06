const todoList = document.querySelector("#todoList");
const progressList = document.querySelector("#progressList");
const doneList = document.querySelector("#doneList");

const taskForm = document.querySelector("#taskForm");
const taskTitle = document.querySelector("#taskTitle");
const taskText = document.querySelector("#taskText");
const formMsg = document.querySelector("#formMsg");

const todoCount = document.querySelector("#todoCount");
const progressCount = document.querySelector("#progressCount");
const doneCount = document.querySelector("#doneCount");

let tasks = [
  {
    id: 1,
    title: "Write the plan",
    text: "List every feature",
    status: "todo",
  },

  {
    id: 2,
    title: "Design the homepage",
    text: "Sketch it on paper",
    status: "todo",
  },

  {
    id: 3,
    title: "Build the header",
    text: "Add the title bar",
    status: "progress",
  },

  {
    id: 4,
    title: "Create the folder",
    text: "Add two files",
    status: "done",
  },
];

const savedTasks = localStorage.getItem("kanbanTasks");

if (savedTasks !== null) {
  tasks = JSON.parse(savedTasks);
}

let nextId = 1;
for (const task of tasks) {
  if (task.id >= nextId) {
    nextId = task.id + 1;
  }
}

function createCard(task) {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = task.title;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = task.text;

  card.appendChild(title);
  card.appendChild(text);

  const buttons = document.createElement("div");
  buttons.className = "card-buttons";
  card.appendChild(buttons);

  if (task.status !== "todo") {
    const backBtn = document.createElement("button");
    backBtn.className = "card-btn";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", function () {
      moveBack(task.id);
    });
    buttons.appendChild(backBtn);
  }

  if (task.status !== "done") {
    const nextBtn = document.createElement("button");
    nextBtn.className = "card-btn";
    nextBtn.textContent = "Next";
    nextBtn.addEventListener("click", function () {
      moveForward(task.id);
    });
    buttons.appendChild(nextBtn);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "card-btn delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id);
  });
  buttons.appendChild(deleteBtn);

  return card;
}

function renderBoard() {
  todoList.innerHTML = "";
  progressList.innerHTML = "";
  doneList.innerHTML = "";

  for (const task of tasks) {
    const card = createCard(task);

    if (task.status === "todo") {
      todoList.appendChild(card);
    } else if (task.status === "progress") {
      progressList.appendChild(card);
    } else if (task.status === "done") {
      doneList.appendChild(card);
    }
  }

  const todoTotal = countByStatus("todo");
  const progressTotal = countByStatus("progress");
  const doneTotal = countByStatus("done");

  todoCount.textContent = todoTotal;
  progressCount.textContent = progressTotal;
  doneCount.textContent = doneTotal;

  if (todoTotal === 0) {
    addEmptyMessage(todoList);
  }
  if (progressTotal === 0) {
    addEmptyMessage(progressList);
  }
  if (doneTotal === 0) {
    addEmptyMessage(doneList);
  }
}

renderBoard();

function moveBack(id) {
  for (const task of tasks) {
    if (task.id === id) {
      if (task.status === "done") {
        task.status = "progress";
      } else if (task.status === "progress") {
        task.status = "todo";
      }
    }
  }
  saveTasks();
  renderBoard();
}

function moveForward(id) {
  for (const task of tasks) {
    if (task.id === id) {
      if (task.status === "todo") {
        task.status = "progress";
      } else if (task.status === "progress") {
        task.status = "done";
      }
    }
  }
  saveTasks();
  renderBoard();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderBoard();
}

function saveTasks() {
  const text = JSON.stringify(tasks);
  localStorage.setItem("kanbanTasks", text);
}

function countByStatus(status) {
  const matches = tasks.filter(function (task) {
    return task.status === status;
  });
  return matches.length;
}

function addEmptyMessage(list) {
  const message = document.createElement("p");
  message.className = "empty-msg";
  message.textContent = "No tasks here yet";
  list.appendChild(message);
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const titleValue = taskTitle.value.trim();
  const textValue = taskText.value.trim();

  if (titleValue === "") {
    formMsg.textContent = "Please enter a task title";
    formMsg.style.color = "red";
  } else if (titleValue.length > 40) {
    formMsg.textContent = "Title: 40 characters max";
    formMsg.style.color = "red";
  } else if (textValue === "") {
    formMsg.textContent = "Please enter the task details";
    formMsg.style.color = "red";
  } else {
    const newTask = {
      id: nextId,
      title: titleValue,
      text: textValue,
      status: "todo",
    };

    tasks.push(newTask);
    nextId = nextId + 1;
    saveTasks();
    renderBoard();

    formMsg.textContent = "Task added";
    formMsg.style.color = "green";
    taskTitle.value = "";
    taskText.value = "";
  }
});
