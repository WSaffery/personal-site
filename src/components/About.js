import Education from './Education'

function About() {
  return (
    <div className="About">
    <h1>
    William Saffery
    </h1>
    <p>
       <code>I enjoy coding, developing applications and software, solving compsci problems and working with data in code and beyond.</code>
       <br/>
       <a href="https://github.com/WSaffery">My github</a>
    </p>
    <Education/>
    </div>
  );
}

export default About;
