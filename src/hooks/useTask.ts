import { useState } from "react";
import type { Task } from "../types/task.interface";
import { getTaskById } from "../services/tasks/task.service";

export const useTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  const taskById = async (id: string) => {
    try {
      setLoading(true);

      const data = await getTaskById(id);

      setTask(data);

      return data;

    } finally {
      setLoading(false);
    }
  };

  return {
    task,
    loading,
    taskById
  };
};