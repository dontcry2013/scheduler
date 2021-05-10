import React from 'react';
import "antd/dist/antd.css";
import EditableTable from './components/EditableTable';
import { EventContext } from './reducers/EventContext';
import { useEventReducer } from './reducers/EventReducer';

function App() {
  const [eventState, dispatch] = useEventReducer();

  return (
    <EventContext.Provider value={{ eventState, dispatch }}>
        <EditableTable></EditableTable>
    </EventContext.Provider>
  );
}

export default App;
