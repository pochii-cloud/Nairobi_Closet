import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch, useParams } from "react-router-dom";
import http from "../../services/api";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import { priceFormat } from "../../utils/helper";
import { UPLOAD_URL } from "../../config";
import "./index.css";
import { addToCart } from "../../store/actions/cartActions";
import ConfirmOrder from "../checkout/complete";


function ProductSearch() {
  const dispatch = useDispatch();
  const {slug}=useParams()
  const match = useMatch("/product/:slug");
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const currency = useSelector((state) => state.home.settings).symbol;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await http.get(`/api/v1/home/product/${slug}`);
        setProduct(data);
        setProductId(data._id)
      } catch (e) {
        toast.error("Something went wrong.", ToastObjects);
      }
    };

    getProductById();
  }, [productId]);

  const incrementToCart = () => {
    setQuantity(quantity + 1);
  };

  const decrementToCart = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart(slug, quantity));
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


  const searchRef=useRef('');
  const [searchResults, setSearchResults] = useState([]);

  
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchQuery = searchRef.current.value;
  
    try {
      const response = await fetch(`/api/v1/home/product/search?search=${searchQuery}`);
      const data = await response.json();
  
      if (response.ok) {
        setSearchResults(data.product);
        console.log(searchResults) // Access the 'product' array in the response
      } else {
        console.error('Error occurred during search:', data.message);
      }
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };
  

  

  return ( 
    <>
    <div className="frm">
    <div>
      <form onSubmit={handleSearch}>
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Search your product..."
            aria-label="Search your product..."
            type="text"
            name="search"
            ref={searchRef}
          />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="submit">
              <i className="mdi mdi-file-find" /> Search
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
  
  {searchResults && searchResults.length > 0 ? (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            {searchResults.map((product, index) => (
              <div className="col-md-3 my-2" key={index}>
                <div className="item">
                  <div className="product">
                    <Link
                      to={{
                        pathname: `/product/${product.slug}`,
                        state: product,
                      }}
                    >
                      <div className="product-header">
                        {product.discount && (
                          <span className="badge badge-success">
                            {priceFormat(currency, product.discount)} OFF
                          </span>
                        )}
                        <img
                          className="img-fluid"
                          src={UPLOAD_URL + product.thumbnailImage}
                          alt="product"
                        />
                      </div>
                      <div className="product-body">
                      <h5>{product.name}</h5>
                      </div>
                    </Link>
                    <div className="product-footer">
                      <p className="offer-price mb-0 text-center">
                        {priceFormat(
                          currency,
                          product.priceAfterDiscount
                        )}
                        <i className="mdi mdi-tag-outline" />
                        <br />
                        <span className="regular-price">
                          {priceFormat(currency, product.price)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
    <div style={{ fontWeight: 'bold', marginTop: '-100px' }}>no products</div>
  </div>
  )}

    </>
   
    
  );
}
export default ProductSearch;
