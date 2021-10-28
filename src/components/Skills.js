import { SkillData } from './data/SkillData'

function Skill(props) {

  return (
    <>
      <img className="Language-logo" flex="33.3%"
 comment={props.comment} src={props.image} alt={props.name}/>
    </>
  );
}






function Skills(props) {
  return (
    <div className="Skills">
    {SkillData.map( (x) => <Skill {...x}/>)}
    </div>
  );
}
// <div className="Language-logo-wrapper">
// </div>

export default Skills;
