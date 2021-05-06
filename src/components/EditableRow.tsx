import React from 'react';
import { Form } from 'antd';
import { EditableRowProps } from './Interface';
import EditableContext from './EditableContext';

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;