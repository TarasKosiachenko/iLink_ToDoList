const express = require("express");
const cors = require('cors');
const app = express();

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next();
}

app.use(express.json());
app.use(logRequest);
app.use(cors());

const inc = (init = 0) => () => ++init;
const genId = inc();

const todos = [
  {
    id: genId(),
    name: "Learn Node.js",
    done: false,
    deskription: "",
    date: "2022-08-22",
  },
  {
    id: genId(),
    name: "Learn JavaScript",
    done: true,
    date: "",
    deskription: " task done this task done this task done this task done this task",
  },
  {
    id: genId(),
    name: "Learn React",
    done: false,
    date: "2022-08-27",
    deskription: "",
  },
  {
    id: genId(),
    name: "Learn TypeScript",
    done: false,
    date: "2022-08-29",
    deskription: "gfgfdhfsfsdghsdgsdg asdfdwf",
  },
];

const createTask = (data) => {
  return {
    id: genId(),
    name: data.name,
    done: false,
    date: data.due_date,
    deskription: data.deskription,
  };
};


// Getting a list of all todos > curl localhost:5000/todos
app.get("/todos", (req, res) => res.json(todos));

// Creating a new todos > curl localhost:5000/todos -d '{ "title": "Generate ID" }' -H 'Content-type: application/json'
app.post("/todos", (req, res) => {
  const todo = createTask(req.body);
  todos.push(todo);
  res.json(todo);
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});