import { ExperienceData } from './data/ExperienceData'
import { CenteredImage } from './CenteredImage'
import React from 'react'

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}



function Experience(props) {
  const [cls, setCls] = React.useState("Experience");
  const [mouse, setMouse] = React.useState(false);
  const [hvred, setHvred]  = React.useState(-1);

  function MouseDown() {
    // setMouse("Down");
    // const d = new Date();
    // setHvred(d.getMilliseconds());
    // console.log("start "+d.getMilliseconds());
    // if (props.callup(props.index, true)) {
    //   setCls("Experience_hovered");
    // }
    console.log(props.index)
    props.callup(props.index, true)
  }

  function MovedOn() {
    setMouse("On");
  }

  function backToSmall() {
    props.callup(props.index, false);
    // if (cls == "Experience_hovered") {
    //   props.callup(props.index, false);
    //   setCls("Experience");
    // }
  }

  function MovedOff() {
    setMouse("Off");
    backToSmall();
  }

  if (props.big == 1 && cls == "Experience") {
    setCls("Experience_hovered");
  }
  // else if (props.big == 0 && mouse == "On") {
  //   setCls("Experience_hovered");
  // }
  else if (props.big == 1 && mouse != "On") {
    backToSmall();
  }
  else if (props.big == 0 && mouse != "On" && cls != "Experience") {
    setCls("Experience");
  }
  if (props.big == -1 && cls != "Experience") {
    setCls("Experience");
  }



  return (
   <li className="cards__item">
    <div className={cls} onMouseDown={() => MouseDown()}
      onMouseEnter={() => MovedOn()}
      onMouseLeave={() => MovedOff()}
    >
    {props.name}
    <span className="time">{props.time}</span>
    <CenteredImage className="ExperienceImage" src={props.image} alt={props.name}/>
    {props.description}
    <div className="comment">
    {props.comment.map( (x) => <><br/> {x}</>)}
    </div>
    </div>
  </li>
  );
}


function Experiences() {
  const [big, setBig] = React.useState(false);
  const [data, setData] = React.useState(createData(ExperienceData));

  function createData(experienceData) {
    return {"first":experienceData[0], "rest":experienceData.slice(1)};
  }

  function shiftUp(index) {
    const newFirst = data.rest.splice(index,1)[0];
    data.rest.unshift(data.first)
    var newData = {"first":newFirst, "rest":data.rest}
    setData(newData);
  }

  function callup(index, val) {
    if (val == true) {
      if (index != -1) {
        shiftUp(index);
      }
      setBig(true);
    }
    else {
      setTimeout(() => {
          setBig(false);
        }, 1000);
      // setBig(-1);
    }
    return true;
  }

  function waitAndCheck() {

  }

  // console.log(data);

  return (
    <ul className="Experiences">
    <Experience key={data.first} big={big} index={-1} callup={(index, val) => callup(index, val)} {...data.first}/>
    {data.rest.map( (x) => <Experience key={x} big={-1} index={data.rest.indexOf(x)} callup={(index, val) => callup(index, val)} {...x}/>)}
    </ul>
  );
}

export default Experiences;
