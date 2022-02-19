const express = require('express');
const router = express.Router();
const { addDoctor, getAllDoctors, deleteDoctor, getDoctorByID } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect,addDoctor);
router.route('/').get(protect,getAllDoctors);
router.route('/:id').get(protect,getDoctorByID)
router.route('/:id').delete(protect,deleteDoctor);

module.exports = router;