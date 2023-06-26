import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useParams } from "react-router-dom";
import http from "../../services/api";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { priceFormat } from "../../utils/helper";
import { UPLOAD_URL } from "../../config";
import "./index.css";
import { addToCart } from "../../store/actions/cartActions";
import parse from "html-react-parser";

function SingleProduct() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const match = useMatch("/product/:slug");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const selectedcolorref=useRef('')
  const selectedsizeref=useRef('')
  const currency = useSelector((state) => state.home.settings).symbol;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
 
 
  const handleColorClick = (color) => {
    selectedcolorref.current = color;
    console.log("Color is", selectedcolorref.current);
  };
  


  const handleColorChange = (e) => {
    selectedcolorref.current = e.target.value;
    console.log("color is",selectedcolorref.current);
  };
  
  const handleSizeChange = (e) => {
    selectedsizeref.current = e.target.value;
    console.log("size is",selectedsizeref.current);
  };

  const handleSizeClick = (selectedSize) => {
    selectedsizeref.current = selectedSize;
    console.log("Selected size is", selectedsizeref.current);
  };
  


  useEffect(() => {
    const getProductBySlug = async () => {
      try {
        const { data } = await http.get(`/api/v1/home/product/details/${slug}`);
        setProduct(data);
      } catch (e) {
        toast.error("Something went wrong.", ToastObjects);
      }
    };

    getProductBySlug();
  }, [slug]);

  const incrementToCart = () => {
    setQuantity(quantity + 1);
  };

  const decrementToCart = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity, selectedcolorref.current, selectedsizeref.current));
  };

  const settings = {
    customPaging: function (i) {
      return (
        <div id="sync1" className="owl-carousel">
          <div className="item">
            <img alt="" src={UPLOAD_URL + product.images[i]} />
          </div>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
                {product && product.category && product.category.name}
              </a>{" "}
              <span className="mdi mdi-chevron-right" />{" "}
              <a href="#">{product && product.name}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-single section-padding pt-3">
        <div className="container">
          {product ? (
            <div className="row">
              <div className="col-md-6">
                <div className="shop-detail-left">
                  <div className="shop-detail-slider">
                    {product.images ? (
                      <Slider {...settings}>
                        {product.images
                          ? product.images.map((image, index) => {
                              return (
                                <div key={index}>
                                  <img
                                    alt=""
                                    src={UPLOAD_URL + image}
                                    className="img-fluid img-center"
                                  />
                                </div>
                              );
                            })
                          : "Please Upload Image"}
                      </Slider>
                    ) : (
                      <div id="sync1" className="owl-carousel">
                        <div className="item">
                          <img
                            alt=""
                            src={UPLOAD_URL + product.thumbnailImage}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="shop-detail-right">
                  {product.discount && (
                    <span className="badge badge-success">
                      {priceFormat(currency, product.discount)} OFF
                    </span>
                  )}
                  {/* <h2>{product.name}</h2> */}

                  <h6 style={{marginTop:'20px'}}>
  <strong>
    <span className="mdi mdi-approval" /> Click Once The Color That Suits You
  </strong>{" "}
  -
  <div>
    {product.colors &&
      product.colors.map((color, index) => {
        const individualColors = color.split(",");
        return individualColors.map((individualColor, idx) => (
          <div
            key={`${index}-${idx}`}
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: individualColor.trim(),
              marginRight: '5px',
            }}
            onClick={() => handleColorClick(individualColor.trim())}
          />
        ));
      })}
  </div>
</h6>



                  {/* <h6>
  <strong>
    <span className="mdi mdi-approval" /> Available colors
  </strong>{" "}
  -{" "}
  <select
    value={selectedcolorref.current}
    onChange={handleColorChange}
  >
    <option value="">Select a color</option>
    {product.colors &&
      product.colors.map((color, index) => {
        const individualColors = color.split(",");
        return individualColors.map((individualColor, idx) => (
          <option key={`${index}-${idx}`} value={individualColor.trim()}>
            {individualColor.trim()}
          </option>
        ));
      })}
  </select>
</h6> */}
<h6>
  <strong>
    <span className="mdi mdi-approval" /> Click Once The Size That Fits You
  </strong>{" "}
  -{" "}
  <div>
    {product.sizes &&
      product.sizes.map((size, index) => {
        const individualSizes = size.split(",");
        return individualSizes.map((individualSize, idx) => (
          <div
            key={`${index}-${idx}`}
            style={{
              display: 'inline-block',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '1px solid black',
              textAlign: 'center',
              lineHeight: '30px',
              marginRight: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleSizeClick(individualSize.trim())}
          >
            {individualSize.trim()}
          </div>
        ));
      })}
  </div>
</h6>



                  <div className="pdp-product__old-price">
                    <p>
                      <strong>Brand : </strong>
                      {product.brand && product.brand.name}
                    </p>
                    <p>
                      <strong>Category : </strong>
                      {product.category && product.category.name}
                    </p>

                    {product.subcategory && (
                      <p>
                        <strong>Sub Category : </strong>
                        {product.subcategory.name}
                      </p>
                    )}

                   <p>
                   <span className="space__right--2-unit">
                      Original Price:
                    </span>
                    <span className="regular-price">
                      {product.price && priceFormat(currency, product.price)}
                    </span>
                   </p>
                  </div>

                  <p className="pdp-product__new-price pt-2">
                    <span className="space__right--2-unit">Selling price:</span>
                    <span className="pdp-product__price--new">
                      {product.priceAfterDiscount &&
                        priceFormat(currency, product.priceAfterDiscount)}
                    </span>
                    <div className="pdp-product__tax-disclaimer">
                      (Inclusive of all taxes)
                    </div>
                  </p>
                  <p style={{ color:"black" }}>
                    {product.summary && product.summary}
                  </p>
                  <div className="qty-group ">
                    <div className="quantity buttons_added">
                      <input
                        type="button"
                        defaultValue="-"
                        className="minus minus-btn"
                        onClick={() => decrementToCart(product._id)}
                      />
                      <input
                        type="number"
                        value={quantity}
                        className="input-text qty text"
                        disabled
                      />
                      <input
                        type="button"
                        defaultValue="+"
                        className="plus plus-btn"
                        onClick={() => incrementToCart(product._id)}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={addToCartHandler}
                  >
                    <i className="mdi mdi-cart-outline" /> Add To Cart
                  </button>
                 
                  <h6 className="mb-3 mt-4">Why shop from Nairobi Closet?</h6>
<div className="row">
  <div className="col-md-12">
    <div className="feature-box">
      <i className="mdi mdi-truck-fast" />
      <h6 className="text-info">
        <span>Fast Nationwide Delivery</span>
      </h6>
      <p>
        Nairobi Closet offers fast and reliable delivery of shoes across the country.
      </p>
    </div>
  </div>
  <div className="col-md-12">
    <div className="feature-box">
      <i className="mdi mdi-basket" />
      <h6 className="text-info">Wide Selection at Competitive Prices</h6>
      <p>
     
Nairobi Closet offers a diverse selection of shoes at competitive prices, helping you discover the perfect pair within your budget.
      </p>
    </div>
  </div>
</div>
</div>
</div>
              <div className="col-lg-12 col-md-12">
                <div className="pdpt-bg">
                  <div className="pdpt-title">
                    <h4>Product Details</h4>
                  </div>
                  <div className="pdpt-body scrollstyle_4">
                  <div className="pdct-dts-1 short-desc">
                      {product &&
                        product.description &&
                        parse(product.description)}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;