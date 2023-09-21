import "../../Components/navFooter/Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="nav">
        <div className="appname">
          <a href="/">Tomato</a>
        </div>
        <div className="options">
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
