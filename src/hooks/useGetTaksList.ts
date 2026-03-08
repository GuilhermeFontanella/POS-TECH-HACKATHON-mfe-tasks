import { useQuery } from "@tanstack/react-query";
import { getTasksList } from "../services/tasks/task.service";

export function useGetTaskList() {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasksList
    });
}