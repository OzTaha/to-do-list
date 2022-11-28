window.onload = loadTasks;

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
});

function loadTasks() {

    if (localStorage.getItem("tasks") == null) return;

    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(task => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
        list.insertBefore(li, list.children[0]);
      });
}

// Task ekleme

function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector("ul");

    if (task.value === "") {
        alert("Lütfen görev ekleyin!");
        return false;
    }

    if (document.querySelector(`input[value="${task.value}"]`)) {
        alert("Görev zaten var!");
        return false;
      }

      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa-solid fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    task.value = "";
}

// task düzenleme 

var getCurrentTask = null;

function getCurrentTask(event) {
    currentTask = event.value;
}

function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
 
    if (event.value === "") {
      alert("Görev boş!");
      event.value = currentTask;
      return;
    }

    tasks.forEach(task => {
      if (task.task === event.value) {
        alert("Görev zaten var!");
        event.value = currentTask;
        return;
      }
    });
  
    tasks.forEach(task => {
      if (task.task === currentTask) {
        task.task = event.value;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // complete edilen task'ı işaretleme

  function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.nextElementSbling.classList.toggle("completed");
  }

  // tüm task'ı silme 

  function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();
  }
