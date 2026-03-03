import * as classes from './TasksList.css';
import { useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Button, Card, Cascader, Checkbox, Col, ColorPicker, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Switch, Tooltip, TreeSelect, Typography } from 'antd';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CaretRightOutlined, CheckOutlined, ClockCircleOutlined, EyeOutlined, PauseCircleOutlined, PauseOutlined, PlayCircleOutlined, SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

const SettingsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todoItems = [
    "Schedule perm",
    "Rewind VHS tapes",
    "Make change for the arcade",
    "Get disposable camera developed",
    "Learn C++",
    "Return Nintendo Power Glove",
  ];

  const doingItems: string[] = [''];

  const doneItems = ["Pickup new mix-tape from Beth"];
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, { group: "todoList" });
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems, { group: "todoList" });
  const [doingList, doing] = useDragAndDrop<HTMLUListElement, string>(doingItems, { group: "todoList" });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row className="kanban-board" style={{background: "#f0f0f0", padding: "20px", height: 'fit-content', display: 'flex', justifyContent: 'center', maxWidth: '1200px', minWidth: 'fit-content', borderRadius: '8px', border: '1px solid #d9d9d9', margin: '0 auto'}}>
        <Col span={6}>
          <Typography.Title level={3} style={{ marginLeft: 16 }}>
            Pendente
          </Typography.Title>
          <ul style={{ height: '100%', listStyle: 'none', padding: 10}} ref={todoList}>{todos.map((todo) => (
            <li className="kanban-item" style={{padding: 5}} key={todo}>
              <Card title={todo} variant="borderless" extra={
                <Button className={classes.actionButton} onClick={() => {}} type="primary" icon={<CaretRightOutlined /> } size={'medium'}>
                  <span className={classes.actionText}>Iniciar</span>
                </Button>
              }><div onClick={showModal} className={classes.actionButton}>
                teste
                <Tooltip title="Visualizar detalhes">
                  <Button className={classes.actionText} shape="circle" type='link' icon={<EyeOutlined />} />
                </Tooltip>
              </div></Card>
            </li>
          ))}
          </ul>
        </Col>
        <Col span={6}>
          <Typography.Title level={3} style={{ marginLeft: 16 }}>
            Em progresso
          </Typography.Title>
          <ul style={{ height: '100%', listStyle: 'none', padding: 10}} ref={doingList}>{doing.map((doing) => (
            <li className="kanban-item" style={{padding: 5}} key={doing}>
              <Card  title={
                <Tooltip placement="topLeft" title={doing}>
                    {doing}
                  </Tooltip>
              } variant="borderless" extra={
                <>
                <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                  <HappyProvider>
                    <Button className={classes.actionButton} type="primary"  icon={<CheckOutlined /> } size={'medium'}>
                      <span className={classes.actionText}>Finalizar</span>
                    </Button>
                  </HappyProvider>
                  <Tooltip title="Pausar tarefa">
                    <Button className={classes.actionButton} type="primary" icon={<ClockCircleOutlined />} size={'medium'}>
                      <span className={classes.actionText}>10:23</span>
                    </Button>
                  </Tooltip>
                </div>
                </>
              }>
                <div onClick={showModal}>teste</div>
              </Card>
            </li>
          ))}
          </ul>
        </Col>
        <Col span={6}>
          <Typography.Title level={3} style={{ marginLeft: 16 }}>
            Feito
          </Typography.Title>
          <ul style={{ height: '100%', listStyle: 'none', padding: 10}} ref={doneList}>{dones.map((done) => (
            <li className="kanban-item" key={done} style={{padding: 5}}>
              <Card onClick={showModal} title={done} variant="borderless" />
            </li>
          ))}
          </ul>
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select options={[{ label: 'Demo', value: 'demo' }]} />
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
}

export default SettingsList;