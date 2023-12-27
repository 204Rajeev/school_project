import React from "react";

const Footer = () => {
  return (
    <section className="">
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#0a4275" }}
      >
        <div className="container p-2">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0 mt-3">
              <h5 className="text-uppercase mb-3">Contact Us</h5>
              <p className="mb-2">
                Government Inter College Purbaliyan
                <br />
                Muzaffarnagar, Uttar Pradesh
                <br />
                India, 251203
                <br />
                Phone: (123) 456-7890
                <br />
                Email: info@example.com
              </p>
            </div>

            <div className="col-lg-6 col-md-12 mb-4 mb-md-0 my-3">
              <div className="embed-responsive embed-responsive-4by3F">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8569.67735110554!2d77.66139274414017!3d29.357497785787263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c10d996f1ed7b%3A0x8dc02623363a70d1!2sPurbaliyan%2C%20Uttar%20Pradesh%20251203!5e0!3m2!1sen!2sin!4v1703095783981!5m2!1sen!2sin"
                  width="80%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a
            className="text-white ms-2"
            href="https://your-college-website.com/"
          >
            GIC Purbaliyan
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
