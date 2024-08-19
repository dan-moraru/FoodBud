import mascot from '../../img/mascot.webp';

function WelcomeTab() {
  return (
    <section id="welcome-container">
      <div id="welcome-wrapper">
        <img src={mascot} alt="Mascot icon" />
        <h1 id="welcome-msg">Welcome aboard!</h1>
        <p id="getting-started-msg">Just a couple of clicks to get started</p>
      </div>
    </section>
  );
}

export default WelcomeTab;