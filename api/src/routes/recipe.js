const express = require("express");
const router = express.Router();
const { Recipe, Diet } = require("../db.js");

//RUTA POST RECIPES
router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      summary,
      type,
      healthScore,
      steps,
      image,
      createInDb,
      diets,
    } = req.body;

    const createRecipe = await Recipe.create({
      name,
      summary,
      type,
      healthScore: parseInt(healthScore),
      steps,
      image,
      createInDb,
    });

    /* const dietInDb = await Diet.findAll({
      where: {
        name: diets,
      },
    }); */

    /* diets.forEach(async (r) => {
        await createRecipe.addDiet(r.id)
      })
      return res.status(200).send(createRecipe);
    }
    return res.status(400).send({ message: "Name is required" }); 
    
    createRecipe ? res.json(createRecipe) : res.send("No hay data"); */
    //PROBAR CUANDO ESTE LISTO EL FRONT
    console.log(diets);
    diets.map(async (e) => {
      try {
        const dietInDb = await Diet.findOne({
          where: {
            name: e,
          },
        });
        await createRecipe.addDiet(dietInDb.id);

      } catch (error) {
        console.log(error)
        next(error)
      }
      res.send("Bien !!!");
      
    });
    

    /* if (!name) return res.status(400).send("Nombre Obligatorio !!!");
    if (!summary)
      return res.status(400).send("La receta debe tener un resumen.");

    await createRecipe.addDiet(dietInDb);
    res.status(200).json("Creada exitosamente."); */

  } catch (error) {
    console.log(error);
    next(error);
  }
});

//PROBAR CUANDO ESTE LISTO EL FRONT
router.get("/", async (req, res, next) => {
  try {
    const diets = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    diets.length
      ? res.status(200).json(diets)
      : res.send("No existe informacion !!!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
