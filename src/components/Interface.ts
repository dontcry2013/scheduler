export interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export interface DataType {
  key: React.Key;
  weekday: string;
  session: string;
  time: string;
  cohort: string;
  teacher: string;
  classroom: string;
  class: string;
  weeks: string[];
}

export interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

export interface IMouseOver {
  top: number,
  key: string,
}

export interface IEventState {
  mouseOver: IMouseOver,
}