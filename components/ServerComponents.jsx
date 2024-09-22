import React from "react";
import { TodoButton } from "./Clients";

export const TodoItem = ({ title, description, id, completed }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 shadow-md rounded-lg p-4">
      <div>
        <h4 className={`text-lg font-semibold ${completed ? "line-through text-gray-500" : ""}`}>
          {title}
        </h4>
        <p className={`text-sm ${completed ? "line-through text-gray-400" : "text-gray-700"}`}>
          {description}
        </p>
      </div>

      <div>
        <TodoButton id={id} completed={completed} />
      </div>
    </div>
  );
};
