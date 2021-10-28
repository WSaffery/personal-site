import { SkillData } from './data/SkillData'

function Skill(props) {
  return (
    <>
      <img className="Language-logo" flex="33.3%" comment={props.comment} src={props.image} alt={props.name}/>
    </>
  );
}






function Skills(props) {
  return (
    <div className="Skills">
    <span className="Language-logo-wrapper" flex="33.3%" padding="5px">
    {SkillData.map( (x) => <Skill {...x}/>)}
      </span>
    </div>
  );
}

export default Skills;
