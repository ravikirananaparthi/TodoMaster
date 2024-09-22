"use client";
import { useState, useEffect, useMemo, useContext } from "react";
import { AddTask } from "@components/AddTask";
import { Filters } from "@components/Filters";
import { TodoItem } from "@components/TodoItem";
import { isToday } from "date-fns";
import { useRouter } from "next/navigation";
import { Context } from "@components/Clients";
import toast from "react-hot-toast";

export default function Page() {
  const [todos, setTodos] = useState([]);
  const { user, myTasks, setMg } = useContext(Context);

  const [filters, setFilters] = useState({
    title: "",
    status: "",
    priority: "",
    dueDate: null,
  });

  useEffect(() => {
    fetchTasks();
  }, []);
  const router = useRouter(); // Initialize router
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/mytask");
      const data = await response.json();
      if (data.success) {
        setTodos(data.tasks);
        setMg(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  console.log(myTasks);
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const titleMatch = todo.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const statusMatch = !filters.status || todo.status === filters.status;
      const priorityMatch =
        !filters.priority || todo.priority === filters.priority;
      const dueDateMatch =
        !filters.dueDate || (todo.dueDate && isToday(new Date(todo.dueDate)));
      return titleMatch && statusMatch && priorityMatch && dueDateMatch;
    });
  }, [todos, filters]);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      if (data.success) {
        setTodos([...todos, data.task]);
      }
      toast.success(data.message)
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (data.success) {
        setTodos(todos.map((todo) => (todo._id === id ? data.task : todo)));
      }
      toast.success(data.message)
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
      toast.success(data.message)
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <AddTask onAddTask={handleAddTask} />
      </div>

      <Filters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}
