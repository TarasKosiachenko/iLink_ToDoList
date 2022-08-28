const todoName = document.querySelector(".input_name");
const todoDate = document.querySelector(".input_date");
const todoDescription = document.querySelector(".input_desc");
const todoList = document.querySelector(".todo_list");
const workoutList = document.querySelector(".workout_list");

let todos = [];
const contactsEndpoint = "http://localhost:5000/todos/";

function getServerTask() {
  return fetch(contactsEndpoint)
  .then(function (response) {
    showStatusCode(response.status)
    return response.json()
  })
    .then((resArr) => {
      todos = resArr;
      renderList(todoList, todos);
      isEmptyList();
    })
    .catch(function (error) {
      showStatusCode(error)
      console.log('error', error)
    })

}
getServerTask();

function createServerTask(todo) {
  return fetch(contactsEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((resArr) => {
      todos = resArr;
      renderList(todoList, todos);
      isEmptyList();
    });
}

function updateServerTask(id, todo) {
  return fetch(contactsEndpoint + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((resArr) => {
      todos = resArr;
      renderList(todoList, todos);
    });
}

function deleteServerTask(id) {
  return fetch(contactsEndpoint + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((resArr) => {
      todos = resArr;
      renderList(todoList, todos);
    });
}

function renderList(blockList, array) {
  blockList.innerHTML = array
    .map((todo) => {
      return `<li onclick="changeTargetInput(event)" id=${todo.id} class="${
        new Date(todo.date) < Date.now() ? "overdue" : ""
      } ${todo.done ? "done" : ""}">
    <div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4998 2.33325H3.49984C2.21117 2.33325 1.1665 3.37792 1.1665 4.66659V10.4999C1.1665 11.7886 2.21117 12.8333 3.49984 12.8333H10.4998C11.7885 12.8333 12.8332 11.7886 12.8332 10.4999V4.66659C12.8332 3.37792 11.7885 2.33325 10.4998 2.33325Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.6665 1.16663V3.49996M9.33317 1.16663V3.49996M1.1665 5.83329H12.8332" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${getFormDate(todo.date)}</span>
    </div>

    <div>
      <input class='checkboxTask' type="checkbox" ${todo.done ? "checked" : ""}>
      <h5>${todo.name ? todo.name : ""}</h5>
    </div>

    <div>
      <p>${todo.deskription ? todo.deskription : ""}</p>
    </div>
    <button type="button" onclick="deleteListElement(event)" class="btn btn-outline-danger delete_task">x</button>
  </li>`;
    })
    .join("");
}

function getFormDate(date) {
  if (date === "" || date === null) {
    return "no date";
  } else {
    return new Date(date).toISOString().split("T")[0];
  }
}

document.querySelector(".createTodo").addEventListener("click", () => {
  if (todoName.value.length) {
    const todo = {
      name: todoName.value,
      deskription: todoDescription.value,
      date: todoDate.value ? todoDate.value : "",
    };

    createServerTask(todo).then(() => {
      renderList(todoList, todos);
      isEmptyList();
    });

    todoName.value = "";
    todoDescription.value = "";
    todoDate.value = "";
  } else {
    let errText = document.querySelector(".err_empty_name");
    errText.style.opacity = "1";
    errText.style.transition = "all 1s ease-out";
    todoName.style.border = "1px solid red";
    todoName.style.transition = "all 1s ease-out";
    setTimeout(() => (errText.style.opacity = ""), 2000);
    setTimeout(() => (todoName.style.border = ""), 2000);
  }
});

function deleteListElement(event) {
  deleteServerTask(event.path[1].id).then(() => {
    renderList(todoList, todos);
    isEmptyList();
  });
}

function isEmptyList() {
  if (todoList.clientHeight === 0) {
    document.querySelector(".empty_todo_list_text").style.display = "block";
  } else if (todoList.clientHeight !== 0) {
    document.querySelector(".empty_todo_list_text").style.display = "none";
  }
  if (workoutList.clientHeight === 0) {
    document.querySelector(".empty_workout_list_text").style.display = "block";
  } else if (workoutList.clientHeight !== 0) {
    document.querySelector(".empty_workout_list_text").style.display = "none";
  }
}

function showStatusCode(status) {
  if(status !== 200) {
    document.querySelector(".alert-danger").style.opacity = "1";
    setTimeout(function () {
      document.querySelector(".alert-danger").style.opacity = "0";
    }, 3000);
  } else if (status == 200) {
    document.querySelector(".alert-success").style.opacity = "1";
    setTimeout(function () {
      document.querySelector(".alert-success").style.opacity = "0";
    }, 3000);
  }
}

function changeTargetInput(event) {
  event.stopPropagation();
  if (event.target.className === "checkboxTask") {
    const t = todos.find((t) => t.id === Number(event.currentTarget.id));
    const todo = {
      done: !t.done,
    };
    updateServerTask(Number(event.currentTarget.id), todo).then(() => {
      renderList(todoList, todos);
      isEmptyList();
    });
    event.currentTarget.classList.toggle("done");
  }
}

function changeTargerRadio(event) {
  event.stopPropagation();
  if (event.target.id === "btnradio2") {
    document.querySelector(".todo_list").classList.remove("show-done");
  } else if (event.target.id === "btnradio1") {
    document.querySelector(".todo_list").classList.add("show-done");
  }
  if (event.target.id === "workout1") {
    workoutList.classList.remove("show-done");
  } else if (event.target.id === "workout2") {
    workoutList.classList.add("show-done");
  }
  isEmptyList();
}

// ---------arrow-------
function closeTodoList() {
  document.querySelector(".close_todo_arrow").classList.toggle("show");
  document.querySelector(".todo_list").classList.toggle("close_task");
}
function closeWorkoutList() {
  document.querySelector(".close_workout_arrow").classList.toggle("show");
  workoutList.classList.toggle("close_task");
}
// --------------------
