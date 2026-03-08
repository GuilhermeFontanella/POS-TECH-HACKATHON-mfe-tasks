import { Button, Col, Descriptions, Row } from "antd";
import Timer from "../../../components/timer/Timer";
import { CheckOutlined, PauseOutlined, RedoOutlined } from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useEffect, useMemo, useState } from "react";
import { useTask } from "../../../hooks/useTask";
import dayjs from 'dayjs';

interface TaskPauseProps {
    onRestart: () => void;
    onFinish: () => void;
    onPause: () => void;
    data: any;
}

const TaskPause = ({onRestart, onFinish, onPause, data}: TaskPauseProps) => {
    const { task, loading, taskById } = useTask();

    const ms = useMemo(() => {
        if (!task?.estimatedTime) return 0;

        const [hours, minutes] = task.estimatedTime.split(":").map(Number);
        const estimatedMs = hours * 3600000 + minutes * 60000;

        if (!task.startedAt) return estimatedMs;

        const startedAtMs = task.startedAt.toDate().getTime();
        const now = Date.now();

        const elapsed = now - startedAtMs;

        return Math.max(estimatedMs - elapsed, 0);
    }, [task?.estimatedTime, task?.startedAt]);

    const estimatedMs = useMemo(() => {
        if (!task?.estimatedTime) return 0;

        const [hours, minutes] = task.estimatedTime.split(":").map(Number);
        return hours * 3600000 + minutes * 60000;
    }, [task?.estimatedTime]);

    const remainingMs = useMemo(() => {
        if (!task?.startedAt) return estimatedMs;

        const startedAt = task.startedAt.toDate().getTime();
        const elapsed = Date.now() - startedAt;

        return Math.max(estimatedMs - elapsed, 0);
    }, [task?.startedAt, estimatedMs]);

    useEffect(() => {
        if (!data) return;
        taskById(data);
    }, [data]);

    return (
        <div style={{paddingBottom: '24px'}}>
            <Row>
                <Col span={24}>
                    <h1 style={{marginTop: 0}}>Titulo da tarefa</h1>
                </Col>
            </Row>
            <Row style={{marginBottom: '24px'}}>
                <Col span={12}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <span style={{paddingBottom: '16px', fontWeight: '600', fontSize: '16px'}}>Tempo restante</span>
                        <Timer timeRemaining={remainingMs} totalTime={estimatedMs} />
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
                        <Button type={'default'} style={{marginRight: '8px'}} icon={<RedoOutlined />} size={'medium'} children={'Reiniciar'} onClick={onRestart} />
                        <HappyProvider>
                            <Button style={{marginRight: '8px'}} type="primary" icon={<CheckOutlined />} size={'medium'} children={'Finalizar'} onClick={onFinish} />
                        </HappyProvider>
                        <Button type="primary" danger icon={<PauseOutlined />} size={'medium'} children={'Pausar'} onClick={onPause} />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TaskPause;