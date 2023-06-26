import {Router} from 'express';
import blogController from '../../../controllers/admin/blogController';
import adminValidator from '../../../middlewares/validator/adminValidators';
import {validate} from '../../../middlewares/index'
const router = Router();

router.get("/blogs",blogController.getBlogs);
router.post("/blog", adminValidator.addBlogValidator,validate,blogController.addBlog);
router.patch("/blog/:id", adminValidator.addBlogValidator,validate,blogController.updateBlog);
router.delete("/blog/:id", blogController.deleteBlog);
export default router;