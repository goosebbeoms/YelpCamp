const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');  // index는 입력하지 않아도 폴더에서 자동으로 index.js를 찾음
const upload = multer({ storage });

// /campgrounds/new가 /:id보다 위에 위치해야 한다.
// 반대의 경우 'new'가 'id'로 인식되어, id가 new인 캠핑장을 :id 라우트에서 찾게 된다.

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.single('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;