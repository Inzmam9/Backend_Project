import { Router } from "express";
import {getChannel, userRegister, watchHistorty} from "../controllers/user.controlers.js";
import{upload} from "../middlewares/multer.middleware.js"
import {userLogin,userLogOut,createNewRefreshToken,changeCurrentPassword,changeAvatar} from "../controllers/user.controlers.js";
import { authorization } from "../middlewares/authorizatoin.middleware.js";
const router=Router()
router.route("/register").post(upload.fields([{
name:"avatar",
maxCount : 1,

},
{
    name: "coverImage",
    maxCount: 1,
}

]),userRegister)

router.route("/login").post(userLogin)
router.route("/logout").post(authorization, userLogOut)
router.route("/refresh-token").post(createNewRefreshToken)
router.route("/change-password").post(authorization,changeCurrentPassword)
router.route("/change-avatar").post(authorization,upload.single("newAvatar"),changeAvatar)
router.route("/c/:get-channel").get(getChannel)
router.route("/watch-history").post(authorization,watchHistorty)
export default router
