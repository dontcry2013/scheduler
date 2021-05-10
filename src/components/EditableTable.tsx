import React, { useState, useContext } from 'react';
import { Table, Popconfirm } from 'antd';
import { DataType, EditableTableState, IMouseOver, } from './Interface';
import EditableRow from './EditableRow';
import EditableCell from './EditableCell';
import HoverOverButton from './HoverOverButton';
import { EventContext } from '../reducers/EventContext';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const data = {
  dataSource: [
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ],
  count: 2,
};

type iColumns = (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

const EditableTable: React.FC<EditableTableProps> = () => {
  const [state, setState] = useState<EditableTableState>(data);
  const { eventState } = useContext(EventContext);
  const mouseOver: IMouseOver = {
    top: eventState.mouseOver.top, key: eventState.mouseOver.key
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const staticColumns: iColumns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      width: 150,
      editable: true,
      fixed: 'left',
    },
    {
      title: 'age',
      key: 'age',
      dataIndex: 'age',
      width: 60,
    },
    {
      title: 'address',
      key: 'address',
      dataIndex: 'address',
      width: 150,
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) =>
        state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null
    },
  ];

  const columns = staticColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  
  const handleDelete = (record: any) => {
    const dataSource = [...state.dataSource];
    setState({ ...state, dataSource: dataSource.filter(item => item.key !== record.key) });
  };

  const handleAdd = () => {
    const { count, dataSource } = state;
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  const handleSave = (row: DataType) => {
    const newData = [...state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setState({ ...state, dataSource: newData });
  };

  return (
    <div style={{ margin: '0 30px' }}>
      <HoverOverButton mouseOver={mouseOver} handleAdd={handleAdd}></HoverOverButton>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={state.dataSource}
        columns={columns as ColumnTypes}
        scroll={{ x: '100%', y: window.innerHeight - 80}}
        pagination={ false }
        size="small"
      />
    </div>
  );
}

export default EditableTable;