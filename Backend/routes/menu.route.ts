import { isAuthenticated } from 'middlewares/isAuthenticated';
import { addMenu, editMenu } from 'controllers/menu.cotroller';
import  express  from 'express';
import upload from 'middlewares/multer';

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/:id").post(isAuthenticated, upload.single("image"), editMenu);

export default router;