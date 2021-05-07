import React from 'react';
import "antd/dist/antd.css";
import EditableTable from './components/EditableTable';
import HoverOverButton from './components/HoverOverButton';

function App() {
  return (
    <div style={{ 
      position: 'relative',
      height: '100%',
      padding: '0 25px', 
    }}>
      <HoverOverButton></HoverOverButton>
      <EditableTable></EditableTable>
    </div>

  );
}

export default App;
