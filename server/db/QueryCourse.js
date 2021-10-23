const table_name = "course_table";
const createCourseTable = () => {
  return `CREATE TABLE IF NOT EXISTS ${table_name}(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(250) NOT NULL,
    thumbnail TEXT DEFAULT NULL
    status BOOLEAN  DEFAULT 0
  )`;
};
const showAllCourse = () => {
  return `SELECT *  FROM ${table_name}`;
};
const addCourse = (data, thumbnail = NULL) => {
  const { title, status } = data;
  return `INSERT INTO ${table_name}(title,thumbnail,status) VALUES("${title}","${thumbnail}","${status}")`;
};
const removeCourse = (id) => {
  return `DELETE FROM ${table_name} WHERE id=${id};`;
};
const updateStatus = (id, status) => {
  return `UPDATE ${table_name} SET status =${status} WHERE id=${id} `;
};
const updateCourse = (id, data, thumbnail) => {
  //   const id = id;
  const { title, status } = data;
  return `UPDATE ${table_name} SET status="${status}",title="${title}",thumbnail="${thumbnail}" WHERE id="${id}" `;
};
const showCourseInUpdateForm = (id) => {
  return `SELECT * FROM ${table_name} WHERE id=${id}`;
};

module.exports = {
  createCourseTable,
  showAllCourse,
  addCourse,
  removeCourse,
  updateStatus,
  updateCourse,
  showCourseInUpdateForm,
};
