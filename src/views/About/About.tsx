import AccountButton from "../../components/AccountButton/AccountButton";
import NavBar from "../../components/NavBar/NavBar";
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <NavBar />
      <AccountButton />
      <h2 className="about-welcome">About RetroMUD</h2>
      <div className="about-box">
        <div className="about-box-interior">
          <h4 className="about-box-title">Lorem Ipsum</h4>
          <div className="about-divider"></div>
          <div className="about-blurb">
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
