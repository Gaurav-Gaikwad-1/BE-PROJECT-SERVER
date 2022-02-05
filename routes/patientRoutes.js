const express = require('express');
const router = express.Router();
const { addPatient, getAllPatients, deletePatient } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect,addPatient);
router.route('/').get(protect,getAllPatients);
router.route('/:id').delete(protect,deletePatient);

module.exports = router;