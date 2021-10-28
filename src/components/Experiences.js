import { ExperienceData } from './data/ExperienceData'
import { CenteredImage } from './CenteredImage'


function Experience(props) {
  return (
   <li className="cards__item">
    <div className="Experience">
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


function Experiences() {
  return (
    <ul className="Experiences">
    {ExperienceData.map( (x) => <Experience {...x}/>)}
    </ul>
  );
}

export default Experiences;
