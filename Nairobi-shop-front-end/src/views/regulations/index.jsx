import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import "./index.css";


function Regulations() {

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </Link>{" "}
              <span className="mdi mdi-chevron-right" />{" "}
              <a href="#">
              Terms & Conditions
              </a>{" "}
              
              
            </div>
          </div>
        </div>
      </section>
      <section className="shop-single section-padding pt-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-start">
              <h2>Terms & Conditions</h2>
              <p className="text-dark about text-lg">
              Nairobi Closet is the leading online footwear store in Kenya. We offer delivery services for orders of shoes as placed by customers over various ordering platforms. The ordering platform options are:
              </p>
              <ol>
              <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" /> The shopping cart on the Nairobi Closet website and mobile application</li>
              <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" /> WhatsApp/SMS/phone call on the Nairobi Closet official number 0741515192.</li>
  </ol>
  <p className="text-dark about text-lg">Deliveries of shoes within Nairobi CBD and Nairobi environs are to be done within 30 minutes, while deliveries outside Nairobi are expected to reach the customer within 24 hours after dispatch from Nairobi Closet Online Footwear Store. Nairobi Closet is a legal enterprise recognized by the government of Kenya. We are committed to conducting only legal activities as dictated by Kenyan law and shall not accept any illegal dealings.</p>
  <h3 className="text-dark about text-lg">A glimpse into Nairobi Closet Online Footwear Store:</h3>
  <ul >
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />We only deal with genuine products from licensed manufacturers, wholesalers, and retailers.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Nairobi Closet is not involved in the manufacturing or modification of products; we focus solely on providing quality delivery services and great packaging for our clients.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Orders can only be canceled before delivery, within 20 minutes after the order is placed.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Payments must be made through the official payment methods of Nairobi Closet.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Only legal tender shall be accepted as a mode of payment.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Nairobi Closet advocates for responsible shoe shopping and shall not be held liable for any impulsive or irrational purchases.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />In case of delivery delays or issues, Nairobi Closet shall notify the client of any developments and make arrangements to resolve the situation.</li>
  <li className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Customer information is confidential and shall not be disclosed to any unauthorized personnel.</li>
  </ul>
            </div>
          </div>
        </div>
</section>

    </div>
  );
}

export default Regulations;