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
  // console.log(props);
  // console.log(subClasses);
  if (props.shade) {
    subClasses.push("shade");
  }
  const defaultCls = classString("Experience", subClasses);
  const bigCls = classString("Experience_hovered", subClasses);
  const [cls, setCls] = React.useState(defaultCls);
  const [mouse, setMouse] = React.useState(0);

  function MouseDown() {
    // console.log(props.index)
    props.callup(props.index, 1)
  }

  function MovedOn() {
    setMouse(1);
  }

  function backToSmall() {
    props.callup(props.index, 0);
  }

  function MovedOff() {
    setMouse(0);
    // backToSmall();
  }

  if (props.big > 0) {
    props.setOnBig(mouse);
  }

  if (props.big > 0 && cls == defaultCls) {
    props.setOnBig(1);
    setCls(bigCls);
  }

  if (props.big == -1 && cls != defaultCls) {
    setCls(defaultCls);
  }

  var wrapTextCls = cls == bigCls?"experienceTextDiv_Big":"experienceTextDiv";
  if (props.shade) {
    wrapTextCls += " ShadowCover"
  }
  // const wrapper = `${defaultCls}_wrapper`;

  return (
   <li className="cards__item">
   <div className={cls} onMouseDown={() => MouseDown()}
     onMouseEnter={() => MovedOn()}
     onMouseLeave={() => MovedOff()}
   >
    <div className={wrapTextCls}>
    {props.name}<br/>
    <span className="time">{props.time}</span>
    <CenteredImage className="ExperienceImage" src={props.image} alt={props.name}/>
    {props.description}
    <div className="comment">
    {props.comment.map( (x) => <><br/> {x}</>)}
    </div>
    </div>
    </div>
  </li>
  );
}

// <ShadowCover/>
// <ShowButton status="more" className="Show"/>

function Monitor(props) {
  const subClasses = Object.keys(props)
                    .filter( key => props[key] == "subclass");
  const defaultCls = classString("Experience", subClasses);
  const cls = classString("Experience_hovered", subClasses);
  const wrapTextCls = "experienceTextDiv_Big"
  // const [cls, setCls] = React.useState(defaultCls);
  // const wrapTextCls = cls == bigCls?"experienceTextDiv_Big":"experienceTextDiv";

  if (props.live != -1) {
    return (
      <li className="cards__item">
      <div className={cls}>
       <div className={wrapTextCls}>
       {props.name}<br/>
       <span className="time">{props.time}</span>
       <CenteredImage className="ExperienceImage" src={props.image} alt={props.name}/>
       {props.description}
       <div className="comment">
       {props.comment.map( (x) => <><br/> {x}</>)}
       </div>
       </div>
       </div>
     </li>
    );
  }
  else {
    return null;
  }

}

function Experiences() {
  const [big, setBig] = React.useState(0);
  const [data, setData] = React.useState(createData(ExperienceData));
  const [onBig, setOnBig] = React.useState(0);
  const [live, setLive] = React.useState(-1);

  function createData(experienceData) {
    return {"focus_index":0, "array":experienceData};
  }

  function shiftUp(index) {
    const newFirst = data.rest.splice(index,1)[0];
    data.rest.unshift(data.first);
    var newData = {"first":newFirst, "rest":data.rest};
    setData(newData);
  }

  function callup(index, val) {
    if (val == true) {
      data.focus_index = index;
      setLive(index);
    }
    return true;
  }

  return (
    <>
    <Monitor live={live} key={data.array[data.focus_index]} big={1} setOnBig={setOnBig} index={-1} callup={(index, val) => callup(index, val)} {...data.array[data.focus_index]}/>
    <ul className="Experiences">
    {data.array.map( (x) => <Experience key={x} shade={(data.array.indexOf(x)==data.focus_index) && live != -1} big={-1} index={data.array.indexOf(x)} callup={(index, val) => callup(index, val)} {...x}/>)}
    </ul>
    </>
  );
}
// <Experience key={data.array[data.focus_index]} big={1} setOnBig={setOnBig} index={-1} callup={(index, val) => callup(index, val)} {...data.array[data.focus_index]}/>

export default Experiences;
