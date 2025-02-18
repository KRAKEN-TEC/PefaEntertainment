import "./CSS/AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-content">
        <h1>PEFA Entertainment</h1>
        <p>
          PEFA Entertainment is dedicated to bringing top-quality entertainment
          to audiences worldwide. Our mission is to innovate and deliver the
          best entertainment experiences.
        </p>

        <h2>PEFA</h2>
        <p>
          PEFA provides a diverse range of entertainment services, including
          music, movies, and digital content.
        </p>

        <h2>Entertainment</h2>
        <p>
          We collaborate with talented artists, directors, and producers to
          create unique and engaging experiences for our audience.
        </p>

        <div className="social-links">
          <p>Follow us:</p>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            📘 PEFA Entertainment
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            🐦 @PEFAEntertainment
          </a>
        </div>

        <h2>Privacy Policy</h2>
        <p>
          At PEFA Entertainment, we are committed to protecting your privacy. We
          collect minimal data required to enhance your experience. By using our
          services, you agree to our data collection policies, including cookies
          and analytics.
        </p>

        <div className="privacy-box">
          <p>
            1. We do not sell your data.
            <br />
            2. We collect basic usage information for service improvement.
            <br />
            3. Your information is securely stored and protected.
            <br />
            4. You can request to delete your data at any time.
            <br />
            5. For any concerns, contact us at privacy@pefa.com.
          </p>
        </div>
      </section>
    </div>
  );
}
