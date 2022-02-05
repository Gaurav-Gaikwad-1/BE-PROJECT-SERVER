const express = require('express');
const router = express.Router();
const { addDoctor, getAllDoctors, deleteDoctor } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect,addDoctor);
router.route('/').get(protect,getAllDoctors);
router.route('/:id').delete(protect,deleteDoctor);

module.exports = router;