const todos = [
  {
    name: "task 1",
    done: true,
    deskription: "delete this task",
    date: "2022-08-24",
  },
  {
    name: "task 2",
    done: false,
    deskription: " task done this task done this task done this task done this task",
    date: "2022-08-23",
  },
  {
    name: "task 3",
    done: false,
    deskription: "ores at, maiores consequatur.20",
    date: "2022-08-27",
  },
];

const todoName = document.querySelector(".input_name");
const todoDate = document.querySelector(".input_date");
const todoDescription = document.querySelector(".input_desc");
const todoList = document.querySelector(".todo_list");

todoList.innerHTML = todos
  .map((todo) => {
    return `<li>
    <div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4998 2.33325H3.49984C2.21117 2.33325 1.1665 3.37792 1.1665 4.66659V10.4999C1.1665 11.7886 2.21117 12.8333 3.49984 12.8333H10.4998C11.7885 12.8333 12.8332 11.7886 12.8332 10.4999V4.66659C12.8332 3.37792 11.7885 2.33325 10.4998 2.33325Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.6665 1.16663V3.49996M9.33317 1.16663V3.49996M1.1665 5.83329H12.8332" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${todo.date}</span>
    </div>

    <div>
      <input type="checkbox">
      <h5>${todo.name}</h5>
    </div>

    <div>
      <p>${todo.deskription}</p>
    </div>

  </li>`;
  })
  .join("");

const update = () => {
  todoList.innerHTML = todos
    .map((todo) => {
      return `<li>
    <div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4998 2.33325H3.49984C2.21117 2.33325 1.1665 3.37792 1.1665 4.66659V10.4999C1.1665 11.7886 2.21117 12.8333 3.49984 12.8333H10.4998C11.7885 12.8333 12.8332 11.7886 12.8332 10.4999V4.66659C12.8332 3.37792 11.7885 2.33325 10.4998 2.33325Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.6665 1.16663V3.49996M9.33317 1.16663V3.49996M1.1665 5.83329H12.8332" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${todo.date}</span>
    </div>

    <div>
      <input type="checkbox">
      <h5>${todo.name}</h5>
    </div>

    <div>
      <p>${todo.deskription}</p>
    </div>

  </li>`;
    })
    .join("");
};


  document.querySelector(".createTodo").addEventListener("click", () => {
    if(todoName.value.length) {
      todos.push({
        name: todoName.value,
        done: false,
        deskription: todoDescription.value,
        date: todoDate.value,
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
  });
