import { Task } from "@models/task";  
import { asyncError, errorHandler } from "@middlewares/error";
import { checkAuth, connectDB } from "@utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");

  await connectDB();

  const { title, description, status, priority, dueDate } = req.body;

  // Validate required fields
  if (!title) {
    return errorHandler(res, 400, "Please enter the task title");
  }

  // Optionally, validate enums if provided (Mongoose will handle invalid enums)
  // But you can add custom validations if needed

  // Authenticate the user
  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login first to create a task");

  // Create the task
  const task = await Task.create({
    title,
    description: description || "", // Default to empty string if not provided
    status: status || "To Do", // Default to "To Do" if not provided
    priority: priority || "Medium", // Default to "Medium" if not provided
    dueDate: dueDate ? new Date(dueDate) : null, // Convert to Date object if provided
    user: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
});

export default handler;