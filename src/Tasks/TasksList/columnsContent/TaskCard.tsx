import { Card, Tooltip, Button } from 'antd';
import { CheckOutlined, ClockCircleOutlined, CaretRightOutlined, EyeOutlined } from '@ant-design/icons';
import * as classes from './ColumnsContent.css';
import type { Task } from '../../../types/task.interface';
import { usePreferences } from '../../../hooks/usePreferences';

interface TaskCardProps {
    data: Task;
    columnIndex: number;
    isMobile: boolean;
    onModalOpen: (value: boolean) => void;
    onFinishTask?: (value: boolean) => void;
    onPauseTask?: (value: boolean) => void;
    onDetailsTask?: (value: boolean) => void;
    onSelectTask?: (taskId: any) => void;
    onStart?: (taskId: any) => void;
}

const TaskCard = ({ data, columnIndex, isMobile, onModalOpen, onFinishTask, onPauseTask, onDetailsTask, onSelectTask, onStart }: TaskCardProps) => {
    const {preferences} = usePreferences();
    const handleShowTitle = (text: string) => {
        if (columnIndex != 1) {
            return <span style={{fontSize: preferences.fontSize}}>{text}</span>;
        } else {
            return (
               <Tooltip placement="topLeft" title={text}>
                    <span style={{fontSize: preferences.fontSize}}>{text}</span>
                </Tooltip> 
            );
        }
    }

    const handleCardButtons = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <Button 
                    className={classes.actionButton} 
                    onClick={() => {
                        onStart?.(data.id)
                    }} 
                    type="primary" 
                    icon={<CaretRightOutlined />} 
                    size={'medium'}>
                        <span className={classes.actionText}>Iniciar</span>
                    </Button>
                );
            case 1:
                return (
                    <>
                        {!isMobile ? (
                            <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                                <Button 
                                className={classes.actionButton} 
                                type="primary" icon={<CheckOutlined />} 
                                size={'medium'} 
                                onClick={() => {
                                    onModalOpen(true); 
                                    onFinishTask?.(true); 
                                    onSelectTask?.(data?.id)
                                }}>
                                    <span className={classes.actionText}>Finalizar</span>
                                </Button>
                             
                                <Button 
                                className={classes.actionButton} 
                                type="primary" 
                                icon={<ClockCircleOutlined />} 
                                size={'medium'} 
                                onClick={() => {
                                    onModalOpen(true); 
                                    onPauseTask?.(true); 
                                    onSelectTask?.(data?.id)
                                }}>
                                    <span className={classes.actionText}>Pausar tarefa</span>
                                </Button>
                           
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                                <Button 
                                type="primary" 
                                icon={<CheckOutlined />} 
                                size={'medium'} 
                                onClick={() => {
                                    onModalOpen(true); 
                                    onFinishTask?.(true); 
                                    onSelectTask?.(data?.id)
                                }}/>
                                <Button 
                                type="primary" 
                                icon={<ClockCircleOutlined />} 
                                size={'medium'} 
                                onClick={() => {
                                    onModalOpen(true); 
                                    onPauseTask?.(true); 
                                    onSelectTask?.(data?.id)
                                }}/>
                            </div>
                        )}
                    </>
                )
        }
    }

    function formatEstimatedTime(value: string): string {
        const [hours, minutes] = value 
            ? value?.split(":").map(Number) 
            : ('00:00').split(':').map(Number);

        const parts: string[] = [];

        if (hours > 0) {
            parts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
        }

        if (minutes > 0) {
            parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
        }

        return parts.join(" e ");
    }

    return (
        <div className={classes.card}>
            <Card
            style={{backgroundColor: data.cardColor}} 
            title={handleShowTitle(data?.title)} 
            variant="borderless" 
            extra={handleCardButtons(columnIndex)}>
                <div 
                className={classes.actionButton} style={{width: '100%', fontSize: preferences.fontSize}}
                onClick={() => {
                    onModalOpen(true); 
                    onDetailsTask?.(true); 
                    onSelectTask?.(data?.id);
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        {preferences.complexityLevel != 1 && (
                            <>
                                <div>
                                    <span style={{paddingRight: '4px', color: 'darkGray'}}>Resumo:</span>
                                    <span>{data.summary}</span>
                                </div>
                                <div>
                                    <span style={{paddingRight: '4px', color: 'darkGray'}}>Horas estimadas:</span>
                                    <span>{formatEstimatedTime(data.estimatedTime)}</span>
                                </div>
                            </>
                        )
                            }
                        <div>
                            {preferences.complexityLevel === 1 && (
                                <>
                                    {data.finishedAt ? (
                                        <>
                                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Finalizado em:</span>
                                            <span>{data.finishedAt?.toDate().toLocaleString()}</span>
                                        </>
                                    ) : data.startedAt ? (
                                        <>
                                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Data limite:</span>
                                            <span>{data.deadline}</span>
                                        </>
                                    ) : data.status === 'new' && (
                                        <>
                                        <div>
                                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Horas estimadas:</span>
                                            <span>{formatEstimatedTime(data.estimatedTime)}</span>
                                        </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {!isMobile && (
                        <Tooltip title="Visualizar detalhes">
                            <Button 
                            className={classes.actionText} 
                            shape="circle" 
                            type='link' 
                            icon={<EyeOutlined />}
                            />
                        </Tooltip>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default TaskCard;