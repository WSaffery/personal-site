import { ExperienceData } from './data/ExperienceData'


function Experience(props) {
  return (
   <li class="cards__item">
    <div className="Experience">
    {props.name}
    <img class="ExperienceImage" src={props.image} alt={props.name}/>
    {props.time} {props.description} {props.comment}
    </div>
  </li>
  );
}


function Experiences() {
  return (
    <ul className="Experiences">
    {ExperienceData.map( (x) => <Experience {...x}/>)}
    </ul>
  );
}

export default Experiences;
