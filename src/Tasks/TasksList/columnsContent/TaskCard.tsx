import { Card, Tooltip, Button } from 'antd';
import { CheckOutlined, ClockCircleOutlined, CaretRightOutlined, EyeOutlined } from '@ant-design/icons';
import * as classes from './ColumnsContent.css';
import type { Task } from '../../../types/task.interface';

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

    const handleShowTitle = (text: string) => {
        if (columnIndex != 1) {
            return text;
        } else {
            return (
               <Tooltip placement="topLeft" title={text}>
                    {text}
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
                                <Tooltip title="Pausar tarefa">
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
                                    <span className={classes.actionText}>10:23</span>
                                </Button>
                                </Tooltip>
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

    return (
        <div className={classes.card}>
            <Card 
            title={handleShowTitle(data?.title)} 
            variant="borderless" 
            extra={handleCardButtons(columnIndex)}>
                <div 
                className={classes.actionButton} style={{width: '100%'}}
                onClick={() => {
                    onModalOpen(true); 
                    onDetailsTask?.(true); 
                    onSelectTask?.(data?.id);
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <div>
                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Resumo:</span>
                            <span>Lorem ipsum dolor sit amet</span>
                        </div>
                        <div>
                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Horas estimadas:</span>
                            <span>1h</span>
                        </div>
                        <div>
                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Tarefas:</span>
                            <span>5/6 concluídas</span>
                        </div>
                        <div>
                            <span style={{paddingRight: '4px', color: 'darkGray'}}>Data limite:</span>
                            <span>Amanhã</span>
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