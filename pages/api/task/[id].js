
import { Task } from "@models/task";
import { asyncError, errorHandler } from "@middlewares/error";
import { checkAuth, connectDB } from "@utils/features";

const handler = asyncError(async (req, res) => {
  const { id } = req.query;

  await connectDB();

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login first to update a task");

  if (req.method === "PUT") {
    const { status, priority, dueDate } = req.body;

    // Ensure that at least one field is provided for update
    if (!status && !priority && !dueDate) {
      return errorHandler(res, 400, "Please provide at least one field to update");
    }

    // Only update fields that are provided
    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (dueDate) updateData.dueDate = new Date(dueDate);

    const task = await Task.findOneAndUpdate(
      { _id: id, user: user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return errorHandler(res, 404, "Task not found or you are not authorized");
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } else if (req.method === "DELETE") {
    const task = await Task.findOneAndDelete({ _id: id, user: user._id });

    if (!task) {
      return errorHandler(res, 404, "Task not found or you are not authorized");
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } else {
    return errorHandler(res, 400, "Method not allowed");
  }
});

export default handler;
