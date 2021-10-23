const con = require("../db/connection");
// const path = require("path");
const sharp = require("sharp");
const Query = require("../db/QueryCourse");
const { patch } = require("../routes/Coureseroue");
// const path = "C:Users\\lcom\\Desktop\\Fullstack\\server\\thumbnails\\";
//add new course
const addCourse = async (req, res) => {
  try {
    //return res.send(req.file.path);
    if (req.body.title === "")
      return res.send({ message: "Title Field is Required..." });
    let thumbnail = "";
    if (req.file) {
      thumbnail = req.file.filename;
    }
    // return res.send(thumbnail);
    let sql = Query.addCourse(req.body, thumbnail);
    con.query(sql, (err, result) => {
      if (err)
        return res.send({
          message: "Something Went Wrong in Add Course...",
          err,
        });
      if (!result) return res.send({ message: "Course Not Added..", result });
      return res.send({ message: "Course Added..", result });
    });
  } catch (err) {
    return res.send({ message: "Error in Add Course...", err: err.message });
  }
};
//show all course
const showCourse = (req, res) => {
  try {
    let sql = Query.showAllCourse();
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) res.send({ message: "No Course To display..." });
      return res.send({ result });
    });
  } catch (err) {
    return res.send({
      message: "Error in Display Course...",
      err: err.message,
    });
  }
};
//delete course
const deleteCourse = (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.send({ message: "No product Selected" });
    let sql = Query.removeCourse(id);
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (!result) return res.send({ message: "Course Not Deleted..." });
      if (result.affectedRows === 0)
        return res.send({ message: "Course Not Found..." });
      return res.send({ message: "Course Deleted" });
    });
  } catch (err) {
    return res.send({
      message: "Error in Delete Course...",
      err: err.message,
    });
  }
};
//update status of course (publish or draft)
const updateStatus = (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.send({ message: "No product Selected" });
    const status = req.params.status;
    let sql = Query.updateStatus(id, status);
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (!result) return res.send({ message: "Status Not Updated..." });
      if (result.affectedRows === 0)
        return res.send({ message: "Course Not Found..." });
      return res.send({ message: "Status Updated" });
    });
  } catch (err) {
    return res.send({
      message: "Error in Update Status...",
      err: err.message,
    });
  }
};
//display course in  update form
const showCourseInUpdateForm = (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.send({ message: "No product Selected" });
    let sql = Query.showCourseInUpdateForm(id);
    con.query(sql, (err, result) => {
      if (err)
        return res.send({
          message: "Something Went Wrong in Update Course...",
        });
      if (!result || result.length === 0)
        return res.send({ message: "Course Not Updated.." });

      return res.send({ message: "Course for Update..", result });
    });
  } catch (err) {
    return res.send({
      message: "Error in Update Course...",
      err: err.message,
    });
  }
};
//update course detail
const updateCourse = async (req, res) => {
  try {
    // return res.send(req);
    const id = req.body.id;
    if (!id) return res.send({ message: "No product Selected" });
    if (req.body.title === "")
      return res.send({ message: "Title Field is Required..." });
    let thumbnail = "";
    if (req.file) {
      thumbnail = req.file.filename;
    }
    let sql = Query.updateCourse(id, req.body, thumbnail);
    con.query(sql, (err, result) => {
      if (err)
        return res.send({
          message: "Something Went Wrong in Update Course...",
          err,
        });
      if (result.affectedRows === 0)
        return res.send({ message: "Course Not Found..." });
      if (!result) return res.send({ message: "Course Not Updated..", result });
      return res.send({ message: "Course Updated..", result });
    });
  } catch (err) {
    return res.send({
      message: "Error in Update Course...",
      err: err.message,
    });
  }
};
module.exports = {
  showCourse,
  addCourse,
  deleteCourse,
  updateStatus,
  updateCourse,
  showCourseInUpdateForm,
};
