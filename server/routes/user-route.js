const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { isAuthenticated } = require('../controllers/auth-controller.js');

router.get('/goals', isAuthenticated, userController.getGoals);
router.put('/goals', isAuthenticated, userController.updateGoals);
router.get('/daily-food', isAuthenticated, userController.getDailyFood);
router.post('/daily-food', isAuthenticated, userController.addDailyFood);
router.delete('/daily-food/:id', isAuthenticated, userController.removeDailyFood);
router.get('/total-daily-food', isAuthenticated, userController.getTotalDailyFood);

module.exports = router;