import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopBlogs } from "../../store/actions/blogAction";
import { UPLOAD_URL } from "../../config";

function TopBlogs() {
  const dispatch = useDispatch();
  let blogs = useSelector((state) => state.blog.topBlogs);
  console.log(blogs);

  useEffect(() => {
    dispatch(getTopBlogs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, dateOptions);
  };

  return (
    <div>
      <section className="blog-items section-padding">
        <div className="container" id="header-category-bk">
          <div className="section-header">
            <h5 className="heading-design-h5 mt-3 text-center">
              Top Blogs
    
            </h5>
          </div>
          <div className="row">
            {blogs &&
              blogs.length > 0 &&
              blogs.map((blog, index) => (
                <div className="col-md-4 col-12 mx-auto mb-4" key={index}>
                  <div className="card h-100">
                    <Link to={`/blog/${blog.slug}`}>
                      <img
                        className="card-img-top img-fluid"
                        src={UPLOAD_URL + blog.image}
                        alt="blog"
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{blog.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          <strong>Author:</strong> {blog.author}
                        </h6>
                        <p className="card-text">{formatDate(blog.date)}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopBlogs;
