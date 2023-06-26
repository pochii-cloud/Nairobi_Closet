import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import http from "../../services/api";
import { toast } from "react-toastify";
import { ToastObjects } from "../../utils/toast/toastObject";
import "./index.css";
import parse from "html-react-parser";
import { UPLOAD_URL } from "../../config";

function SingleBlog() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const getBlogBySlug = async () => {
      try {
        const { data } = await http.get(`/api/v1/home/blog/${slug}`);
        setBlog(data);
      } catch (error) {
        toast.error("Something went wrong.", ToastObjects);
      }
    };
    getBlogBySlug();
  }, [slug]);

  const formatDate = (dateString) => {
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, dateOptions);
  };

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-blog-header-bk">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/">
                <strong>
                  <span className="mdi mdi-home" /> Home
                </strong>
              </Link>{" "}
              <span className="mdi mdi-chevron-right" />{" "}
              <a href="#">{blog && blog.title}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="single-blog section-padding pt-3">
        <div className="container">
          {blog ? (
            <div className="row">
              <div className="col-md-12">
                <div className="single-blog-content">
                  <h2 className="text-center mb-4">{blog.title}</h2>
                  <div className="text-center mb-4">
                    <img
                      src={UPLOAD_URL + blog.image}
                      alt="Blog Image"
                      className="img-fluid"
                      style={{ maxHeight: "300px", maxWidth: "100%" }}
                    />
                  </div>
                  <div className="blog-body">
                    <div className="equal-line-width">
                      {typeof blog.description === "string"
                        ? parse(blog.description)
                        : null}
                    </div>
                  </div>
                  <p className="blog-author-date text-center mt-4">
                    Published on: {formatDate(blog.date)} | Author: {blog.author}
                  </p>
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

export default SingleBlog;
