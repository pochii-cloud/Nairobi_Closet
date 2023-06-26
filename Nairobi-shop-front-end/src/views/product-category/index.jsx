import React, { useState, useEffect } from "react";
import FilterCategorySidebar from "./FilterSidebar";
import "./index.css";
import { useMatch, Link, useParams } from "react-router-dom";
import http from "../../services/api";
import { UPLOAD_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { priceFormat } from "../../utils/helper";
import { addToCart } from "../../store/actions/cartActions";
function ProductCategory() {
    const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState();
  const [filters,setFilters]=useState({});
  const [sort,setSort]=useState('newest')
  const [catId, setCatId] = useState();
  const {slug}=useParams();
  const match = useMatch("category/:slug");
  const currency = useSelector((state) => state.home.settings).symbol;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    setFilteredProducts(
        products.filter((item)=>
        Object.entries(filters).every(([key,value])=>
        item[key].includes(value)))
    )
  },[products,filters])
  useEffect(() => {
     const getCategory = async () => {
      try {
        const res = await http.get(`/api/v1/home/category/${slug}`);
        setProducts(res.data)
        setCategory(slug)
        setLoading(false)

        
      } catch (e) {
        console.error(e);
        setLoading(false)
      }
    };
    getCategory();
  }, [slug]);
  
  const handleFilter=(e)=>{
    const value = e.target.value;
    setFilters({
        ...filters,
        [e.target.name]:value.toLowerCase()
    });
  }
useEffect(() => {
    if(sort==="newest"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.createdAt - b.createdAt)
        )
    }
    if(sort==="priceAsc"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.priceAfterDiscount - b.priceAfterDiscount)
        )
    }
    
    if(sort==="priceDec"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>b.priceAfterDiscount - a.priceAfterDiscount)
        )
    }
    if(sort==="alphaAsc"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.title > b.title ? 1 : -1)
        )
    }
    if(sort==="alphaDesc"){
        setFilteredProducts((prev)=>
        [...products].sort((a,b)=>a.title > b.title ? -1 : 1)
        )
    }
},[sort,products])
  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
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
              <Link to="#">{category && category}</Link>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* All product */}
      <div className="all-product-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-top-dt">
                <div className="product-left-title">
                  <h2>All Products</h2>
                </div>
                {/* <FilterCategorySidebar /> */}
                <div className="product-sort">
                  <select className="form-control" onChange={(e)=>setSort(e.target.value)}>
                    <option className="item" value="">
                      Sort by Products
                    </option>
                    <option className="item" value="priceAsc">
                      Price - Low to High
                    </option>
                    <option className="item" value="priceDec">
                      Price - High to Low
                    </option>
                    <option className="item" value="alphaAsc">
                      Alphabetical Ascending
                    </option>
                    
                    <option className="item" value="alphaDesc">
                      Alphabetical descending
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End product */}
      {/* product section */}
      <section className="shop-list section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">

              

              {loading ? (
        <p>Loading...</p>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.slice(0, 8).map((product, index) => (
         console.log(product),
          <div className="col-md-3" key={index}>
            <div className="item">
              <div className="product my-1">
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
                    {priceFormat(currency, product.priceAfterDiscount)}
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
        ))
      ) : (
        <p>No products in this category</p>
      )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* end product section */}
    </div>
  );
}

export default ProductCategory;