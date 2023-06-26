// import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UPLOAD_URL } from "../../config";
import http from "../../services/api";
import { ToastObjects } from "../../utils/toast/toastObject";
import { useDispatch, useSelector } from "react-redux";
import homeServices from "../../services/homeServices";
import { Link } from "react-router-dom";

import "./footer.css"
function Footer() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.home.settings);
  let categories = useSelector((state) => state.home.categories);
  if (categories.length > 0) {
    categories = categories.slice(0, 6);
  }
  useEffect(() => {
    const getSettings = async () => {
      try {
        await homeServices.getHomeSettings(dispatch);
      } catch (error) {
        toast.error(error.message, ToastObjects);
      }
    };
    getSettings();
  }, []);
  return (
    <div>
      <div className="social"> 
      <a href="tel:+254741515192"> <img className="conta" src="https://i.pinimg.com/originals/c1/00/d4/c100d4c70bc17365a2a42ac22ef782da.png" alt=""/></a>
        <a href="https://wa.me/+254741515192"> <img className="conta" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhFAatHMxLav_7d1MyEBmw6GRu_ifnV4Nxag&usqp=CAU" alt="" /></a>
      </div>
      <section className="section-padding bg-white border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-truck-fast" />
                <h6 >Fast Shipping Right to Your Doorstep</h6>
<p className="text-info"> Stylish shoes, fast shipping, doorstep delight!</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-basket" />
                <h6>100% Satisfaction Guarantee</h6>
                <p className="text-info">Experience shoe satisfaction like never before!</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-tag-heart" />
                <h6>Amazing Daily Deals Await You</h6>
<p className="text-info">Unbeatable discounts for you!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section  style={{backgroundColor:"#212529"}} className="section-padding footer  border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h4 className="mb-5 mt-0">
                <Link className="logo" to="/">
                  <img
                    src={UPLOAD_URL + settings.logo}
                    alt={settings.site_name}
                  />
                </Link>
              </h4>
              <p className="mb-0">
                <Link to="#" className="text-white">
                  <i className="mdi mdi-phone " /> {settings.phone}
                </Link>
              </p>
              <p className="mb-0">
                <Link to="#" className="text-white">
                  <i className="mdi mdi-gmail" /> {settings.email}
                </Link>
              </p>
              <p className="mb-0">
                <Link to="#" className="text-white">
                  <i className="mdi mdi-map-marker" style={{fontSize:"19px"}} /> {settings.address}
                </Link>
              </p>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4 text-white">CATEGORIES</h6>
              <ul className="footer-list">
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, index) => (
                    <li key={index}>
                      <a className="text-white" href="#">{category.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4 text-white" >Userful Links</h6>
              <ul className="footer-list">
                <li><Link to="/"className="dropdown text-white"> Home</Link> </li> 
                <li><Link to="/blog"className="dropdown text-white">Blogs</Link> </li>  
                <li><Link to="/about-us"className="dropdown text-white">About Us</Link></li>
                <li><Link to="/our-terms"className="dropdown text-white">Terms $ Conditions</Link> </li>   
                <li><Link to="/faqs"className="dropdown text-white">Faqs</Link> </li>  
                <ul></ul>
              </ul>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-3  text-white">GET IN TOUCH</h6>
              {/* <div className="footer-social"> */}
              <ul className="footer-list">
              <li>  <a
                    style={{fontSize:"14px"}}
                  className="mx-1 text-white"
                  href={settings.facebookUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-facebook text-primary" />   Facebook
                </a>
                </li>
                <li> <a style={{fontSize:"14px"}}
                  className="text-white mx-1"
                  href={settings.twitterUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-twitter text-primary" /> Twitter
                </a></li>
                <li> <a style={{fontSize:"14px"}}
                  className="text-white mx-1"
                  href={settings.linkedinUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-linkedin text-primary" /> LinkedIn
                </a> </li>
                <li> <a style={{fontSize:"14px"}}
                  className="text-white mx-1"
                  href={settings.instagramUrl}
                  target="_blank"
                >
                  <i className="mdi mdi-instagram text-primary" /> Instagram
                </a></li></ul>
            </div>
            <div class="col-lg-2 col-md-2 paymethods">
  <h6 class="text-white px-3">PAYMENT METHODS</h6>
  <div class="tilldiv">
    <img src="https://www.treasuredconsulting.co.ke/wp-content/uploads/2019/10/Lipa-na-Mpesa-Till-Number-Buy-Goods-and-Services-How-to-Apply.png" class="till" alt="till-number" />
  </div>
 
</div>

          </div>
        </div>
 
      {/* End Footer */}
      {/* Copyright */}
      <section className="pt-4 text-center md-0 footer-bottom">
        <hr/>
        <div className="container">
          <div className="row no-gutters text-center">
            <div className="col-lg-6 col-sm-6">
              <p className="mt-1 mb-0 text-center text-white">
              <small>Nairobi Closet © Copyright <span className="text-primary">{new Date().getFullYear()}</span>
                <strong className="text-dark"></strong>
                . All Rights Reserved</small> 
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Copyright */}     </section>
    </div>
  );
}

export default Footer;
