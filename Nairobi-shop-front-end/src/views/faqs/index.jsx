import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import "./index.css";


function Faqs() {
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
              Faqs
              </a>{" "}
              
              
            </div>
          </div>
        </div>
      </section>
      <section className="shop-single section-padding pt-3">
        <div className="container">
          <div className="row">
          <div className="col-12 text-start">
<h2>FAQS</h2>
<h4 className="text-dark about text-lg">1: Do you offer nationwide delivery?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Yes, we offer nationwide delivery services to customers all across Kenya.</p>
    <h4 className="text-dark about text-lg">2: How long does it take for my order to be delivered?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" /> Delivery within Nairobi CBD and environs takes approximately 1-2 business days. For other regions in Kenya, it may take 2-4 business days.</p>
    <h4 className="text-dark about text-lg">3: What are the delivery charges for nationwide orders?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />We offer free delivery for all orders within Nairobi CBD and its environs. Delivery charges for other regions in Kenya may vary based on the location and weight of the package.</p>
    <h4 className="text-dark about text-lg">4: Can I track the status of my delivery?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Yes, we provide a tracking number for every order. You can use this tracking number to monitor the status of your delivery on our website.</p>
    <h4 className="text-dark about text-lg">5: What is your return policy?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />We have a hassle-free return policy. If you are not satisfied with your purchase, you can return the item within 14 days of delivery for a refund or exchange.</p>
    <h4 className="text-dark about text-lg">6: How do I initiate a return or exchange?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />To initiate a return or exchange, please contact our customer support team via email or phone. They will guide you through the process and provide you with the necessary instructions.</p>
    <h4 className="text-dark about text-lg">7: Are there any charges for returns or exchanges?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />We offer free returns and exchanges. However, please ensure that the item is in its original condition with all tags and packaging intact.</p>
    <h4 className="text-dark about text-lg">8: Do you have a size guide to help me choose the right shoe size?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Yes, we provide a comprehensive size guide on our website to assist you in selecting the correct shoe size. You can refer to this guide for accurate measurements.</p>
    <h4 className="text-dark about text-lg">9: What payment methods do you accept?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />We accept various payment methods, including M-Pesa, credit/debit cards, and mobile banking options. You can choose the most convenient option during the checkout process.</p>
    <h4 className="text-dark about text-lg">10: Is it safe to make online payments on your website?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Yes, we prioritize the security of our customers' payment information. Our website is equipped with secure encryption technology to ensure safe and confidential transactions.</p>
    <h4 className="text-dark about text-lg">11: Can I cancel my order after it has been placed?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" />Yes, you can cancel your order within 24 hours of placing it. Please contact our customer support team as soon as possible to request a cancellation.</p>
    <h4 className="text-dark about text-lg">12: What if I receive a damaged or defective product?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" /> If you receive a damaged or defective product, please notify us immediately. We will arrange for a replacement or provide a refund, depending on your preference.</p>
    <h4 className="text-dark about text-lg">13: Are all your shoes authentic and of high quality?</h4>
    <p className="text-dark  px-3 rag"> <span className="mdi mdi-chevron-right text-primary lag" /> Yes, we guarantee that all our shoes are authentic and sourced from trusted manufacturers. We take pride in offering high-quality footwear. </p>
</div>
          </div>
        </div>
</section>

    </div>
  );
}

export default Faqs;