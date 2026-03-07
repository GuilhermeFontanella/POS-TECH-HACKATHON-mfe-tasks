export interface TaskCommons {
    id: number;
    title: string;
    description: string;
    summary: string;
    deadline: string;
    estimatedTime: string;
    completed: boolean;
    startedAt: string;
    finishedAt: string;
}

export interface Task extends TaskCommons {
    cardColor:string;
    subTasks: TaskCommons[];
}