const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one employee by ID
router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).send('Employee not found');
    res.json(emp);
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

// POST new employee (fixed with error handling)
router.post('/', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error('POST /employees error:', err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Employee not found');
    res.send('Employee deleted');
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

module.exports = router;
