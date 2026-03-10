import { Form, Checkbox, Input, DatePicker, Button, ColorPicker, Tooltip, Row, Col, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;
import { useDebounce } from '../../../hooks/useDebounce';
import { useEffect } from 'react';
import { HappyProvider } from '@ant-design/happy-work-theme';
import * as classes from './TaskDetails.css'
import type { Task, TaskCommons } from '../../../types/task.interface';
import { useTask } from '../../../hooks/useTask';
import { useUpdateTask } from '../../../hooks/useUpdateTask';
import type { SettingsState } from '../../../store/settingsSlice';

interface TaskDetailsProps {
    isMobile: boolean;
    taskId: any;
    onSave?: (value?: any) => void;
    preferences: SettingsState;
}

const TaskDetails = ({ isMobile, taskId, onSave, preferences }: TaskDetailsProps) => {
    const [form] = Form.useForm();
    const { update } = useUpdateTask();
    const [api, contextHolder] = message.useMessage();
    const { task, taskById } = useTask();
    const values = Form.useWatch([], form);
    const debouncedForm = useDebounce(values, 1000);
    const formatTime = 'HH:mm';
    const formatDate = 'DD/MM/YYYY';
    const collapseItems: CollapseProps['items'] =
        task?.subTasks?.map((subtask: TaskCommons) => ({
            key: String(task.id),
            label: (
                <Tooltip title={task.completed ? 'Tarefa finalizada' : 'Tarefa pendente'}>
                    <Checkbox disabled={subtask.completed} checked={task.completed}>
                        {task.completed ? (
                            <Text delete>{task.title}</Text>
                        ) : <Text>{task.title}</Text>}

                    </Checkbox>
                </Tooltip>
            ),
            children: (
                <div>
                    <div>
                        <Form.Item 
                        rules={[{required: true, message: 'Campo obrigatório'}]} 
                        label="Título" 
                        layout="vertical" 
                        name={'title'}>
                            <Input allowClear={true} disabled={!!subtask.finishedAt} />
                        </Form.Item>
                        <Form.Item 
                        rules={[{required: true, message: 'Campo obrigatório'}]} 
                        label="Resumo" 
                        layout="vertical" 
                        name={'summary'}>
                            <Input disabled={!!subtask.finishedAt} />
                        </Form.Item>
                        <Form.Item label="Descrição" layout="vertical" name={'description'}>
                            <TextArea disabled={!!subtask.finishedAt} rows={10} placeholder="maxLength is 6" maxLength={6} />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item 
                                rules={[{required: true, message: 'Campo obrigatório'}]} 
                                label="Tempo estimado"
                                layout="vertical" 
                                name={'estimatedTime'}>
                                    <TimePicker 
                                    allowClear={true} 
                                    disabled={!!subtask.finishedAt} 
                                    style={{ width: '95%' }} 
                                    format={formatTime} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                rules={[{required: true, message: 'Campo obrigatório'}]} 
                                label="Data limite" 
                                name={'deadline'}>
                                    <DatePicker 
                                    disabledDate={(current) => current && current < dayjs().startOf('day')} 
                                    disabled={!!subtask.finishedAt} 
                                    style={{ width: '100%' }} 
                                    format={formatDate} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Tooltip title={'Salvar alterações'}>
                            <Button 
                            disabled={!!subtask.finishedAt} 
                            style={{ marginRight: '8px' }} 
                            type="primary" icon={<CheckOutlined />} 
                            size={'medium'} />
                        </Tooltip>
                        <Tooltip title="Excluir tarefa">
                            <Button 
                            disabled={!!subtask.finishedAt} 
                            type="primary" 
                            danger 
                            icon={<DeleteOutlined />} 
                            size={'medium'} />
                        </Tooltip>
                    </div>
                </div>
            )
        })) ?? [];

    useEffect(() => {
        if (!taskId)  {
            form.resetFields(); 
            return;
        }
        taskById(taskId);
    }, [taskId]);

    const handleTaskChange = async (taskId: string, data: Task) => {
        const payload: any = {
          ...data,
          estimatedTime: data.estimatedTime
            ? dayjs(data.estimatedTime).format('HH:mm')
            : null,
          deadline: data.deadline
            ? dayjs(data.deadline).format('DD/MM/YYYY')
            : null,
        }
        try {
          await update(taskId, payload);
          openNotification('success', 'Alterações salvas');
        } catch (error) {
          openNotification('error', 'Ocorreu um erro ao salvar as informações.');
          console.error(error);
          throw error;
        }
    };

    const openNotification = (type: 'error' | 'success', message: string) => {
        api.open({
            type: type,
            content: message
        })
    }

    useEffect(() => {
        if (!debouncedForm) return;
        if (debouncedForm && taskId && !(!!task?.finishedAt)) {
            handleTaskChange(task?.id, { 
                ...debouncedForm, 
                deadline: debouncedForm?.deadline?.format(formatDate),
                cardColor: debouncedForm?.cardColor?.toHexString?.() ?? task?.cardColor ?? null
            });
        }
    }, [debouncedForm]);

    const handleSave = () => {
        const values = form.getFieldsValue();
        const payload: Task = {
            ...values,
            cardColor: values.cardColor?.toHexString?.(),
            estimatedTime: values.estimatedTime.format(formatTime),
            deadline: values.deadline.format(formatDate),
            status: 'new'
        }

        onSave?.(payload);
    };
 
    useEffect(() => {
        if (!task) return;

        form.setFieldsValue({
            title: task.title,
            summary: task.summary,
            description: task.description,
            estimatedTime: task.estimatedTime 
                ? dayjs(task.estimatedTime, formatTime)
                : null,
            deadline: task.deadline
                ? dayjs(task.deadline, formatDate)
                : null,
            cardColor: task.cardColor ?? null
        });
    }, [task]);

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                style={isMobile ? { height: '100vh', overflowY: 'auto', maxWidth: 600, fontSize: preferences.fontSize } : { maxWidth: 600, fontSize: preferences.fontSize }}
            >
                {!task && (<h1>Nova tarefa</h1>)}
                <Form.Item 
                label="Título" 
                layout="vertical" 
                name={'title'}
                rules={[{required: true, message: 'Campo obrigatório'}]}>
                    <Input style={{fontSize: preferences.fontSize}} required allowClear={true} disabled={!!task?.finishedAt} />
                </Form.Item>
                <Form.Item 
                rules={[{required: true, message: 'Campo obrigatório'}]} 
                label="Resumo" 
                layout="vertical" 
                name={'summary'}>
                    <Input style={{fontSize: preferences.fontSize}} allowClear={true} disabled={!!task?.finishedAt} />
                </Form.Item>
                <Form.Item label="Descrição" layout="vertical" name={'description'}>
                    <TextArea style={{fontSize: preferences.fontSize}} allowClear={true} disabled={!!task?.finishedAt} rows={4} maxLength={3000} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item 
                        rules={[{required: true, message: 'Campo obrigatório'}]} 
                        label="Tempo estimado" 
                        layout="vertical" 
                        name={'estimatedTime'}>
                            <TimePicker  
                            allowClear={true} 
                            disabled={!!task?.finishedAt} 
                            style={{ width: '95%', fontSize: preferences.fontSize }} 
                            format={formatTime} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                        rules={[{required: true, message: 'Campo obrigatório'}]} 
                        label="Data limite"
                        name={'deadline'}>
                            <DatePicker 
                            disabledDate={(current) => current && current < dayjs().startOf('day')} 
                            disabled={!!task?.finishedAt} 
                            style={{ width: '100%', fontSize: preferences.fontSize }} 
                            format={formatDate} />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: preferences.fontSize }}>
                        Subtarefas
                        {task?.status !== 'done' && (
                            <Button style={{fontSize: preferences.fontSize}} onClick={() => { }} type="primary" icon={<PlusOutlined />} size={'medium'}>
                                {preferences?.complexityLevel != 1 && (<span>Adicionar nova subtarefa</span>)}
                            </Button>
                        )}
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        {collapseItems?.length === 0 ? (
                            <span style={{ color: 'darkGrey' }}>Sem tarefas cadastradas</span>
                        ) : (
                            <div>
                                {collapseItems?.map(() => (
                                    <Collapse items={collapseItems} defaultActiveKey={['1']} onChange={() => { }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Form.Item label={<span style={{fontSize: preferences.fontSize}}>Cor do Card</span>} name={'cardColor'}>
                    <ColorPicker format='hex' allowClear={true} disabled={!!task?.finishedAt} />
                </Form.Item>

                {!taskId && (
                    <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '16px' }}>
                        {!isMobile ? (
                            <Tooltip title={'Finalizar'}>
                                <HappyProvider>
                                    <Button
                                        className={classes.actionButton}
                                        style={{ marginRight: '8px' }}
                                        type="primary" icon={<CheckOutlined />}
                                        size={'medium'}
                                        onClick={() => onSave?.(debouncedForm)}>
                                        {preferences?.complexityLevel != 1 && (<span className={classes.actionText}>Salvar</span>)}
                                    </Button>

                                </HappyProvider>
                            </Tooltip>
                        ) : (
                            <HappyProvider>
                                <Button
                                    style={{ marginRight: '8px' }}
                                    type="primary"
                                    size={'medium'}
                                    onClick={() => handleSave()}
                                    icon={<CheckOutlined />}>
                                    {preferences?.complexityLevel != 1 && (<span className={classes.actionText}>Salvar</span>)}
                                </Button>
                            </HappyProvider>
                        )}
                    </div>
                )}
            </Form>
        </>
    );
}

export default TaskDetails;

