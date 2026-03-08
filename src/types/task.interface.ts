import type { Timestamp } from "firebase/firestore";

export interface TaskCommons {
    id: any;
    title: string;
    description: string;
    summary: string;
    deadline: string;
    estimatedTime: string;
    completed: boolean;
    startedAt: Timestamp;
    finishedAt: Timestamp;
    status: 'new' | 'doing' | 'done',
    createdAt: Timestamp;
    pausedAt?: Timestamp;
}

export interface Task extends TaskCommons {
    cardColor: any;
    subTasks: TaskCommons[];
}