import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import { EditableCellProps } from './Interface';
import { EventContext } from '../reducers/EventContext';

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const { dispatch } = useContext(EventContext);
  
  let value: string;
  if (record && dataIndex) {
    value = record[dataIndex];
  }
  
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
    console.log(record);
  }, [editing]);

  const tick = () => {
    console.log(record, dataIndex, value);
    if (value && value === 'x') {
      handleSave({ ...record, ...{[dataIndex]: ''} });
    } else {
      handleSave({ ...record, ...{[dataIndex]: 'x'} });
    }
  }

  const mouseOver = (event: React.MouseEvent) => {
    console.log(333, record);
    if (event.target instanceof HTMLElement) {
      dispatch({ type: 'SET_TOP', payload: { top: event.pageY, key: record.key } });
    }
  }

  let childNode = children;

  if (editable) {
    childNode = dataIndex === "name" ? (
      <div className="editable-cell-value-wrap" onClick={tick} onMouseOver={mouseOver} style={{minHeight: 20}}>
        {children}
      </div>
    ) : (
      <div className="editable-cell-value-wrap" onClick={tick} style={{minHeight: 20}}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;