const addCardBtnElm = document.querySelector(".add-card-btn");
const addCardModalElm = document.querySelector("#add-card-modal");
const addTaskModalElm = document.querySelector("#add-task-modal");
const addTaskBtnsElm = document.querySelectorAll(".add-task-btn");
const modalCloseBtnsElm = document.querySelectorAll(".close-btn");
const allModalsElm = document.querySelectorAll(".modal");
const addCardElm = document.querySelector("#add-card");
const addTaskElm = document.querySelector("#add-task");

addCardBtnElm.addEventListener("click", () => showModal(addCardModalElm));
addTaskBtnsElm.forEach((addTaskBtnElm) =>
  addTaskBtnElm.addEventListener("click", () =>
    showModal(addTaskModalElm.classList.add("show"))
  )
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
