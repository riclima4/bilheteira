import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="rights">PurpleTicket - All right Reserved.&copy;</div>

        <ul class="socials">
          <li>
            <a href="https://www.facebook.com/">
              <i class="fa-brands fa-facebook" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/?hl=en">
              <i class="fa-brands fa-instagram" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/">
              <i class="fa-brands fa-pinterest-p" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/?lang=en">
              <i class="fa-brands fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
