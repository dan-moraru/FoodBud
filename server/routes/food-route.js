const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food-controller');
const { isAuthenticated } = require('../controllers/auth-controller.js');

router.get('/specific-food/:foodId', foodController.getFood);
router.get('/all-foods', foodController.getFoods);
router.get('/custom-all-foods', isAuthenticated, foodController.getFoodsCustom);
router.post('/total-foods', foodController.getTotalNutrition);
router.post('/custom-food', isAuthenticated, foodController.insertFoodCustom);
router.put('/custom-food/:foodName', isAuthenticated, foodController.updateFoodCustom);
router.delete('/custom-food/:foodName', isAuthenticated, foodController.deleteFoodCustom);

module.exports = router;