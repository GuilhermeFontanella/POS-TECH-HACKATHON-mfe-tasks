import { Form, Checkbox, Radio, Input, Select, DatePicker, InputNumber, Switch, Button, ColorPicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { RangePicker } = DatePicker;

interface TaskDetailsProps {
    isMobile: boolean;
}

const TaskDetails = ({isMobile}: TaskDetailsProps) => {
    return (
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
    );
}

export default TaskDetails;

