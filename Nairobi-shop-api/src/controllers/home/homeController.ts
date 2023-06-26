import { Request, Response } from "express";
import Brand from "../../models/brand";
import Category from "../../models/category";
import Product from "../../models/product";
import Settings from "../../models/settings";
import Slider from "../../models/slider";
import Blog from "../../models/blogModel"; 
import Order from "../../models/order";
import jwt from 'jsonwebtoken'

const getSliders = async (req: Request, res: Response): Promise<void> => {
  try {
    const sliders = await Slider.find({ status: "active" }).sort({ _id: -1 });
    res.status(200).send({
      status: true,
      data: sliders,
      message: "Successfully retrieved all sliders.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on slider.",
    });
  }
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ status: "active" }).sort({
      _id: -1,
    });
    res.status(200).send({
      status: true,
      data: categories,
      message: "Successfully retrieved all categories.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on categories.",
    });
  }
};

const getCategoryByID = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.status(200).send({
      status: true,
      data: category,
      message: "Successfully retrieved category.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on categories.",
    });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const productIds = category.products;

    const productDetailsArray = await Product.find({ _id: { $in: productIds } });

    res.status(200).send({
      status: true,
      data: productDetailsArray,
      message: "Successfully retrieved category from the database.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong retrieving the category by slug.",
    });
  }
};






const getBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brands = await Brand.find({ status: "active" }).sort({ _id: -1 });
    res.status(200).send({
      status: true,
      data: brands,
      message: "Successfully retrieved all brands.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on brands.",
    });
  }
};

const getTopProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const topProducts = await Product.find({ status: "active" }).sort({
      _id: -1,
    });
    res.status(200).send({
      status: true,
      data: topProducts,
      message: "Successfully retrieved all products.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on products.",
    });
  }
};

// Get Products by CategoryID
const getProductsByCatSlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({
      status: "active",
      category: req.params.slug,
    })
      .sort({ id: -1 })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("brand", "_id name")
      .lean();
    res.status(200).json({
      status: true,
      message: "successfully fetched the products based on category",
      data: products,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: "Something went wrong.",
    });
  }
};

const generalSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await Settings.findOne();
    res.status(200).send({
      status: true,
      data: settings,
      message: "Successfully retrieved all settings.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong on settings.",
    });
  }
};

const getProductDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("brand", "_id name")
      .lean();
    res.status(200).send({
      status: true,
      data: product,
      message: "Successfully fetched product.",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong.",
    });
  }
};


const getProductByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("brand", "_id name")
      .lean();
    res.status(200).send({
      status: true,
      data: product,
      message: "Successfully fetched product.",
    });

  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong.",
    });
  }
};







//searches the product from db
const searchProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchQuery = req.query.search;

    const product = await Product.find({
      name: { $regex: searchQuery, $options: "i" }, // Case-insensitive search on the "name" field
    })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("brand", "_id name")
      .lean();
      

      res.status(200).json({product});

  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong.",
    });
  }
};





const getBlogByID = async (req: Request, res: Response): Promise<void> => {
  try {
  const blog = await Blog.findOne({ _id: req.params.id });
  res.status(200).send({
  status: true,
  data: blog,
  message: "Successfully retrieved blog.",
  });
  } catch (error) {
  res.status(400).send({
  status: false,
  message: "Something went wrong on blogs.",
  });
  }
  };
  const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const slug = req.params.slug; // Extract the slug from the request parameters
      const blog = await Blog.findOne({ slug }); // Use the extracted slug in the query
  
      if (blog) {
        res.status(200).send({
          status: true,
          data: blog,
          message: "Successfully retrieved blog.",
        });
      } else {
        res.status(404).send({
          status: false,
          message: "Blog not found.",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Something went wrong while retrieving the blog.",
      });
    }
  };
  
  const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const blogs = await Blog.find().sort({ _id: -1 });
      res.status(200).send({
        status: true,
        data: blogs,
        message: "Successfully retrieved all blogs.",
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "Something went wrong on blogs.",
      });
    }
  };


  
 
  
  

  
  export = {
    getSliders,
    getCategories,
    getCategoryByID,
    getCategoryBySlug,
    getBrands,
    generalSettings,
    getTopProducts,
    getProductDetails,
    getProductByID,
    getProductsByCatSlug ,
    searchProduct,
    getBlogByID,
    getBlogBySlug,
    getAllBlogs,
  };