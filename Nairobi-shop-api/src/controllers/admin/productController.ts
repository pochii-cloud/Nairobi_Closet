import { Request, Response } from "express";
import Product from "../../models/product";
import Category from "../../models/category";
import SubCategory from "../../models/subcategory";
import Brand from "../../models/brand";
import { unlinkFile } from "../../utils/file";

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const pageSize: number = Number(process.env.PAGINATION_LIMIT);
    const page: number = Number(req.query.pageNumber) || 1;

    const keyword: { name?: { $regex: string; $options: string } } = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    const count: number = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .sort({ _id: -1 })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("brand", "_id name")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();

    res.status(200).json({
      status: true,
      message: "Successfully fetched products.",
      data: {
        products,
        page,
        pages: Math.ceil(count / pageSize),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      summary,
      description,
      images,
      thumbnailImage,
      colors,
      sizes,
      category,
      subcategory,
      brand,
      price,
      discount,
      status,
      quantity,
    } = req.body;

    const dbCategory = await Category.findById(category);
    if (!dbCategory) {
      res.status(404).json({
        status: false,
        message: "Category not found.",
      });
      return;
    }

    if (subcategory) {
      const dbSubCategory = await SubCategory.findById(subcategory);
      if (!dbSubCategory) {
        res.status(404).json({
          status: false,
          message: "Sub Category not found.",
        });
        return;
      }
    }

    const dbBrand = await Brand.findById(brand);
    if (!dbBrand) {
      res.status(404).json({
        status: false,
        message: "Brand not found.",
      });
      return;
    }

    const product = await Product.create({
      name,
      summary,
      description,
      images,
      thumbnailImage,
      colors,
      sizes,
      category,
      subcategory,
      brand,
      price,
      discount,
      status,
      quantity,
    });

    const cat = await Category.findByIdAndUpdate(category?._id, {
      $push: {
        products: product,
      },
    }).select("name");

    const subCat = await SubCategory.findByIdAndUpdate(subcategory?._id, {
      $push: {
        products: product,
      },
    }).select("name");

    const brd = await Brand.findByIdAndUpdate(brand?._id, {
      $push: {
        products: product,
      },
    }).select("name");

    product.category = cat;
    product.subcategory = subCat;
    product.brand = brd;
    product.priceAfterDiscount = parseFloat(price) - parseFloat(discount ? discount : 0);

    product.save();
    res.status(201).json({
      status: true,
      message: "Product successfully added.",
      data: product,
    });
  } catch (error) {
    if (error.code === 11000) {
    res.status(409).json({
    status: false,
    message: "Product with duplicate key entry.",
    });
    } else {
    console.error(error);
    res.status(500).json({
    status: false,
    message: "Internal server error.",
    });
    }
    }
    };
    
    const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
    const {
    name,
    summary,
    description,
    images,
    thumbnailImage,
    colors,
    sizes,
    category,
    subcategory,
    brand,
    price,
    discount,
    status,
    quantity,
    } = req.body;const dbCategory = await Category.findById(category?._id);
    if (!dbCategory) {
      res.status(404).json({
        status: false,
        message: "Category not found.",
      });
      return;
    }
    
    if (subcategory) {
      const dbSubCategory = await SubCategory.findById(subcategory?._id);
      if (!dbSubCategory) {
        res.status(404).json({
          status: false,
          message: "Sub Category not found.",
        });
        return;
      }
    }
    
    const dbBrand = await Brand.findById(brand?._id);
    if (!dbBrand) {
      res.status(404).json({
        status: false,
        message: "Brand not found.",
      });
      return;
    }
    
    const priceAfterDiscount = parseFloat(price) - parseFloat(discount ? discount : 0);
    const preProduct = await Product.findById(req.params.id);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        summary,
        description,
        images,
        thumbnailImage,
        colors,
        sizes,
        category,
        subcategory,
        brand,
        price,
        priceAfterDiscount,
        discount,
        status,
        quantity,
      },
      { new: true }
    )
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("brand", "name");
    
    if (!product) {
      res.status(404).json({
        status: false,
        message: "Product not found.",
      });
      return;
    }
    
    if (preProduct?.category !== product?.category._id) {
      await Category.findByIdAndUpdate(preProduct?.category, {
        $pull: {
          products: product._id,
        },
      });
    
      await Category.findByIdAndUpdate(product?.category._id, {
        $push: {
          products: product._id,
        },
      });
    }
    
    if (subcategory) {
      if (preProduct?.subcategory !== product?.subcategory._id) {
        await SubCategory.findByIdAndUpdate(preProduct?.subcategory, {
          $pull: {
            products: product._id,
          },
        });
    
        await SubCategory.findByIdAndUpdate(product?.subcategory._id, {
          $push: {
            products: product._id,
          },
        });
      }
    }
    
    if (preProduct?.brand !== product?.brand._id) {
      await Brand.findByIdAndUpdate(preProduct?.brand, {
        $pull: {
          products: product._id,
        },
      });
    
      await Brand.findByIdAndUpdate(product?.brand._id, {
        $push: {
          products: product._id,
        },
      });
    }
    
    res.status(200).json({
      status: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
try {
const product = await Product.findById(req.params.id);
if (!product) {
res.status(404).json({
status: false,
message: "Product not found.",
});
return;
}await Category.findByIdAndUpdate(product.category, {
  $pull: {
    products: product._id,
  },
});

if (product.subcategory) {
  await SubCategory.findByIdAndUpdate(product.subcategory, {
    $pull: {
      products: product._id,
    },
  });
}

await Brand.findByIdAndUpdate(product.brand, {
  $pull: {
    products: product._id,
  },
});

if (product.images && product.images.length > 0) {
  product.images.forEach((image) => {
    unlinkFile(image);
  });
}

await product.remove();

res.status(200).json({
  status: true,
  message: "Product deleted successfully.",
});
} catch (error) {
  console.error(error);
  res.status(500).json({
  status: false,
  message: "Internal server error.",
  });
  }
  };
  
  export = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
            