const express = require('express');
const { enrollCourse, getMyCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/:courseId', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses);

module.exports = router;
