import { ExperienceData } from './data/ExperienceData'
import { CenteredImage } from './CenteredImage'
import React from 'react'

function classString(mainCls, subClasses) {
  console.log(`${subClasses.join(" ")}`);
  return `${mainCls} ${mainCls}-${subClasses.join(` ${mainCls}-`)}`;
}

function ShowButton(props) {
  return (<><button className={props.className}>Show {props.status}</button></>);
}

function Experience(props) {
  const subClasses = Object.keys(props)
                    .filter( key => props[key] == "subclass");
  console.log(props);
  console.log(subClasses);
  const defaultCls = classString("Experience", subClasses);
  const bigCls = classString("Experience_hovered", subClasses);
  const [cls, setCls] = React.useState(defaultCls);
  const [mouse, setMouse] = React.useState(0);

  function MouseDown() {
    console.log(props.index)
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

  if (props.big == 1) {
    props.setOnBig(mouse);
  }

  if (props.big == 1 && cls == defaultCls) {
    props.setOnBig(1);
    setCls(bigCls);
  }

  // else if (props.big == 1 && mouse != 1) {
  //   backToSmall();
  // }
  // else if (props.big == 0 && mouse != 1 && cls != defaultCls) {
  //   setCls(defaultCls);
  // }
  if (props.big == -1 && cls != defaultCls) {
    setCls(defaultCls);
  }

  const wrapTextCls = cls == bigCls?"experienceTextDiv_Big":"experienceTextDiv";

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
    <ShowButton status="more" className="Show"/>
    </div>
  </li>
  );
}


function Experiences() {
  const [big, setBig] = React.useState(0);
  const [data, setData] = React.useState(createData(ExperienceData));
  const [onBig, setOnBig] = React.useState(0);

  function createData(experienceData) {
    return {"first":experienceData[0], "rest":experienceData.slice(1)};
  }

  function shiftUp(index) {
    const newFirst = data.rest.splice(index,1)[0];
    data.rest.unshift(data.first)
    var newData = {"first":newFirst, "rest":data.rest}
    setData(newData);
  }
  document.onclick = () => {
    setTimeout(() => {if (onBig == 0 && big == 1) {
          setBig(-1);
        }}, 100)

    // if (mouse === 0 && cls === bigCls) {
    //   props.callup(props.index, 0)
    // }
    // else if (cls != bigCls) {
    //   props.callup(props.index, 1)
    // }
  }

  function callup(index, val) {
    if (val == true) {
      if (index != -1) {
        shiftUp(index);
      }
      setBig(1);
    }
    else {
      setBig(0);
      // setTimeout(() => {
      //     setBig(0);
      //   }, 1000);
      // setBig(-1);
    }
    return true;
  }

  function waitAndCheck() {

  }

  // console.log(data);

  return (
    <ul className="Experiences">
    <Experience key={data.first} big={big} setOnBig={setOnBig} index={-1} callup={(index, val) => callup(index, val)} {...data.first}/>
    {data.rest.map( (x) => <Experience key={x} big={-1} index={data.rest.indexOf(x)} callup={(index, val) => callup(index, val)} {...x}/>)}
    </ul>
  );
}

export default Experiences;
