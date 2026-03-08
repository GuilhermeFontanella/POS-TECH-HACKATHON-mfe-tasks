import { useState } from "react";
import type { Task } from "../types/task.interface";
import { updateTask } from "../services/tasks/task.service";



export const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: Partial<Task>) => {
    try {
      setLoading(true);
      setError(null);

      const updatedTask = await updateTask(id, data);

      return updatedTask;

    } catch (err: any) {
      setError(err.message);
      throw err;

    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
    error
  };
};