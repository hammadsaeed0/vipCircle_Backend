import express from "express";
import { AddPhoneNumber, ShowProfile,  WhoIam, Interests, PersonlDetail, Hobbies, LikeProfile, LikedProfile, DeleteProfile ,uploadImage , AddProfileDetail , uploadVideo, ShowSingleProfile, login} from "../controller/userController.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.route("/AddPhoneNumber").post(AddPhoneNumber);
router.route("/login").post(login);
router.route("/ShowProfile").get(ShowProfile);
router.route("/ShowSingleProfile/:id").post(ShowSingleProfile);
router.route("/AddProfileDetail/:id").post(AddProfileDetail);
router.route("/WhoIam/:id").post(WhoIam);
router.route("/uploadImage" , upload.array('avatars')).post(uploadImage);
router.route("/uploadVideo").post(uploadVideo);
router.route("/Interests/:id").post(Interests);
router.route("/PersonlDetail/:id").post(PersonlDetail);
router.route("/Hobbies/:id").post(Hobbies);
router.route("/LikeProfile/:id").post(LikeProfile);
router.route("/LikedProfile/:id").post(LikedProfile);
router.route("/DeleteProfile/:id").post(DeleteProfile);

export default router;
