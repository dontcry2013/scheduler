import React, {useState} from "react";

const mystyle: any = {
  position: 'absolute',
  left: 0,
  width: 25,
};

const HoverOverButton: React.FC = (props) => {
    // const [style, setStyle] = useState({display: 'none'});

    return (
      <div id="iButtons" style={mystyle}>
        <input type="button" value="+"></input>
      </div>
    );
}

export default HoverOverButton