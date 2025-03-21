const cardsWrapper = document.querySelector("#cardsWrapper");
const addCardBtnElm = document.querySelector(".add-card-btn");
const addCardModalElm = document.querySelector("#add-card-modal");
const addTaskModalElm = document.querySelector("#add-task-modal");
const modalCloseBtnsElm = document.querySelectorAll(".close-btn");
const allModalsElm = document.querySelectorAll(".modal");
const allForm = document.querySelectorAll("form");
let targetCard = null;
getFromLocalstorage();
function saveOnLocalstorage() {
  localStorage.setItem("kanbanBoard", JSON.stringify(cardsWrapper.innerHTML));
}
function getFromLocalstorage() {
  const savedData = localStorage.getItem("kanbanBoard");
  if (savedData) {
    cardsWrapper.innerHTML = JSON.parse(savedData);
  }

  // Reapply event listeners and observers after loading from storage
  document.querySelectorAll(".add-task-btn").forEach((addTaskBtnElm) =>
    addTaskBtnElm.addEventListener("click", function (e) {
      targetCard = e.target.parentElement;
      showModal(addTaskModalElm);
    })
  );

  document.querySelectorAll(".task").forEach((task) => {
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragend", handleDragStop);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("dragover", handleDragover);
    card.addEventListener("drop", handleDrop);
  });

  observeTaskChanges(cards); // Ensure observers persist
}

addCardBtnElm.addEventListener("click", () => showModal(addCardModalElm));

function showModal(modal) {
  const taskDate = document.querySelector("#task-date");
  taskDate.value = new Date().toISOString().split("T")[0];
  modal.classList.add("show");
}

function closeModal() {
  allModalsElm.forEach((modal) => modal.classList.remove("show"));
}

modalCloseBtnsElm.forEach((modalCloseBtnElm) =>
  modalCloseBtnElm.addEventListener("click", closeModal)
);

allModalsElm.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

allForm.forEach((form) =>
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.submitter.id == "add-card") {
      addCard();
    } else if (e.submitter.id == "add-task") {
      addTask();
    }
  })
);

function addCard() {
  const cardTitle = document.querySelector("#card-title");
  const cardColor = document.querySelector("#card-color");
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = `${cardTitle.value}-card`;
  card.setAttribute("style", `--card-color:${cardColor.value}`);
  const cardHTML = `
            <h3>${
              cardTitle.value || "untitled"
            } <span class="task-count">0</span></h3>
            <div class="tasks"></div>
            <button class="add-task-btn">+ Add Task</button>`;
  card.innerHTML = cardHTML;
  cardsWrapper.appendChild(card);
  cardTitle.value = "";
  cardColor.value = "#ff6b6b";
  closeModal();
  saveOnLocalstorage();
  getFromLocalstorage();
}

function addTask() {
  const taskTitle = document.querySelector("#task-title");
  const taskColor = document.querySelector("#task-color");
  const taskDate = document.querySelector("#task-date");
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("style", `--task-color:${taskColor.value}`);
  task.setAttribute("draggable", "true");
  task.innerHTML = `<p>${taskTitle.value}</p><h6>${taskDate.value}</h6>`;
  targetCard.querySelector(".tasks").appendChild(task);
  taskTitle.value = "";
  taskColor.value = "#3A3A5A";
  closeModal();
  updateTaskCount(targetCard);
  saveOnLocalstorage();
  getFromLocalstorage();
}

function handleDragStart() {
  requestAnimationFrame(() => {
    this.classList.add("dragging");
  });
}
function handleDragStop() {
  this.classList.remove("dragging");
  saveOnLocalstorage();
  getFromLocalstorage();
}

function handleDragover(e) {
  e.preventDefault();
  const draggedTask = document.querySelector(".dragging");
  const target = e.target.closest(".task, .tasks");
  if (!target || target == draggedTask) return;
  if (target.classList.contains("tasks")) {
    target.appendChild(draggedTask);
  } else {
    const { top, height } = target.getBoundingClientRect();
    const distance = top + height / 2;
    if (e.clientY < distance) {
      target.before(draggedTask);
    } else {
      target.after(draggedTask);
    }
  }
}
function handleDrop(e) {
  e.preventDefault();
}

function updateTaskCount(card) {
  const tasks = card.querySelector(".tasks").children; // Correct selection
  const taskCount = tasks.length;
  card.querySelector(".task-count").textContent = taskCount;
}

function observeTaskChanges(cards) {
  cards.forEach((card) => {
    const observer = new MutationObserver(() => updateTaskCount(card));
    observer.observe(card.querySelector(".tasks"), { childList: true });
  });
}
