const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground'); 
const { serializeUser } = require('passport');
const { campgroundSchema } = require('../schemas');


 router.get('/', async (req, res) => {
    // console.log()
   let campgrounds = await Campground.find({}).populate('text');
    if(req.query.search){
       console.log(req.query.search)       
        campgrounds = campgrounds.filter(camp => camp.title.includes(req.query.search));
        res.render('campgrounds/index', {campgrounds}); 
    } else {
   
     res.render('campgrounds/index', {campgrounds});          
    }

 });

 router.route('/')  
//     .get(catchAsync(campgrounds.index))     
 
  .post(upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCampground))

module.exports = router;