import { Card, Tooltip, Button, Typography } from 'antd';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { CheckOutlined, ClockCircleOutlined, CaretRightOutlined, EyeOutlined } from '@ant-design/icons';
import * as classes from './ColumnsContent.css';

interface TaskCardProps {
    task: string;
    columnIndex: number;
    isMobile: boolean;
    onModalOpen: (value: boolean) => void;
    onFinishTask?: (value: boolean) => void;
    onPauseTask?: (value: boolean) => void;
    onDetailsTask?: (value: boolean) => void;
}

const TaskCard = ({ task, columnIndex, isMobile, onModalOpen, onFinishTask, onPauseTask, onDetailsTask }: TaskCardProps) => {

    const handleShowTitle = (text: string) => {
        switch (columnIndex) {
            case 0:
                return text;
            case 1:
                return (
                    <Tooltip placement="topLeft" title={text}>
                        {text}
                    </Tooltip>
                );
            case 2:
                return text
        }
    }

    const handleCardButtons = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <Button className={classes.actionButton} onClick={() => { }} type="primary" icon={<CaretRightOutlined />} size={'medium'}>
                        <span className={classes.actionText}>Iniciar</span>
                    </Button>
                );
            case 1:
                return (
                    <>
                        {!isMobile ? (
                            <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                                <HappyProvider>
                                <Button className={classes.actionButton} type="primary" icon={<CheckOutlined />} size={'medium'} onClick={() => {onModalOpen(true); onFinishTask?.(true)}}>
                                    <span className={classes.actionText}>Finalizar</span>
                                </Button>
                                </HappyProvider>
                                <Tooltip title="Pausar tarefa">
                                <Button className={classes.actionButton} type="primary" icon={<ClockCircleOutlined />} size={'medium'} onClick={() => {onModalOpen(true); onPauseTask?.(true)}}>
                                    <span className={classes.actionText}>10:23</span>
                                </Button>
                                </Tooltip>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                                <HappyProvider>
                                    <Button type="primary" icon={<CheckOutlined />} size={'medium'} onClick={() => {onModalOpen(true); onFinishTask?.(true)}}/>
                                </HappyProvider>
                                <Button type="primary" icon={<ClockCircleOutlined />} size={'medium'} onClick={() => {onModalOpen(true); onPauseTask?.(true)}}/>
                            </div>
                        )}
                    </>
                )
        }
    }

    return (
        <div className={classes.card}>
            <Card 
            title={handleShowTitle(task)} 
            variant="borderless" 
            extra={handleCardButtons(columnIndex)}>
                <div onClick={() => {onModalOpen(true); onDetailsTask?.(true)}} className={classes.actionButton} style={{width: '100%'}}>
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
                            <Button className={classes.actionText} shape="circle" type='link' icon={<EyeOutlined />} />
                        </Tooltip>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default TaskCard;