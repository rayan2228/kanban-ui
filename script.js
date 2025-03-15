const kanbanBoard = document.querySelector("#kanban-board");
const addCardBtnElm = document.querySelector(".add-card-btn");
const addCardModalElm = document.querySelector("#add-card-modal");
const addTaskModalElm = document.querySelector("#add-task-modal");
const addTaskBtnsElm = document.querySelectorAll(".add-task-btn");
const modalCloseBtnsElm = document.querySelectorAll(".close-btn");
const allModalsElm = document.querySelectorAll(".modal");
const allForm = document.querySelectorAll("form");
let targetCard = null;
addCardBtnElm.addEventListener("click", () => showModal(addCardModalElm));
addTaskBtnsElm.forEach((addTaskBtnElm) =>
  addTaskBtnElm.addEventListener("click", function (e) {
    targetCard = e.target.parentElement;
    showModal(addTaskModalElm);
  })
);

function showModal(modal) {
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
  kanbanBoard.appendChild(card);
  cardTitle.value = "";
  cardColor.value = "#ff6b6b";
  closeModal()
}
