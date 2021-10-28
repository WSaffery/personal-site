// <img className="Language-logo" flex="33.3%" comment={props.comment} src={props.image} alt={props.name}/>


function CenteredImage(props) {
  return  (
    <div  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    <img {...props}/>
    </div>

  )
}

function Centered(props) {
  return  (
    <div  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    {props.children}
    </div>

  )
}

// export default CenteredImage;
export {Centered, CenteredImage};
