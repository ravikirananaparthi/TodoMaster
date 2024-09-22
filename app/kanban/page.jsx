"use client";
import React, { useContext, useState, useRef } from "react";

import { Context } from "@components/Clients";
import TaskItem from "@components/TaskItem";

const columns = [
  { id: "To Do", title: "📋 To Do" },
  { id: "In Progress", title: "🚀 In Progress" },
  { id: "Completed", title: "✅ Completed" },
];

export default function KanbanBoard() {
  const { myTasks } = useContext(Context);
  const [todos, setTodos] = useState(myTasks);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const onDragStart = (e, todo) => {
    dragItem.current = todo;
  };

  const onDragEnter = (e, status) => {
    dragOverItem.current = status;
  };

  const onDragEnd = async () => {
    if (dragItem.current && dragOverItem.current) {
      const updatedTodo = { ...dragItem.current, status: dragOverItem.current };

      try {
        const response = await fetch(`/api/task/${updatedTodo._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updatedTodo.status }),
        });

        if (response.ok) {
          const newTodos = todos.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo
          );
          setTodos(newTodos);
        } else {
          console.error("Failed to update task status");
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col"
            onDragEnter={(e) => onDragEnter(e, column.id)}
            onDragOver={onDragOver}
          >
            <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
            <div
              className={`bg-gray-300 p-2 rounded-lg flex-grow min-h-[200px] border-2 ${
                column.id === "To Do"
                  ? "border-purple-500"
                  : column.id === "In Progress"
                  ? "border-orange-500"
                  : column.id === "Completed"
                  ? "border-green-500"
                  : "border-blue-500" // Default case
              }`}
            >
              {todos
                .filter((todo) => todo.status === column.id)
                .map((todo) => (
                  <TaskItem
                    key={todo._id}
                    todo={todo}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
