import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CalendarIcon,
  CheckCircle2,
  CircleDot,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ChartSpline } from "lucide-react";
import { EditTask } from "./EditTask";
export function TodoItem({ todo, onUpdateTask, onDeleteTask }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "To Do":
        return <CircleDot className="h-4 w-4 text-slate-500" />;
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
    <Card key={todo._id}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>{todo.title}</span>
          <Badge variant="outline" className="ml-2">
            {getStatusIcon(todo.status)}
            <span className="ml-1">{todo.status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {todo.description && <p>{todo.description}</p>}
        <div className="flex items-center mt-4 mb-4">
          {getPriorityIcon(todo.priority)}
          <span className="ml-1 text-sm">{todo.priority} Priority</span>
        </div>
        {todo.dueDate && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{format(new Date(todo.dueDate), "PPP")}</span>
          </div>
        )}
        <div className="mt-4 flex justify-end space-x-2">
        <EditTask todo={todo} onUpdateTask={onUpdateTask} />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onUpdateTask(todo._id, {
                status: todo.status === "Completed" ? "To Do" : "Completed",
              })
            }
          >
            {todo.status === "Completed" ? "Reopen" : "Completed"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDeleteTask(todo._id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
