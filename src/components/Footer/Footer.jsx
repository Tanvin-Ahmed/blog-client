import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-red-400 text-3xl font-bold">Follow Us</h1>
      <div className="icons my-4">
        <a
          className="m-3 rounded-full text-2xl text-blue-500 hover:text-blue-600"
          href="https://www.linkedin.com/in/tanvin-ahmed-135170211/"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          className="m-3 rounded-full text-2xl text-blue-500 hover:text-blue-600"
          href="https://web.facebook.com/tanvinahmed.touhid/"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          className="m-3 rounded-full text-2xl text-blue-500 hover:text-blue-600"
          href="https://www.twitter.com"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          className="m-3 rounded-full text-2xl text-red-400 hover:text-red-600"
          href="https://www.instagram.com"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <p className="text-gray-600 mb-3">
        &copy; Copyright by A. N. M. Tanvin Ahmed. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
