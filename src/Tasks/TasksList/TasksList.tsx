import * as classes from './TasksList.css';
import { useEffect, useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Button, Card, Cascader, Checkbox, Col, ColorPicker, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Switch, Tooltip, TreeSelect, Typography } from 'antd';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CaretRightOutlined, CheckOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import { useDevice } from '../../hooks/useDevice';

const SettingsList = () => {
  const { isMobile, isTouchDevice, isWebView } = useDevice()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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
    setIsDetailsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
    setIsFinishModalOpen(false);
    setIsPauseModalOpen(false);
  };

  useEffect(() => {
    if (!isMobile) return

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    console.log(isMobile)
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }


  }, [isModalOpen, isMobile]);

  return (
    <>
      <Row
        wrap={!isMobile}
        className="kanban-board"
        style={{
          background: "#f0f0f0",
          padding: "20px",
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '1200px',
          minWidth: 'fit-content',
          borderRadius: '8px',
          border: '1px solid #d9d9d9',
          margin: '0 auto',
          overflowX: isMobile ? 'auto' : 'visible',
          //gap: 16
        }}>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <Typography.Title level={3} style={{ marginLeft: 16 }}>
            Pendente
          </Typography.Title>
          <ul style={{ height: '100%', listStyle: 'none', padding: 10 }} ref={todoList}>{todos.map((todo) => (
            <li className="kanban-item" style={{ padding: 5 }} key={todo}>
              <Card title={todo} variant="borderless" extra={
                <Button className={classes.actionButton} onClick={() => { }} type="primary" icon={<CaretRightOutlined />} size={'medium'}>
                  <span className={classes.actionText}>Iniciar</span>
                </Button>
              }><div onClick={showModal} className={classes.actionButton}>
                  teste
                  {!isMobile && (
                    <Tooltip title="Visualizar detalhes">
                      <Button className={classes.actionText} shape="circle" type='link' icon={<EyeOutlined />} />
                    </Tooltip>
                  )}
                </div></Card>
            </li>
          ))}
          </ul>
        </Col>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <Typography.Title level={3} style={{ marginLeft: 16 }}>
            Em progresso
          </Typography.Title>
          <ul style={{ height: '100%', listStyle: 'none', padding: 10 }} ref={doingList}>{doing.map((doing) => (
            <li className="kanban-item" style={{ padding: 5 }} key={doing}>
              <Card title={
                <Tooltip placement="topLeft" title={doing}>
                  {doing}
                </Tooltip>
              } variant="borderless" extra={
                <>
                {!isMobile ? (
                  <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                    <HappyProvider>
                      <Button className={classes.actionButton} type="primary" icon={<CheckOutlined />} size={'medium'}>
                        <span className={classes.actionText}>Finalizar</span>
                      </Button>
                    </HappyProvider>
                    <Tooltip title="Pausar tarefa">
                      <Button className={classes.actionButton} type="primary" icon={<ClockCircleOutlined />} size={'medium'}>
                        <span className={classes.actionText}>10:23</span>
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8, margin: 'auto' }}>
                    <HappyProvider>
                      <Button type="primary" icon={<CheckOutlined />} size={'medium'} onClick={() => {setIsModalOpen(true); setIsFinishModalOpen(true)}}/>
                    </HappyProvider>
                    <Button type="primary" icon={<ClockCircleOutlined />} size={'medium'} onClick={() => {setIsModalOpen(true); setIsPauseModalOpen(true)}}/>
                  </div>
                )}
                </>
              }>
                <div onClick={showModal}>teste</div>
              </Card>
            </li>
          ))}
          </ul>
        </Col>
        <Col flex={isMobile ? '280px' : undefined} xs={24} md={6}>
          <Typography.Title level={3} style={{ marginLeft: 16 }}>
            Feito
          </Typography.Title>
          <ul style={{ height: '100%', listStyle: 'none', padding: 10 }} ref={doneList}>{dones.map((done) => (
            <li className="kanban-item" key={done} style={{ padding: 5 }}>
              <Card onClick={showModal} title={done} variant="borderless" />
            </li>
          ))}
          </ul>
        </Col>
      </Row>
      <Modal
        width={isMobile ? '100%' : 600}
        centered={!isMobile}
        footer={null}
        style={isMobile ? { top: 0, padding: 0 } : undefined}
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isDetailsModalOpen && (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            disabled={false}
            style={isMobile ? { height: '100vh', overflowY: 'auto', maxWidth: 600 } : { maxWidth: 600 }}
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
        )}
        {isFinishModalOpen && (
          <>MODAL FINISH</>
        )}
        {isPauseModalOpen && (
          <>MODAL PAUSE</>
        )}
      </Modal>
    </>
  );
}

export default SettingsList;


