const router = require("express").Router();
const thumbnailMiddleware = require("../utils/thumbnailMiddlware");
const courseController = require("../controllers/Coursecontroller");
const upload = require("../utils/thumbnailMiddlware");
router.get("/all-course", courseController.showCourse);
router.post(
  "/add-course",
  upload.single("thumbnail"),
  courseController.addCourse,
  (err, req, res, next) => {
    return res.send({
      success: false,
      message: "Thumbnail Not Uploadded",
      err: err.message,
    });
  }
);
router.delete("/:id", courseController.deleteCourse);
router.patch("/:status/:id", courseController.updateStatus);
router.get("/modi/:id", courseController.showCourseInUpdateForm);
router.patch(
  "/modi",
  upload.single("thumbnail"),
  courseController.updateCourse,
  (err, req, res, next) => {
    return res.send({
      success: false,
      message: "Thumbnail Not Uploadded",
      err: err.message,
    });
  }
);

module.exports = router;
