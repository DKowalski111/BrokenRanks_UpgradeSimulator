const Footer = () => {
  return (
    <div>
      <footer>
        <img className="shadows-image" src={require("../../images/bottom.png")} alt="Shadows" />
        <div className="footer-content p-3" style={{ background: 'black' }}>
          <span className="main-theme-text">
            Wszystkie grafiki wykorzystane na stronie są własnością firmy Whitemoon.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
