import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartSideBar from "../../views/cart-sidebar";
import Login from "../../views/auth/login";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { useDispatch, useSelector } from "react-redux";
import authServices from "../../services/authService";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToProductSearch = () => {
    navigate("/search");
  };

  const [isLinksVisible, setLinksVisible] = useState(false);

  const toggleLinksVisibility = () => {
    setLinksVisible(!isLinksVisible);
  };

  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (!profile || Object.keys(profile).length < 1) {
      try {
        authServices.userProfile(dispatch);
      } catch (e) {
        toast.error(e, ToastObjects);
      }
    }
  }, [dispatch]);

  const checkAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken;
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken");
      window.location.reload();
    } catch (e) {
      toast.error("Something went wrong.", ToastObjects);
    }
  };

  return (
    <div>
      <header className="header clearfix">
        <nav
          style={{ backgroundColor: "#212529" }}
          className="navbar navbar-light navbar-expand-lg osahan-menu"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{ color: "#fff" }}>
              Nairobi Closet
            </a>
            <button
              className="navbar-toggler navbar-toggler-white"
              type="button"
              onClick={toggleLinksVisibility}
            >
              {!isLinksVisible ? (
                <span className="navbar-toggler-icon" />
              ) : (
                <i className="mdi mdi-close"  onClick={toggleLinksVisibility}/>
              )}
            </button>
            {isLinksVisible && (
              <div className="navbar-links">
                <Link className="link" to="/">
                  Home
                </Link>
                <Link  className="link" to="/about-us" >
                  About Us
                </Link>
                <Link  className="link" to="/blog" >
                 Blogs
                </Link>
                <Link  className="link" to="/contacts" >
                  Contacts
                </Link>
                <Link  className="link" to="/our-terms" >
                  Terms & Conditions
                </Link>
                <Link  className="link" to="/faqs" >
                  Faqs
                </Link>
                <div className="tilldiv"> <img src="https://www.treasuredconsulting.co.ke/wp-content/uploads/2019/10/Lipa-na-Mpesa-Till-Number-Buy-Goods-and-Services-How-to-Apply.png" className="till" alt="till-number"/></div>
              </div>
            )}
            <div className="navbar-collapse" id="navbarNavDropdown">
              <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                <div className="top-categories-search">
                  <div className="call">
                    <i className="mdi mdi-phone px-2" />{" "}
                    <a href="tel:+254741515192">+254741515192</a>
                  </div>
                </div>
              </div>


            
              
              <Link
                style={{ marginTop: "-10px" }}
                to="/search"
                className="dropdown"
                onClick={navigateToProductSearch}
              >
                <h4>
                  <i className="mdi mdi-file-find" /> Search
                </h4>
              </Link>


              <div className="my-2 my-lg-0">
                <ul className="list-inline main-nav-right">
                  <li className="list-inline-item">
                    {checkAuth() ? (
                      <>
                        <div className="dropdown">
                          <button
                            className="btn btn-account dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            >
                            <i className="mdi mdi-account-circle px-2" />
                            {profile.name}
                            </button>
                            <div
                                                     className="dropdown-menu"
                                                     aria-labelledby="dropdownMenuButton"
                                                   >
                           
                            <Link
                                                       to="#"
                                                       className="dropdown-item"
                                                       onClick={handleLogout}
                                                     >
                            <i
                                                         className="mdi mdi-lock"
                                                         aria-hidden="true"
                                                       ></i>{" "}
                            Logout
                            </Link>

                            <Link
                                                       to="/myorders"
                                                       className="dropdown-item"
                                                      
                                                     >
                            <i
                                                       
                                                         aria-hidden="true"
                                                       ></i>{" "}
                            MyOrders
                            </Link>
                            </div>
                            </div>
                            </>
                            ) : (
                            <>
                            <a
                                                   href=""
                                                   data-target="#bd-example-modal"
                                                   data-toggle="modal"
                                                   className="btn btn-link"
                                                 >
                            <i className="mdi mdi-account-circle" /> Login/Sign Up
                            </a>
                            </>
                            )}
                            </li>
                            <li className="list-inline-item cart-btn">
                            <CartSideBar />
                            </li>
                            </ul>
                            </div>
                            </div>
                            </div>
                            </nav>
                            </header>
                            {/* login popup */}
                            <Login />
                            </div>
                            );
                            };
                            
                            export default Navigation;
