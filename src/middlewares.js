import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Webtube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  fileFilter: function (req, file, cb) {
    if (file.mimetype.includes("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  dest: "uploads/avatars/",
  //Byte
  limits: { fileSize: 3000000 },
});

export const videoUpload = multer({
  fileFilter: function (req, file, cb) {
    if (
      (file.fieldname === "video" && file.mimetype.includes("video/")) ||
      (file.fieldname === "thumb" && file.mimetype.includes("image/"))
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  dest: "uploads/videos/",
  //Byte
  limits: { fileSize: 10000000 },
});
