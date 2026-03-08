import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/tasks/task.service";

export function useRegisterNewTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
}