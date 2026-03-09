import { Button, Col, Descriptions, Row } from "antd";
import Timer from "../../../components/timer/Timer";
import { CaretRightOutlined, CheckOutlined, PauseOutlined, RedoOutlined } from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useEffect, useMemo } from "react";
import { useTask } from "../../../hooks/useTask";
import dayjs from 'dayjs';
import { useUpdateTask } from "../../../hooks/useUpdateTask";
import { serverTimestamp } from "firebase/firestore";

interface TaskPauseProps {
    onRestart: () => void;
    onFinish: () => void;
    onPause: (taskId: any) => void;
    data: any;
}

const TaskPause = ({onRestart, onFinish, onPause, data}: TaskPauseProps) => {
    const { task, taskById } = useTask();
    const { update } = useUpdateTask();

    const estimatedMs = useMemo(() => {
        if (!task?.estimatedTime) return 0;

        const [hours, minutes] = task.estimatedTime.split(":").map(Number);
        return hours * 3600000 + minutes * 60000;
    }, [task?.estimatedTime]);

    const remainingMs = useMemo(() => {
        if (!task?.startedAt) return estimatedMs;

        const startedAt = task.startedAt.toDate().getTime();

        const endReference = task.pausedAt
            ? task.pausedAt.toDate().getTime()
            : Date.now();

        const elapsed = endReference - startedAt;

        return Math.max(estimatedMs - elapsed, 0);
    }, [task?.startedAt, task?.pausedAt, estimatedMs]);

    useEffect(() => {
        if (!data) return;
        taskById(data);
    }, [data]);

    const handleTaskPause = async (taskId: string) => {
        const payload: any = {};
        !task?.pausedAt
            ? payload.pausedAt = serverTimestamp()
            : payload.pausedAt = null;

        await update(taskId, payload);
        await taskById(taskId);
    };

    const handleRestartTask = async (taskId: string) => {
        const payload: any = {
        startedAt: serverTimestamp()
        }
        await update(taskId, payload);
        await taskById(taskId);
    }

    return (
        <div style={{paddingBottom: '24px'}}>
            <Row>
                <Col span={24}>
                    <h1 style={{marginTop: 0}}>{task?.title}</h1>
                </Col>
            </Row>
            <Row style={{marginBottom: '24px'}}>
                <Col span={12}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{paddingBottom: '16px', fontWeight: '600', fontSize: '16px'}}>Tempo restante</span>
                        <Timer 
                        paused={!!task?.pausedAt} 
                        timeRemaining={remainingMs} 
                        totalTime={estimatedMs} />
                    </div>
                </Col>
                <Col span={12}>
                <div >
                    <Descriptions column={1} title="Informações da tarefa">
                        <Descriptions.Item label="Tempo estimado">{task?.estimatedTime ?? '-'}</Descriptions.Item>
                        <Descriptions.Item label="Criação">
                            {
                                task?.createdAt
                                    ? dayjs(task.createdAt.toDate()).format('DD/MM/YYYY')
                                    : '-'
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Iniciada em">
                            {
                                task?.startedAt
                                    ? dayjs(task.startedAt.toDate()).format('DD/MM/YYYY [às] HH:mm')
                                    : '-'
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Data limite">
                            {task?.deadline}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button 
                        type={'default'} 
                        style={{marginRight: '8px'}} 
                        icon={<RedoOutlined />} 
                        size={'medium'} 
                        children={'Reiniciar'} 
                        onClick={() => {
                            onRestart();
                            handleRestartTask(task?.id);
                        }} />
                        <HappyProvider>
                            <Button 
                            style={{marginRight: '8px'}} 
                            type="primary" 
                            icon={<CheckOutlined />} 
                            size={'medium'} 
                            children={'Finalizar'} 
                            onClick={onFinish} />
                        </HappyProvider>
                        <Button 
                        type="primary" 
                        danger={!task?.pausedAt ? true : false } 
                        icon={task?.pausedAt ? <CaretRightOutlined /> : <PauseOutlined /> } 
                        size={'medium'} 
                        children={task?.pausedAt ? 'Continuar' : 'Pausar'} 
                        onClick={() => {
                            onPause(task?.id);
                            handleTaskPause(task?.id)
                        }} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TaskPause;