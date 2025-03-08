document.addEventListener("DOMContentLoaded", () => {
  const kanbanBoard = document.querySelector("#kanban-board");
  const addCardModal = document.querySelector("#add-card-modal");
  const addTaskModal = document.querySelector("#add-task-modal");
  const addTaskBtns = document.querySelectorAll(".add-task-btn");
  const addCardBtn = document.querySelector(".add-card-btn");
  const addCard = document.querySelector("#add-card"); // Form for adding a card
  const modalCloseBtns = document.querySelectorAll(".close-btn");
  const cardTitle = document.querySelector("#card-title");
  const cardColor = document.querySelector("#card-color");

  // Open modals
  addTaskBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      addTaskModal.classList.add("show");
    })
  );

  addCardBtn.addEventListener("click", () => {
    addCardModal.classList.add("show");
  });

  // Handle adding a new card
  addCard.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent page reload
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
    addCardModal?.classList.remove("show"); // Close modal
  });

  // Close modals
  modalCloseBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      addCardModal?.classList.remove("show");
      addTaskModal?.classList.remove("show");
    });
  });

  // Drag and Drop: Use event delegation to handle dynamic elements
  document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task")) {
      console.log("Dragging started:", e.target);
      e.dataTransfer.setData("text/plain", e.target.id);
      e.target.classList.add("dragging");
    }
  });

  document.addEventListener("dragend", (e) => {
    if (e.target.classList.contains("task")) {
      console.log("Dragging ended:", e.target);
      e.target.classList.remove("dragging");
    }
  });

  // Dragging over a task container
  document.addEventListener("dragover", (e) => {
    if (e.target.classList.contains("tasks")) {
      e.preventDefault(); // Required for dropping
    }
  });

  // Dropping inside a task container
  document.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedTask = document.querySelector(".dragging");
    if (draggedTask && e.target.classList.contains("tasks")) {
      console.log("Dropped inside:", e.target);
      e.target.appendChild(draggedTask);
    }
  });
});
