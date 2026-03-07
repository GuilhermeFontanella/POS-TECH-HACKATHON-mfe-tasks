import { Form, Checkbox, Input, DatePicker, Button, ColorPicker, Tooltip, Row, Col } from 'antd';
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

interface TaskDetailsProps {
    isMobile: boolean;
    data: any;
    onFormChange?: (value: any) => void;
    onSave?: () => void;
    isFinished?: boolean;
}

const TaskDetails = ({ isMobile, data, onFormChange, isFinished = false, onSave }: TaskDetailsProps) => {
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const debouncedForm = useDebounce(values, 1000);
    const formatTime = 'HH:mm';
    const formatDate = 'DD/MM/YYYY';
    const collapseItems: CollapseProps['items'] =
        data?.tasks?.map((task: any) => ({
            key: String(task.id),
            label: (
                <Tooltip title={task.completed ? 'Tarefa finalizada' : 'Tarefa pendente'}>
                    <Checkbox disabled={isFinished} checked={task.completed}>
                        {task.completed ? (
                            <Text delete>{task.title}</Text>
                        ) : <Text>{task.title}</Text>}

                    </Checkbox>
                </Tooltip>
            ),
            children: (
                <div>
                    <div>
                        <Form.Item label="Título" layout="vertical" name={'taskTitle'}>
                            <Input allowClear={true} disabled={isFinished} />
                        </Form.Item>
                        <Form.Item label="Resumo" layout="vertical" name={'taskSummary'}>
                            <Input disabled={isFinished} />
                        </Form.Item>
                        <Form.Item label="Descrição" layout="vertical" name={'taskDescription'}>
                            <TextArea disabled={isFinished} rows={10} placeholder="maxLength is 6" maxLength={6} />
                        </Form.Item>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Tempo estimado" layout="vertical" name={'taskEstimatedTime'}>
                                    <TimePicker allowClear={true} disabled={isFinished} style={{ width: '95%' }} defaultValue={dayjs('00:00', formatTime)} format={formatTime} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Data limite" name={'taskDeadline'}>
                                    <DatePicker disabled={isFinished} style={{ width: '100%' }} format={formatDate} defaultValue={dayjs()} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Tooltip title={'Salvar alterações'}>
                            <Button disabled={isFinished} style={{ marginRight: '8px' }} type="primary" icon={<CheckOutlined />} size={'medium'} />
                        </Tooltip>
                        <Tooltip title="Excluir tarefa">
                            <Button disabled={isFinished} type="primary" danger icon={<DeleteOutlined />} size={'medium'} />
                        </Tooltip>
                    </div>
                </div>
            )
        })) ?? [];

    useEffect(() => {
        if (!debouncedForm) return;
        onFormChange?.(debouncedForm);
    }, [debouncedForm]);

    return (
        <Form
            form={form}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            disabled={false}
            style={isMobile ? { height: '100vh', overflowY: 'auto', maxWidth: 600 } : { maxWidth: 600 }}
        >
            {!data && (<h1>Nova tarefa</h1>)}
            <Form.Item label="Título" layout="vertical" name={'title'}>
                <Input allowClear={true} disabled={isFinished} />
            </Form.Item>
            <Form.Item label="Resumo" layout="vertical" name={'taskSummary'}>
                <Input allowClear={true} disabled={isFinished} />
            </Form.Item>
            <Form.Item label="Descrição" layout="vertical" name={'description'}>
                <TextArea allowClear={true} disabled={isFinished} rows={4} maxLength={3000} />
            </Form.Item>
            <Row>
                <Col span={12}>
                    <Form.Item label="Tempo estimado" layout="vertical" name={'estimatedTime'}>
                        <TimePicker allowClear={true} disabled={isFinished} style={{ width: '95%' }} defaultValue={dayjs('00:00', formatTime)} format={formatTime} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Data limite" name={'deadline'}>
                        <DatePicker allowClear={true} disabled={isFinished} defaultValue={dayjs()} format={formatDate} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Subtarefas
                    {!isFinished && (
                        <Button onClick={() => { }} type="primary" icon={<PlusOutlined />} size={'medium'}>
                            <span>Adicionar nova subtarefa</span>
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

            <Form.Item label="Cor do Card" name={'cardColor'}>
                <ColorPicker allowClear={true} disabled={isFinished} />
            </Form.Item>

            {!data && (
                <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '16px' }}>
                    {!isMobile ? (
                        <Tooltip title={'Finalizar'}>
                            <HappyProvider>
                                <Button
                                    className={classes.actionButton}
                                    style={{ marginRight: '8px' }}
                                    type="primary" icon={<CheckOutlined />}
                                    size={'medium'}
                                    onClick={onSave}>
                                    <span className={classes.actionText}>Salvar</span>
                                </Button>

                            </HappyProvider>
                        </Tooltip>
                    ) : (
                        <HappyProvider>
                            <Button
                                style={{ marginRight: '8px' }}
                                type="primary"
                                size={'medium'}
                                onClick={onSave}>
                                Salvar
                            </Button>
                        </HappyProvider>
                    )}
                </div>
            )}
        </Form>
    );
}

export default TaskDetails;

