const addTaskBtn = document.getElementById("addTasks");
const popupForm = document.getElementById("myForm");
let cancelForm = document.getElementById("cancel");
let overlay = document.getElementById("overlay");

let taskRequest = document.querySelector(".task-request");
let dateRequest = document.querySelector(".date-request");
let timeRequest = document.querySelector(".time-request");
const form = document.querySelector("form");
const data = document.querySelector(".table");

let myTasks = [];
let taskIdCounter = 1;

function theTasks(task, date, time) {
  this.taskId = taskIdCounter++;
  this.task = task;
  this.date = date;
  this.time = time;
}
const addTasks = (e) => {
  e.preventDefault();
  const taskInput = document.getElementById("task");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  const task = taskInput.value;
  const date = dateInput.value;
  const time = timeInput.value;

  if (task && date && time) {
    const newTask = new theTasks(task, date, time);
    myTasks.push(newTask);
    renderTask();
    setData();
    console.log(myTasks);
    form.reset();
    popupForm.style.display = "none";
    overlay.style.display = "none";
    taskRequest.innerText = "";
    dateRequest.innerText = "";
    timeRequest.innerText = "";
  } else if (!task) {
    taskRequest.innerText = "Please fill the form!";
  } else if (!date) {
    dateRequest.innerText = "Please fill the form!";
  } else if (!time) {
    timeRequest.innerText = "Please fill the form!";
  }
};

const renderTask = () => {
  const table = document.querySelector("#task-data tbody");
  table.innerHTML = "";

  myTasks.forEach((taskItem, index) => {
    const row = document.createElement("tr");
    taskItem.taskId = index + 1;

    row.innerHTML = `<th scope="row" class="id-row">${taskItem.taskId}</th>
            <td class="task-row">${taskItem.task}</td>
            <td class="date-row">${taskItem.date}</td>
            <td class="time-row">${taskItem.time}</td>
            <td class="switch-row">
            <div class="form-check form-switch">
            <input
              class="form-check-input "
              type="checkbox"
              role="switch"
              id="action_${taskItem.taskId}"
              name="action"
              
            />
            <button class="delete-btn"><i class="fa-solid fa-trash-can fa-lg" style="color: #0c0f12;"></i></button>
          </div>
          </td>
   
          `;

    const deleteRow = row.querySelector(".delete-btn");
    deleteRow.addEventListener("click", () => {
      const remove = myTasks.findIndex(
        (item) => item.taskId === taskItem.taskId
      );
      if (remove !== -1) {
        myTasks.splice(remove, 1);
        renderTask();
        setData();
      }
    });
    table.appendChild(row);

    const action = row.querySelector(`#action_${taskItem.taskId}`);

    action.addEventListener("change", () => {
      action.checked
        ? row.classList.add("muted-row")
        : row.classList.remove("muted-row");
      setData();
    });
  });
};

const setData = () => {
  localStorage.setItem(`myTasks`, JSON.stringify(myTasks));
};
const getData = () => {
  const storedData = localStorage.getItem("myTasks");
  if (storedData) {
    myTasks = JSON.parse(storedData);
    renderTask();
  }
};
const popUp = () => {
  popupForm.style.display = "block";
  overlay.style.display = "block";
};
addTaskBtn.addEventListener("click", popUp);

cancelForm.addEventListener("click", () => {
  popupForm.style.display = "none";
  overlay.style.display = "none";
});
form.addEventListener("submit", addTasks);
document.addEventListener("DOMContentLoaded", getData);
