const express = require('express');
const { addDiagnosisHistory, getPatientHistoryById, getPatientHistoryByDoctor } = require('../controllers/historyController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.route('/:patientId/:doctorId').post(addDiagnosisHistory);
router.route('/:id').get(getPatientHistoryById);
router.route('/doctor/:id').get(getPatientHistoryByDoctor);

module.exports = router;

