import { Typography } from 'antd';
import TaskCard from './TaskCard';
import { forwardRef } from 'react';

interface ColumnsContentProps {
    columnTitle: string;
    isMobile: boolean;
    list: any[];
    onModalOpen: (value: boolean) => void;
    onFinishTask?: () => void;
    onPauseTask?: () => void;
    onDetailsTask?: () => void;
    columnIndex: number;
    //ref: React.Ref<HTMLUListElement>;
    onSelectTask?: (value: number) => void;
}

const ColumnsContent = forwardRef<HTMLUListElement, ColumnsContentProps>(
    (
        {
            columnTitle, 
            isMobile, 
            list, 
            onModalOpen,
            onFinishTask,
            onPauseTask,
            onDetailsTask,
            columnIndex,
            onSelectTask
        }, 
        ref
    ) => {
    return (
        <>
            <Typography.Title level={3} style={{ marginLeft: 16 }}>
                {columnTitle}
            </Typography.Title>
            <ul style={{ height: '100%', listStyle: 'none', padding: 10 }} ref={ref}>{list.map((todo) => (
                <li className="kanban-item" style={{ padding: 5 }} key={`${todo?.id}`}>
                    <TaskCard 
                    data={todo} 
                    columnIndex={columnIndex} 
                    isMobile={isMobile} 
                    onModalOpen={onModalOpen}
                    onFinishTask={onFinishTask}
                    onPauseTask={onPauseTask}
                    onDetailsTask={onDetailsTask}
                    onSelectTask={onSelectTask} />
                </li>
            ))}
            </ul>
        </>
    )
});

export default ColumnsContent;