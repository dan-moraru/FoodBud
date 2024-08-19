import '../App.css';
import '../styles/AboutUs.css';
import bannerImg from '../img/apples.webp';

/**
 * AboutUs renders a text explaining the company's goals 
 * 
 * @component
 */
function AboutUs() {

  // Daily Value Url since it is too long
  const dvBaseUrl = 'https://www.fda.gov/food/nutrition-facts-label/';
  const dvUrl = dvBaseUrl + 'daily-value-nutrition-and-supplement-facts-labels';

  return (
    <section id="about-us-container">
      <div id="about-us-text">
        <h1>About Us</h1>
        <p>
          At FoodBud, we are passionate about simplifying and enhancing people's daily lives 
          through 
          technology.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is to empower individuals to take control of 
          their health and wellness journey by 
          providing them with a user-friendly platform that simplifies 
          the process of 
          tracking daily food intake.
        </p>
        <h3>What We Do</h3>
        <p>
        Our application allows users to effortlessly 
        track their food consumption throughout the day, 
        allowing them to have a better insight into their nutritional intake 
        and allowing them to make informed decisions about their diet. 
        </p>
        <h3>Join Us on Our Journey</h3>
        <p>
        Join us as we embark on this exciting journey to 
        revolutionize the way people approach their health 
        and wellness goals. Whether you're a fitness enthusiast, 
        a health-conscious individual, or someone simply looking to lead 
        a healthier lifestyle, our application is designed to help you 
        achieve your goals and live your best life.
        </p>
        <h3>Authors</h3>
        <p>Dan Moraru, Amir Mojtahedi, Oleksandr Sologub, Samir Abo-Assfour</p>
        <h3 id="attribution-header">Attributions</h3>
        <div className="attribution-block">
          <a href="https://tools.myfooddata.com/nutrition-facts-database-spreadsheet.php">
            Food Data</a>
          <a href={dvUrl}>
            Daily Value Data</a>
          <a href="https://developers.google.com/identity/protocols/oauth2">Google OAuth2</a>
          <a href="https://www.flaticon.com/">Icons</a>
        </div>
      </div>
      <div className="banner-section">
        <img src={bannerImg} alt="row of apples" />
      </div>
    </section>
  );
}

export default AboutUs;