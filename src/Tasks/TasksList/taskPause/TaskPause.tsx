import { Button, Col, Descriptions, Row, Tooltip } from "antd";
import Timer from "../../../components/timer/Timer";
import { CheckOutlined, PauseOutlined, RedoOutlined } from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";

interface TaskPauseProps {
    isMobile: boolean;
    onRestart: () => void;
    onFinish: () => void;
    onPause: () => void;
}

const TaskPause = ({isMobile, onRestart, onFinish, onPause}: TaskPauseProps) => {
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
                        <Timer timeRemaining={100000} />
                    </div>
                </Col>
                <Col span={12}>
                <div >
                    <Descriptions column={1} title="Informações da tarefa">
                        <Descriptions.Item label="Tempo estimado">1 hora</Descriptions.Item>
                        <Descriptions.Item label="Criação">01/03/2026</Descriptions.Item>
                        <Descriptions.Item label="Iniciada em">06/03/2026 às 10:30</Descriptions.Item>
                        <Descriptions.Item label="Data limite">06/03/2026</Descriptions.Item>
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