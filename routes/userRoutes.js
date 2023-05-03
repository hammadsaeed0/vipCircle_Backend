import express from "express";
import { AddPhoneNumber, AddProfileDetail, WhoIam, Interests, PersonlDetail, Hobbies, LikeProfile, LikedProfile } from "../controller/userController.js";

const router = express.Router();

router.route("/AddPhoneNumber").post(AddPhoneNumber);
router.route("/AddProfileDetail/:id").post(AddProfileDetail);
router.route("/WhoIam/:id").post(WhoIam);
router.route("/Interests/:id").post(Interests);
router.route("/PersonlDetail/:id").post(PersonlDetail);
router.route("/Hobbies/:id").post(Hobbies);
router.route("/LikeProfile/:id").post(LikeProfile);
router.route("/LikedProfile/:id").post(LikedProfile);

export default router;
