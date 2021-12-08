import { ExperienceData } from './data/ExperienceData'
import { CenteredImage } from './CenteredImage'
import React from 'react'

function classString(mainCls, subClasses) {
  console.log(`${subClasses.join(" ")}`);
  return `${mainCls} ${mainCls}-${subClasses.join(` ${mainCls}-`)}`;
}

function Experience(props) {
  const subClasses = Object.keys(props)
                    .filter( key => props[key] == "subclass");
  console.log(props);
  console.log(subClasses);
  // const [cls, setCls] = React.useState("Experience");
  const defaultCls = classString("Experience", subClasses);
  const bigCls = classString("Experience_hovered", subClasses);
  // const defaultCls = "Experience";
  const [cls, setCls] = React.useState(defaultCls);
  const [mouse, setMouse] = React.useState(false);
  const [hvred, setHvred]  = React.useState(-1);

  function MouseDown() {
    console.log(props.index)
    props.callup(props.index, true)
  }

  function MovedOn() {
    setMouse("On");
  }

  function backToSmall() {
    props.callup(props.index, false);
  }

  function MovedOff() {
    setMouse("Off");
    backToSmall();
  }


  if (props.big == 1 && cls == defaultCls) {
    setCls(bigCls);
  }

  else if (props.big == 1 && mouse != "On") {
    backToSmall();
  }
  else if (props.big == 0 && mouse != "On" && cls != defaultCls) {
    setCls(defaultCls);
  }
  if (props.big == -1 && cls != defaultCls) {
    setCls(defaultCls);
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
