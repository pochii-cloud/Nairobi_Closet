import React, { useEffect } from "react";
import "./index.css";
import "./c.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastObjects } from "../../../utils/toast/toastObject";
import homeServices from "../../../services/homeServices";
import { UPLOAD_URL } from "../../../config";
import { Link } from "react-router-dom";
function CategoryName() {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.home.categories);
  if (categories.length > 0) {
    categories = categories.slice(0, 4);
  }
  useEffect(() => {
    const getCategories = async () => {
      try {
        await homeServices.getHomeCategories(dispatch);
      } catch (e) {
        toast.error(e.message, ToastObjects);
      }
    };
    getCategories();
  }, [dispatch]);
  return (

        <div className="row ">
          <ul>
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <li className="col-12 col-md-3 " key={index}>
                  <h5>
                    <Link
                      to={{
                        pathname: `/category/${category.slug}`,
                        state: category,
                      }}
                    >
                      {category.name}
                    </Link>
                  </h5>
                </li>
            ))}
            </ul>
       </div>
  );
}

export default CategoryName;
