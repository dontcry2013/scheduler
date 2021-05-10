import React from "react";
import { Button } from 'antd';
import { IMouseOver } from '../components/Interface'

const mystyle: any = {
  position: 'relative',
  display: 'inline',
  left: -30,
  zIndex: 10,
};

const HoverOverButton: React.FC<any> = (prop: { mouseOver: IMouseOver, handleAdd: () => void  }) => {
    const style = { ...mystyle, top: prop.mouseOver.top }
    return (
      <div id="iButtons" style={style}>
        <Button style={{ paddingLeft: 8, paddingRight: 8 }} type="primary" onClick={prop.handleAdd}>+</Button>
      </div>
    );
}

export default HoverOverButton