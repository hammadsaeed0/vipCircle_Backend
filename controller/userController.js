import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../model/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

export const uploadVideos = upload.single("video");

cloudinary.v2.config({
  cloud_name: "ddu4sybue",
  api_key: "658491673268817",
  api_secret: "w35Ei6uCvbOcaN4moWBKL3BmW4Q",
});

// Add User Phone Number
export const AddPhoneNumber = catchAsyncError(async (req, res, next) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return next(new ErrorHandler("Please Add your phoneNumber", 409));
  const existingUser = await User.findOne({ phoneNumber });
  if (existingUser)
    return next(new ErrorHandler("Number Already Present", 409));
  const newUser = await User.create({ phoneNumber });
  sendToken(res, newUser, "User Register", 201);
});

// Add User Basic Profile Data
export const AddProfileDetail = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { name, dateOfBirth , public_id , url } = req.body;
  if (!name) {
    return res.status(404).json({ message: "Enter the Name" });
  }

  if (!dateOfBirth) {
    return res.status(404).json({ message: "Enter date of Birth" });
  }
  user.dateOfBirth = dateOfBirth;
  user.name = name;
  // user.gallery.push(...public_id)
  public_id.forEach((item) => {
    user.gallery.push(item);
  });
  try {
    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating user profile" });
  }
});
// Add User Images
export const uploadImage = async (req, res, next) => {
  let images = [];
  if (req.files && req.files.avatars) {
    if (!Array.isArray(req.files.avatars)) {
      images.push(req.files.avatars);
    } else {
      images = req.files.avatars;
    }
  }
  let responce = []
  for (const image of images) {
    try {
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath);
       const publidId = result.public_id
      const url = result.url
      let data = {
        publidId,
        url
      }
    //  console.log(data);
    responce.push(data)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error uploading images" });
    }

  }
    // console.log("-->1",responce);
    res.send(responce)

};
// Add User Video
export const uploadVideo = async (req, res, next) => {
  if (!req.files || !req.files.video) {
    return res.status(400).json({ error: "No video file provided" });
  }

  let responce = []

  try {
    const videoFile = req.files.video;
    const result = await cloudinary.v2.uploader.upload(videoFile.tempFilePath, {
      resource_type: "video",
    });
    const publidId = result.public_id
    const url = result.url
    let data = {
      publidId,
      url
    }
    responce.push(data)
    res.send(responce)
  } catch (error) {
    return res.status(500).json({ error: "Error uploading video" });
  }
};

// Add User Related Data
export const WhoIam = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { whoIam } = req.body;
  if (!whoIam) return res.status(404).json({ message: "Please Select Gender" });
  user.whoIam = whoIam;
  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// Add User  Interest
export const Interests = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { interests } = req.body;
  if (!interests)
    return res.status(404).json({ message: "Please Select Interest" });
  user.interests = interests;
  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// Add User Personal Detail
export const PersonlDetail = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { height, country, intro , video , match} = req.body;
  if (!height) return res.status(404).json({ message: "Please Select Height" });
  if (!country)
    return res.status(404).json({ message: "Please Select Country" });

  if (!intro)
    return res
      .status(404)
      .json({ message: "Please Write Something About you" });

  user.height = height;
  user.country = country;
  user.intro = intro;
  user.idealMatch = match;
  if(video){
 
  video.forEach((item) => {
    user.gallery.push(item);
  });
 }

  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// Add User  Hobbies
export const Hobbies = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { hobbies } = req.body;
  if (!hobbies)
    return res.status(404).json({ message: "Please Select Hobbies" });
  user.hobbies = hobbies;
  const updatedUser = await user.save();
  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// Add User  Like
export const LikeProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const likedUserId = req.body.liked;
  const likedUser = await User.findById(likedUserId);
  if (!likedUser)
    return res.status(404).json({ message: "Liked user not found" });
  if (user.liked.includes(likedUserId))
    return res.status(404).json({ message: "User already liked this profile" });
  const isMatched = likedUser.liked.includes(id);
  user.liked.push(likedUserId);
  await user.save();
  if (isMatched) {
    //   user.isMatched.push(likedUserId);
    //   console.log(likedUserId);
    //   likedUser.isMatched.push(id);e
    //   console.log(id);
    //   await user.save();
    //   await likedUser.save();
    return res.status(200).json({
      success: true,
      message: "Match found",
      data: { match: likedUserId },
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "User liked successfully",
      data: { likedUser: likedUserId },
    });
  }
});

// All Liked Profile
export const LikedProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.liked.length === 0) {
    return res.status(404).json({ message: "No likes found" });
  }
  const likedIds = user.liked;
  const profiles = await Promise.all(likedIds.map((id) => User.findById(id)));
  res.status(200).json({
    success: true,
    data: profiles,
  });
});

// Delete  Profile
export const DeleteProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const deletedProfile = await User.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: deletedProfile,
    message: "User Delete Successfully",
  });
});

// Show  Profile
export const ShowProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.find()
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({
    success: true,
    data: user,
  });
});

