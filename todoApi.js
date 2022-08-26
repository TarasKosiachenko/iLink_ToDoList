const express = require("express");
const cors = require("cors");
const app = express();

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next();
}

app.use(express.json());
app.use(logRequest);
app.use(cors());

const inc =
  (init = 0) =>
  () =>
    ++init;
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
    deskription:
      " task done this task done this task done this task done this task",
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
    date: data.date,
    deskription: data.deskription,
  };
};

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  const todo = createTask(req.body);
  todos.push(todo);
  res.json(todos);
});

app.patch("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === todoId);

  if (todo) {
    Object.assign(todo, req.body);
    res.json(todos);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = todos.findIndex((p) => p.id == id);
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todos.splice(itemIndex, 1);
    res.json(todos);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});