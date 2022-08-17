import React, { useEffect, useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer";
import ImageLoad from "../imageLoad";
import axios from "axios";


export default function Contact() {
  const [name, setname] = useState();
  const [message, setmessage] = useState();
  const [email, setemail] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && message && email) {

      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        axios
          .post("https://technscience.com/funwithscience_backend/sendemail.php", {
            name,
            email,
            message,
          })
          .then((res) => {
            if (res.data === 1) {
              alert("Message sent Successfully");
              setname("");
              setemail("");
              setmessage("");
            } else {
              alert("Some error occured");
            }
            console.log(res.data);
          });
      }
      else{
        alert("You have entered an invalid email address!");
      }
    } else {
      alert("Please fill the form properly");
    }
  };
  return (
    <React.Fragment>
      <Navbar />
      <Helmet>
        <title>Fun With Science - Tech N Science </title>
        <meta
          name="description"
          content="We at Tech N Science try to bring all sciences under one roof by providing JEE level questions and also calculators for different science formulas."
          data-react-helmet="true"
        />
        <meta
          name="keywords"
          content="Classical Mechanics, calculator, physics, Tech n science, technscience, tech and science, Physics formula, Physics calculator, IIT-JEE, NEET,Tech N Science, tech, science, questions, technscienceweb, technscience, tech and science, technscience.com, Tech N Science, technscience. com, tech n science"
        />
      </Helmet>
      <h1 className="contact-heading">Contact Us</h1>
      <div className="contactMain">
        <div className="contactDetails">
          <div className="contactSVG">
            <ImageLoad className="contact-img" main= {"./Images-public/Contact.webp"} placeholder = {"./Images-public/Contact-small.webp"} alt = "contact" />
          </div>
          <div className="contactTXT">
            <div className="contactInfo">
            <span className="fa fa-1x fa-map-marker-alt" />
              <p>
                Anand Arcade,Block C(G-4),MSR Layout, Chandrampalem,VSKP,AP-48
              </p>
            </div>
            <div className="contactInfo">
            <span className="fa fa-1x fa-phone" />
              <p>+91 8688785464</p>
            </div>
            <div className="contactInfo">
            <span className="fa fa-1x fa-envelope" />
              <p>support@technscience.com</p>
            </div>
          </div>
        </div>

        <div className="contactForm">
          <h2>Name</h2>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            value={name}
          />
          <h2>Email</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <h2>Message</h2>
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <div className="contactBTN" onClick={handleSubmit}>
            Send
          </div>
        </div>
      </div>

      <Footer />
      </React.Fragment>
  );
}
