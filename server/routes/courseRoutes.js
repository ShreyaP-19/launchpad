const express = require('express');
const { getCourses, createCourse, deleteCourse } = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(getCourses).post(protect, admin, createCourse);
router.route('/:id').delete(protect, admin, deleteCourse);

module.exports = router;
