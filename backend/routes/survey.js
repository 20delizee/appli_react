const express = require('express');
const router = express.Router();

const surveyCtrl = require('../controllers/survey');
const auth = require('../middleware/auth')

router.get('/',  surveyCtrl.getAllSurvey);
router.post('/create', surveyCtrl.createSurvey);
router.get('/:id',  surveyCtrl.getOneSurvey);
router.put('/modify:id',  surveyCtrl.modifySurvey);
router.delete('/delete:id',  surveyCtrl.deleteSurvey);

module.exports = router;