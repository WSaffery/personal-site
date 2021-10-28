import { ExperienceData } from './data/ExperienceData'
import { CenteredImage } from './CenteredImage'
import React from 'react'

function Experience(props) {
  const [cls, setCls] = React.useState("Experience");

  function MovedOn() {
    if (props.callup(props.index, true)) {
      setCls("Experience_hovered");
    }
  }

  function MovedOff() {
    props.callup(props.index, false);
    setCls("Experience");
  }

  return (
   <li className="cards__item">
    <div className={cls} onMouseEnter={() => MovedOn()}
    onMouseLeave={() => MovedOff()}>
    {props.name}
    <span className="time">{props.time}</span>
    <CenteredImage className="ExperienceImage" src={props.image} alt={props.name}/>
    {props.description}
    {props.comment.map( (x) => <><br/> {x}</>)}
    </div>
  </li>
  );
}
// {props.comment}

function swapElement(array, indexA, indexB) {
  var tmp_arr = array;
  var tmp = tmp_arr[indexA];
  tmp_arr[indexA] = tmp_arr[indexB];
  tmp_arr[indexB] = tmp;
  return tmp_arr
}

function Experiences() {
  const [big, setBig] = React.useState(false);
  const [list, setList] = React.useState(ExperienceData);

  function createData(experienceData) {
    return {"first":experienceData[0], "rest":experienceData.slice(1)};
  }
  // 
  // function shiftUp(index) {
  //   const newFirst = data.splice(index,1);
  //   data.rest.unshift(data.first);
  //   data.first = newFirst;
  // }

  function callup(index, val) {
    if (big && val) {
      // console.log("swap");
      return false;
    }
    else {
      if (val) {
        setList(swapElement(list, index, 0));
        setBig(val);
      }
      return true;
    }
  }
  console.log(list);

  return (
    <ul className="Experiences">
    {list.map( (x) => <Experience key={x} index={list.indexOf(x)} callup={(val) => callup(val)} {...x}/>)}
    </ul>
  );
}

export default Experiences;
