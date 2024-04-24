const express = require('express');
const router = express.Router();

const StudentsController = require('../src/controllers/StudentsControllers');

router.get('/students', StudentsController.getAll);
router.post('/insert', StudentsController.insertStudent);
router.post('/edit', StudentsController.editStudent);
router.post('/remove', StudentsController.removeStudent);

module.exports = router;