const { Router } = require("express");
const { getAllDiets } = require("../controllers/index");

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    const getDiets = await getAllDiets()
    res.json(getDiets)

  } catch (error) {
    next(error)
  }
});


module.exports = router;