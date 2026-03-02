import { dragAndDrop } from '@formkit/drag-and-drop';
import * as styles from './TasksList.css';
import { useState } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Button, Card, Cascader, Checkbox, Col, ColorPicker, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Switch, TreeSelect } from 'antd';

import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { RangePicker } = DatePicker;

const config = { sortable: false }

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
      <Row className="kanban-board" style={{background: "#f0f0f0", padding: "20px", height: '100vh'}}>
        <Col span={8}>
          <ul style={{background: 'green', height: '100%', listStyle: 'none', padding: 10}} ref={todoList}>{todos.map((todo) => (
                  <li className="kanban-item" style={{padding: 5}} key={todo}>
                    <Card onClick={showModal} title={todo} variant="borderless"/>
                  </li>
                ))}
          </ul>
        </Col>
        <Col span={8}>
          <ul style={{background: 'red', height: '100%', listStyle: 'none', padding: 10}} ref={doingList}>{doing.map((doing) => (
                  <li className="kanban-item" style={{padding: 5}} key={doing}>
                    <Card onClick={showModal} title={doing} variant="borderless"/>
                  </li>
                ))}
          </ul>
        </Col>
        <Col span={8}>
          <ul style={{background: 'blue', height: '100%', listStyle: 'none', padding: 10}} ref={doneList}>{dones.map((done) => (
                  <li className="kanban-item" key={done}>
                    <Card onClick={showModal} title={done} variant="borderless"/>
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