const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');
const asyncWrapper = require('../utils/asyncWrapper');

router.get('/', auth, asyncWrapper(taskController.getTasks));
router.post('/', auth, asyncWrapper(taskController.createTask));
router.put('/', auth, asyncWrapper(taskController.updateTask))
router.delete('/', auth, asyncWrapper(taskController.deleteTask))

module.exports = router;
