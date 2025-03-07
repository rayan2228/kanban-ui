const tasksElm = document.querySelectorAll(".task");
const taskCountElm = document.querySelectorAll(".task-count");
const tasksContainerElm = document.querySelectorAll(".tasks");
const addCardModal = document.querySelector("#add-card-modal");
const addTaskModal = document.querySelector("#add-task-modal");
const addTaskBtn = document.querySelector(".add-task-btn");
const addCardBtn = document.querySelector(".add-card-btn");
const modalCloseBtns = document.querySelectorAll(".close-btn");

addTaskBtn.addEventListener("click", () => {
  addTaskModal.style.display = "block";
});
addCardBtn.addEventListener("click", () => {
  addCardModal.style.display = "block";
});

modalCloseBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    addCardModal.style.display = "none";
    addTaskModal.style.display = "none";
  });
});

// tasksElm.forEach((task, index) => {
//   task.addEventListener("dragstart", () => {
//     task.classList.add("dragging");
//   });
//   task.addEventListener("dragend", () => {
//     task.classList.remove("dragging");
//   });
// });

// tasksContainerElm.forEach((taskContainer) => {
//   taskContainer.addEventListener("dragover", () => {
//     const draggedTask = document.querySelector(".dragging");
//     taskContainer.appendChild(draggedTask);
//   });
// });
