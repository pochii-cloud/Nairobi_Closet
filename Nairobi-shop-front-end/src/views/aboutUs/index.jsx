import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import http from "../../services/api";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { priceFormat } from "../../utils/helper";
import { UPLOAD_URL } from "../../config";
import "./index.css";
import parse from "html-react-parser";
import { addToCart } from "../../store/actions/cartActions";
function AboutUs() {

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
                About Us
              </a>{" "}
              
              
            </div>
          </div>
        </div>
      </section>
      <section className="shop-single section-padding pt-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-start">
              <h2>About Us</h2>
              <p className="text-dark about text-lg">
              Nairobi Closet is an online shoe store catering to footwear enthusiasts in Nairobi and beyond. We bring you a wide range of stylish and high-quality shoes delivered right to your doorstep. Our collection includes various categories of shoes to suit different preferences and occasions.
              </p>
              <p className="text-dark about text-lg">Step into elegance and comfort with our selection of formal shoes. Whether you need a pair for a business meeting or a special event, we have the perfect footwear to complete your sophisticated look.</p>
              <p className="text-dark about text-lg">For those seeking casual and trendy options, explore our collection of sneakers. From classic designs to the latest streetwear styles, we have something to match your unique sense of fashion.</p>
              <p className="text-dark about text-lg">If you're a sports enthusiast, look no further than our athletic shoes category. Discover top-notch performance footwear designed to enhance your athletic abilities and keep you comfortable during workouts or sports activities.</p>
              <p className="text-dark about text-lg">Stay ahead of the fashion curve with our selection of trendy boots. From ankle boots to knee-high styles, we offer a variety of options to elevate your outfit and keep you on-trend throughout the seasons.</p>
              <p className="text-dark about text-lg">Attention to detail and craftsmanship is our priority when it comes to designing shoes. Our collection showcases premium materials, impeccable stitching, and comfortable insoles, ensuring that each step you take is a pleasant experience.</p>
              <p className="text-dark about text-lg">At Nairobi Closet, we believe that great shoes should be accessible to everyone. That's why we offer competitive prices without compromising on quality. With our convenient online platform, you can easily browse and order your favorite pairs from the comfort of your home.</p>
              <p className="text-dark about text-lg">Join us in embracing the joy of online shoe shopping. Visit our website at <span className="text-info">www.nairobicloset.co.ke</span> or connect with us on social media platforms like Facebook, Instagram, and Twitter. We look forward to helping you step out in style with Nairobi Closet.</p>
              <p className="text-dark about text-lg">Embrace the ease of modern shopping and explore our wide range of shoe collections. order a shoe today via <b>0741515192</b> (call, text, WhatsApp) or browse our website at <span className="text-info">www.nairobicloset.co.ke</span> to place your order using our user-friendly shopping cart or contact us via email at <b>nairobicloset50@gmail.com</b></p>
            </div>
          </div>
        </div>
</section>

    </div>
  );
}

export default AboutUs;