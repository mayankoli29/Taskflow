
"use client";

import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Design dashboard", status: "In Progress", priority: "High" },
  { id: 2, title: "Build task form", status: "To Do", priority: "Medium" },
  { id: 3, title: "Create project structure", status: "Done", priority: "Low" },
];

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");

  function addTask(e) {
    e.preventDefault();

    if (!title.trim()) return;

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: title.trim(),
        status: "To Do",
        priority,
      },
    ]);

    setTitle("");
    setPriority("Medium");
  }

  function updateStatus(id, status) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  const columns = ["To Do", "In Progress", "Done"];

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="app">
      <aside className="sidebar">
        <h2>TaskFlow.</h2>
        <p>WORKSPACE</p>
        <div className="nav active">▦ Dashboard</div>
        <div className="nav">✓ My Tasks</div>
        <div className="nav">⚙ Settings</div>
        <p className="sidebar-bottom">Plan. Focus. Achieve.</p>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <span>Workspace / Dashboard</span>
          <span>Mayank's Workspace</span>
        </header>

        <div className="content">
          <h1>Manage your work.</h1>
          <p className="subtitle">
            Organize tasks and make progress every day.
          </p>

          <div className="stats">
            <article className="stat">
              <span>Total tasks</span>
              <h2>{tasks.length}</h2>
            </article>
            <article className="stat">
              <span>In progress</span>
              <h2>{tasks.filter(t => t.status === "In Progress").length}</h2>
            </article>
            <article className="stat">
              <span>Completed</span>
              <h2>{tasks.filter(t => t.status === "Done").length}</h2>
            </article>
          </div>

          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
          />

          <form className="task-form" onSubmit={addTask}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a new task..."
              aria-label="New task title"
              required
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Task priority"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button type="submit">+ Add task</button>
          </form>

          <div className="board">
            {columns.map((column) => (
              <section className="column" key={column}>
                <h3>
                  {column}
                  <span>{filteredTasks.filter(t => t.status === column).length}</span>
                </h3>

                {filteredTasks
                  .filter((task) => task.status === column)
                  .map((task) => (
                    <article className="task" key={task.id}>
                      <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority} priority
                      </span>

                      <p>{task.title}</p>

                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        aria-label={`Status for ${task.title}`}
                      >
                        {columns.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <button
                        className="delete"
                        type="button"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </article>
                  ))}

                {filteredTasks.filter(t => t.status === column).length === 0 && (
                  <p className="empty">No tasks found</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
