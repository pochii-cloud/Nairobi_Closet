import { Router } from "express";
import homeController from "../../../controllers/home/homeController";
const router = Router();

router.get("/sliders", homeController.getSliders);

router.get("/categories", homeController.getCategories);
router.get("/category/:slug",homeController.getCategoryBySlug);
router.get("/category/:id",homeController.getCategoryByID);




router.get("/brands", homeController.getBrands);

router.get('/top-products', homeController.getTopProducts);

router.get("/general-settings", homeController.generalSettings);
router.get("/product/search",homeController.searchProduct);
router.get("/product/details/:slug", homeController.getProductDetails);
router.get("/product/id/:id", homeController.getProductByID);


router.get("/blog/:slug", homeController.getBlogBySlug);
router.get("/blog", homeController.getAllBlogs);



router.get("/product-by-category/:slug",homeController.getProductsByCatSlug);



export default router;
