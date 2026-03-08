import type { Task } from "../types/task.interface";
import { updateTask } from "../services/tasks/task.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });

  const update = (id: string, data: Partial<Task>) => {
    return mutation.mutateAsync({ id, data });
  };

  return {
    update,
    loading: mutation.isPending,
    error: mutation.error
  };
};