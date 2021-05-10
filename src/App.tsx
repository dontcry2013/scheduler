import React from 'react';
import "antd/dist/antd.css";
import EditableTable from './components/EditableTable';
import HoverOverButton from './components/HoverOverButton';
import { EventContext } from './reducers/EventContext';
import { useEventReducer } from './reducers/EventReducer';
import { IMouseOver } from './components/Interface';

function App() {
  const [state, dispatch] = useEventReducer();
  const mouseOver: IMouseOver = {
    top: state.mouseOver.top, key: state.mouseOver.key
  }

  return (
    <EventContext.Provider value={dispatch}>
      <div style={{ 
        height: '100%',
        padding: '0 10px', 
      }}>
        <HoverOverButton mouseOver={mouseOver}></HoverOverButton>
        <EditableTable></EditableTable>
      </div>
    </EventContext.Provider>
  );
}

export default App;
