const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    age: Joi.number().integer().required().description('Pet age'),
    colour: Joi.string().required().default('Pet colour'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }}
);

// Get all pets
router.get("/", async (req, res) => {
	const pets = await Pet.find()
	res.status(201).json(pets);
})

//delete pet
router.delete("/:id", async (req, res) => {
	try {
		await Pet.deleteOne({ _id: req.params.id })
		res.status(204).send('Pet Deleted');
	} catch {
		res.status(404)
		res.send({ error: "Pet doesn't exist!" })
	}
})
module.exports = router;