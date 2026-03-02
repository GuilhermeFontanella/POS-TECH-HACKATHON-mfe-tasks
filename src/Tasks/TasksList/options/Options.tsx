import { InputNumber, Radio, Select, Space, Switch, type RadioChangeEvent, type SelectProps } from "antd";
import { useState } from "react";
//import { Grid } from 'antd';

const options: SelectProps['options'] = [];

interface OptionsProps {
    optionType: 'switch' | 'select' | 'radio' | 'inputNumber';
    data: {
        title: string;
        subtitle: string;
        options?: Array<{ value: number; label: string; }>;        
        multiple?: boolean;
    },
    onChangeValue?: (value: number | { value: number; checked: boolean }) => void;
}

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Options = ({ optionType, data, onChangeValue }: OptionsProps) => {
    const [value, setValue] = useState(1);

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const onChangeRadio = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    const handleOnChange = (value: number, checked: boolean ) => {
        const data = {
            value: value,
            checked: checked
        }
        onChangeValue?.(data);
    }

    const handleInputNumberChange = (value: number | null) => {
        if (value !== null) onChangeValue?.(value);
    }

    const handleOptionType = () => {
        switch (optionType) {
            case 'switch': return (
                <div >
                    <p>{data.subtitle}</p>
                    {data.options?.map((option) => (
                    <div style={{margin: '4px'}}>
                        <span style={{paddingRight: '16px'}}>{option.label}</span>
                        <Switch defaultChecked onChange={(checked) => handleOnChange(option.value, checked)} />
                    </div>
                    ))}   
                </div>
        );
            case 'select': return (
                <>
                    <p>{data.subtitle}</p>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        onChange={handleChange}
                        options={data.options}
                    />
                </>
            );
            case 'radio': return (
                <>
                <p>{data.subtitle}</p>
                <Radio.Group value={value} onChange={onChangeRadio}>
                    {data.options?.map((option) => (
                        <Radio value={option.value}>{option.label}</Radio>
                    ))}
                </Radio.Group>
                </>
            );
            case 'inputNumber': return (
                <>
                <p>{data.subtitle}</p>
                <Space wrap>
                    <InputNumber size="large" min={1} max={5} defaultValue={1} onChange={handleInputNumberChange} />
                </Space>
                </>
            )
        }
    };

    return (
        <div>
            {handleOptionType()}
        </div>
    );
}

export default Options;