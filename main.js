const coaching = [
  {
    id: 1,
    name: "basketball",
    done: false,
    deskription: "",
    date: new Date("2022-08-22"),
  },
  {
    id: 2,
    name: "voleyball",
    done: true,
    date: "",
    deskription: " task done this task done this task",
  },
  {
    id: 3,
    name: "runing",
    done: false,
    date: new Date("2022-08-27"),
    deskription: "",
  },
  {
    id: 4,
    name: "swimming",
    done: false,
    date: new Date("2022-08-29"),
    deskription: "gfgfdhfsfsdghsdgsdg asdfdwf",
  },
];

const workoutList = document.querySelector(".workout_list");

///////////////////////////
const todos = [
  {
    id: 1,
    name: "Learn Node.js",
    done: false,
    deskription: "",
    date: new Date("2022-08-22"),
  },
  {
    id: 2,
    name: "Learn JavaScript",
    done: true,
    date: "",
    deskription: " task done this task done this task done this task done this task",
  },
  {
    id: 3,
    name: "Learn React",
    done: false,
    date: new Date("2022-08-27"),
    deskription: "",
  },
  {
    id: 4,
    name: "Learn TypeScript",
    done: false,
    date: new Date("2022-08-29"),
    deskription: "gfgfdhfsfsdghsdgsdg asdfdwf",
  },
];

const todoName = document.querySelector(".input_name");
const todoDate = document.querySelector(".input_date");
const todoDescription = document.querySelector(".input_desc");
const todoList = document.querySelector(".todo_list");

function renderList(blockList, array) {
  blockList.innerHTML = array
    .map((todo) => {
      return `<li onclick="changeTargetInput(event)" id=${todo.id} class="${(todo.date instanceof Date && todo.date < Date.now()) ? "overdue" : ""} ${todo.done ? "done" : ""}">
    <div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4998 2.33325H3.49984C2.21117 2.33325 1.1665 3.37792 1.1665 4.66659V10.4999C1.1665 11.7886 2.21117 12.8333 3.49984 12.8333H10.4998C11.7885 12.8333 12.8332 11.7886 12.8332 10.4999V4.66659C12.8332 3.37792 11.7885 2.33325 10.4998 2.33325Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.6665 1.16663V3.49996M9.33317 1.16663V3.49996M1.1665 5.83329H12.8332" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${(todo.date instanceof Date) ? todo.date.toISOString().split('T')[0] : ''}</span>
    </div>

    <div>
      <input class='checkboxTask' type="checkbox" ${todo.done ? "checked" : ""}>
      <h5>${todo.name ? todo.name : ''}</h5>
    </div>

    <div>
      <p>${todo.deskription ? todo.deskription : ''}</p>
    </div>
    <button type="button" class="btn btn-outline-danger delete_task">x</button>
  </li>`;
    })
    .join("");
};
renderList(todoList, todos);
renderList(workoutList, coaching);

const update = () => {
  renderList(todoList, todos);
}

document.querySelector(".createTodo").addEventListener("click", () => {
  if (todoName.value.length) {
    todos.push({
      id: Math.floor(Math.random() * 10000),
      name: todoName.value,
      done: false,
      deskription: todoDescription.value,
      date: todoDate.value.length ? new Date(`${todoDate.value}`) : '',
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
    setTimeout(() => errText.style.opacity = "", 2000);
    setTimeout(() => todoName.style.border = "", 2000);
  }
  update();
  let del = document.getElementsByClassName("delete_task");

  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", deleteListElement);
  }
});

let del = document.getElementsByClassName("delete_task");

for (let i = 0; i < del.length; i++) {
  del[i].addEventListener("click", deleteListElement);
}

function deleteListElement() {
  let index = todos.map(todo => {
    return todo.id;
  }).indexOf(Number(this.parentElement.id));

  todos.splice(index, 1);
  this.parentElement.remove();
}

// const inputTask = document.querySelector(".checkboxTask");
function changeTargetInput(event) {
  event.stopPropagation();
  if(event.target.className === 'checkboxTask') {
    event.currentTarget.classList.toggle('done')
  }
}


function changeTargerRadioTodo(event) {
  event.stopPropagation();
  if(event.target.id === 'btnradio2') {
    document.querySelector(".todo_list").classList.remove('show-done')
  } else if (event.target.id === 'btnradio1') {
    document.querySelector(".todo_list").classList.add('show-done')
  }
}



// ---------arrow-------
function closeTodoList() {
  document.querySelector(".close_todo_arrow").classList.toggle("show");
  document.querySelector(".todo_list").classList.toggle("close_task");
}
function closeWorkoutList() {
  document.querySelector(".close_workout_arrow").classList.toggle("show");
  document.querySelector(".workout_list").classList.toggle("close_task");
}
// --------------------
