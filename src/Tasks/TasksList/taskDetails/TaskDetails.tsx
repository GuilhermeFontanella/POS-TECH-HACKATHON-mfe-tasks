import { Form, Checkbox, Radio, Input, Select, DatePicker, InputNumber, Switch, Button, ColorPicker, Tooltip, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { RangePicker } = DatePicker;
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import * as classes from './TaskDetails.css';
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { useEffect, useState } from 'react';
import type { CollapseProps } from 'antd';
import { Space, Typography } from 'antd';
const { Text, Link } = Typography;

interface TaskDetailsProps {
    isMobile: boolean;
    data: any;
}

const TaskDetails = ({isMobile, data}: TaskDetailsProps) => {
    const format = 'HH:mm';
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
                    <Form.Item label="Título" layout="vertical">
                        <Input value={task.title} />
                    </Form.Item>
                    <Form.Item label="Resumo" layout="vertical">
                        <Input value={task.summary} />
                    </Form.Item>
                    <Form.Item label="Descrição" layout="vertical">
                        <TextArea value={task.description}  rows={10} placeholder="maxLength is 6" maxLength={6} />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item  label="Tempo estimado" name="disabled" layout="vertical">
                                <TimePicker style={{width: '95%'}} defaultValue={dayjs('12:08', format)} format={format} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Data limite">
                                <DatePicker style={{width: '100%'}} />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <Tooltip title={'Salvar alterações'}>
                        <Button style={{marginRight: '8px'}} type="primary" icon={<CheckOutlined />} size={'medium'} />
                    </Tooltip>
                    <Tooltip title="Excluir tarefa">
                        <Button type="primary" danger icon={<DeleteOutlined />} size={'medium'} />
                    </Tooltip>
                </div>
            </div>
            )
    })) ?? [];

    return (
        <Form
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          disabled={false}
          style={isMobile ? { height: '100vh', overflowY: 'auto', maxWidth: 600 } : { maxWidth: 600 }}
        >
          <Form.Item label="Título" layout="vertical">
            <Input />
          </Form.Item>
          <Form.Item label="Descrição" layout="vertical">
           <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          </Form.Item>
          <Row>
            <Col span={12}>
                <Form.Item  label="Tempo estimado" name="disabled" layout="vertical">
                    <TimePicker style={{width: '95%'}} defaultValue={dayjs('12:08', format)} format={format} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="Data limite">
                    <DatePicker style={{width: '100%'}} />
                </Form.Item>
            </Col>
          </Row>
         
            <div style={{marginBottom: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    Tarefas
                    <Button onClick={() => { }} type="primary" icon={<PlusOutlined />} size={'medium'}>
                        <span>Adicionar nova tarefa</span>
                    </Button>
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

          <Form.Item label="ColorPicker">
            <ColorPicker />
          </Form.Item>
        </Form>
    );
}

export default TaskDetails;

