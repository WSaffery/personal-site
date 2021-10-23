import { SkillData } from './data/SkillData'

function Skill(props) {
  return (
    <>
    <span className="Language-logo-wrapper" flex="33.3%" padding="5px">
      <img className="Language-logo" flex="33.3%" comment={props.comment} src={props.image} alt={props.name}/>
      </span>
    </>
  );
}






function Skills(props) {
  return (
    <div className="Skills">
    <p>
    {SkillData.map( (x) => <Skill {...x}/>)}
    </p>
    </div>
  );
}

export default Skills;
