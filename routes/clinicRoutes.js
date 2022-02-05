const express = require('express');
const router = express.Router();
const { authClinic, getAllClinics, registerClinic, getClinicProfile, deleteClinic } = require('../controllers/clinicController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAllClinics);
router.route('/').post(registerClinic);
router.route('/login').post(authClinic);
router.route('/:id').get(protect,getClinicProfile);
router.route('/:id').delete(protect,deleteClinic);

module.exports = router;