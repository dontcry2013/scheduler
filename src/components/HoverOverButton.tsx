import React from "react";
import { IMouseOver } from '../components/Interface'

const mystyle: any = {
  position: 'relative',
  left: 0,
  top: 100,
  width: 25,
};

const HoverOverButton: React.FC<any> = ({ mouseOver }: { mouseOver: IMouseOver }) => {
    const style = { ...mystyle, top: mouseOver.top }
    console.log(mouseOver);
    return (
      <div id="iButtons" style={style}>
        <input type="button" value="+"></input>
      </div>
    );
}

export default HoverOverButton