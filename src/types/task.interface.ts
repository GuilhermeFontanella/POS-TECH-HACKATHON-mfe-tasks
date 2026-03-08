export interface TaskCommons {
    id: any;
    title: string;
    description: string;
    summary: string;
    deadline: string;
    estimatedTime: string;
    completed: boolean;
    startedAt: string;
    finishedAt: string;
    status: 'new' | 'doing' | 'done'
}

export interface Task extends TaskCommons {
    cardColor:string;
    subTasks: TaskCommons[];
}