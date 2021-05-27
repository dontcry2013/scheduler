import React, { useState, useContext } from 'react';
import { Table, Popconfirm } from 'antd';
import { ColumnsType, ColumnProps, ColumnGroupType, } from "antd/lib/table";
import { DataType, EditableTableState, IMouseOver, } from './Interface';
import EditableRow from './EditableRow';
import EditableCell from './EditableCell';
import HoverOverButton from './HoverOverButton';
import { EventContext } from '../reducers/EventContext';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type iColumns = (ColumnTypes[number] & { children: any[]; })[];

const data = {
  dataSource: [
    {
      key: '0',
      weekday: 'Mon',
      session: '1,2',
      time: '08:00:00-09:50:00',
      cohort: 'OUC2019MarineScience1',
      teacher: 'Deng Peipei',
      classroom: '5306',
      class: 'EAP4DEPS4',
      weeks: ['T', 'T', 'T'],
    },
    {
      key: '1',
      weekday: 'Mon',
      session: '1,2',
      time: '08:00:00-09:50:00',
      cohort: 'OUC2019MarineScience3',
      teacher: 'Jhavid Harbut',
      classroom: '6409公共教学区',
      class: 'EAP4DEPS4',
      weeks: ['T', 'T', 'T'],
    },
  ],
  count: 2,
};

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

  let staticColumns: iColumns = [
    {
      title: 'TESTTESTTEST',
      children: [
        {
          title: 'Weekday',
          key: 'weekday',
          dataIndex: 'weekday',
          width: 70,
          editable: true,
          fixed: 'left',
        },
        {
          title: 'Session',
          key: 'session',
          dataIndex: 'session',
          width: 70,
          editable: true,
        },
        {
          title: 'Time',
          key: 'time',
          dataIndex: 'time',
          width: 150,
          editable: true,
        },
        {
          title: 'Cohort',
          dataIndex: 'cohort',
          key: '1',
          width: 150,
          editable: true,
        },
        {
          title: 'Teacher',
          dataIndex: 'teacher',
          key: '2',
          width: 150,
          editable: true,
        },
        {
          title: 'Classroom',
          dataIndex: 'classroom',
          key: '3',
          width: 150,
          editable: true,
        },
        {
          title: 'Class',
          dataIndex: 'class',
          key: '4',
          width: 150,
          editable: true,
        },
        {
          title: '3/1',
          dataIndex: 'weeks[0]',
          key: '5',
          width: 150,
          editable: true,
        },
        {
          title: '3/8',
          dataIndex: 'weeks[1]',
          key: '6',
          width: 150,
          editable: true,
        },
        {
          title: '3/15',
          dataIndex: 'weeks[2]',
          key: '7',
          width: 150,
          editable: true,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          fixed: 'right',
          width: 100,
          render: (_: any, record: any) =>
            state.dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null
        },
      ]
    },
  ];

  staticColumns[0].children = staticColumns[0].children.map(col => {
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
      key: '0',
      weekday: 'Mon',
      session: '1,2',
      time: '08:00:00-09:50:00',
      cohort: 'OUC2019MarineScience1',
      teacher: 'Deng Peipei',
      classroom: '5306',
      class: 'EAP4DEPS4',
      weeks: ['T', 'T', 'T'],
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
        columns={staticColumns as ColumnTypes}
        // columns={test as ColumnTypes}
        scroll={{ x: '100%', y: window.innerHeight - 80}}
        pagination={ false }
        size="small"
      />
    </div>
  );
}

export default EditableTable;