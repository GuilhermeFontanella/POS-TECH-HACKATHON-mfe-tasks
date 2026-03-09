import { CheckOutlined } from "@ant-design/icons";
import { Form, type CollapseProps, Tooltip, Checkbox, Input, Row, Col, TimePicker, DatePicker, Button, Collapse, ColorPicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { HappyProvider } from "@ant-design/happy-work-theme";
const { Text } = Typography;
import * as classes from './TaskFinish.css'
import { useEffect } from "react";

interface TaskFinishProps {
    isMobile: boolean;
    data: any;
    onFinishTask: () => void;
}

const TaskFinish = ({isMobile, data, onFinishTask}: TaskFinishProps) => {
    const [form] = Form.useForm();
    const formatTime = 'HH:mm';
    const formatDate = 'DD/MM/YYYY';
    const collapseItems: CollapseProps['items'] =
        data?.tasks?.map((task: any) => ({
            key: String(task.id),
            label: (
            <Tooltip title={task.completed ? 'Tarefa finalizada' : 'Tarefa pendente'}>
                <Checkbox checked={task.completed}>
                    {task.completed ? (
                        <Text delete>{task.title}</Text>
                    ) : <Text>{task.title}</Text> }
                
                </Checkbox>
            </Tooltip>
            ),
            children: (
            <div>
                <div>
                    <Form.Item label="Título" layout="vertical" name={'taskTitle'}>
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label="Resumo" layout="vertical" name={'taskSummary'}>
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label="Descrição" layout="vertical" name={'taskDescription'}>
                        <TextArea disabled={true} rows={10} placeholder="maxLength is 6" maxLength={6} />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item  label="Tempo estimado" layout="vertical" name={'taskEstimatedTime'}>
                                <TimePicker disabled={true} style={{width: '95%'}} defaultValue={dayjs('00:00', formatTime)} format={formatTime} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Data limite" name={'taskDeadline'}>
                                <DatePicker disabled={true} style={{width: '100%'}} format={formatDate} defaultValue={dayjs()} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </div>
            )
    })) ?? [];

    useEffect(() => {
        if (!data) return;

        form.setFieldsValue({
            title: data.title,
            summary: data.summary,
            description: data.description,
            estimatedTime: data.estimatedTime 
                ? dayjs(data.estimatedTime, formatTime)
                : null,
            deadline: data.deadline
                ? dayjs(data.deadline, formatDate)
                : null,
            cardColor: data.cardColor
        });
    }, [data]);

    return (
        <Form
        form={form}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        disabled={false}
        style={isMobile ? { height: '100vh', overflowY: 'auto', maxWidth: 600 } : { maxWidth: 600 }}
        >
            <h1>Deseja finalizar essa tarefa?</h1>
          <Form.Item label="Título" layout="vertical" name={'title'}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Descrição" layout="vertical" name={'description'}>
           <TextArea disabled={true} rows={4} placeholder="maxLength is 6" maxLength={6} />
          </Form.Item>
          <Row>
            <Col span={12}>
                <Form.Item  label="Tempo estimado" layout="vertical" name={'estimatedTime'}>
                    <TimePicker disabled={true} style={{width: '95%'}} defaultValue={dayjs('00:00', formatTime)} format={formatTime} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="Data limite" name={'deadline'}>
                    <DatePicker disabled={true} defaultValue={dayjs()} format={formatDate} style={{width: '100%'}} />
                </Form.Item>
            </Col>
          </Row>
         
            <div style={{marginBottom: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    Tarefas
                </div>
                <div style={{marginTop: '16px'}}>
                    {collapseItems?.length === 0 ? (
                        <span style={{color: 'darkGrey'}}>Sem tarefas cadastradas</span>
                    ) : (
                        <div>
                            {collapseItems?.map(() => (
                                <Collapse items={collapseItems} defaultActiveKey={['1']} onChange={() => {}} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

          <Form.Item  label="Cor do Card" name={'cardColor'}>
            <ColorPicker disabled={true}/>
          </Form.Item>

          <div style={{display: 'flex', justifyContent: 'end', marginBottom: '16px'}}>
            {!isMobile ? (
                <Tooltip title={'Finalizar'}>
                    <HappyProvider>
                        <Button 
                        className={classes.actionButton} 
                        style={{marginRight: '8px'}} 
                        type="primary" icon={<CheckOutlined />} 
                        size={'medium'} 
                        onClick={onFinishTask}>
                            <span className={classes.actionText}>Finalizar</span>
                        </Button>

                    </HappyProvider>
                </Tooltip>
            ) : (
                <HappyProvider>
                    <Button 
                    style={{marginRight: '8px'}} 
                    type="primary" 
                    size={'medium'} 
                    onClick={onFinishTask}>
                        Finalizar
                    </Button>
                </HappyProvider>
            )}
                </div>
        </Form>
    )
}

export default TaskFinish;