"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const TaskItem = ({ todo, onDragStart, onDragEnd }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "To Do":
        return <Circle className="h-4 w-4 text-slate-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "Low":
        return <AlertCircle className="h-4 w-4 text-slate-500" />;
      case "Medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "High":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card
      className="mb-2 cursor-move"
      draggable
      onDragStart={(e) => onDragStart(e, todo)}
      onDragEnd={onDragEnd}
    >
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {getStatusIcon(todo.title)}
          <span className="truncate">{todo.title}</span>
          <GripVertical className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {todo.description && (
          <p className="text-xs text-muted-foreground mb-2">
            {todo.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {getPriorityIcon(todo.priority)}
            <span className="ml-1">{todo.priority}</span>
          </Badge>
          {todo.dueDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {format(new Date(todo.dueDate), "MMM d")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default TaskItem;
