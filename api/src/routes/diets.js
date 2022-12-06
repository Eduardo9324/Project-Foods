const { Router } = require("express");
const { getAllDiets } = require("../controllers/index");

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    const getDiets = await getAllDiets()
    getDiets.length > 0 ? res.json(getDiets) : res.status(400).send("No hay dietas.");

  } catch (error) {
    next(error)
  }
});


module.exports = router;