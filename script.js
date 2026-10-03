const todoList = document.querySelector("#todoList");
const progressList = document.querySelector("#progressList");
const doneList = document.querySelector("#doneList");

const taskForm = document.querySelector("#taskForm");
const taskTitle = document.querySelector("#taskTitle");
const taskText = document.querySelector("#taskText");
const formMsg = document.querySelector("#formMsg");

const tasks = [
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

let nextId = 5;

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
}

renderBoard();

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const titleValue = taskTitle.value.trim();
  const textValue = taskText.value.trim();
});
