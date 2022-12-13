/* require("dotenv").config(); */
/* const axios = require('axios'); */
/* const express = require('express'); */
const { Router } = require("express");
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');
/* const { API_KEY } = process.env; */
const router = Router();

const { getAllInfo, getById, getIdByDb } = require("../controllers/index");


//OBTIENE DATA DE LA API - QUERY 
router.get('/', async (req, res, next) => {
  const { name } = req.query;

  try {
    const infoRecipes = await getAllInfo();
    if (name) {
      const nameFood = await infoRecipes.filter((el) =>
        el.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      nameFood.length ? res.status(200).json(nameFood) : res.status(400).send('Receta no encontrada !!!')
    } else {
      res.status(200).json(infoRecipes)
    }

  } catch (error) {
    next(error)
  }
});



//RURA ID 
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
  try {
    if (regex.test(id)) {
      const dbId = await getIdByDb(id);
      return res.json(dbId);
    } else {
      const apiId = await getById(id);
      return res.json(apiId);
    }
    
  } catch (error) {
    next(error)
  }
});



router.post("/", async (req, res, next) => {
  try {
    const { name, summary, type, healthScore, steps, image, createInDb, diets } = req.body;

    const createRecipe = await Recipe.create({
      name,
      summary,
      type,
      healthScore,
      steps,
      image,
      createInDb,
    })


    await createRecipe.addDiet(diets)
    res.send("Todo Bien !!!");

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DEBO REALIZAR RURA DE PUT Y DELETE
/* router.delete("/", async (req, res, next) => {
  const { id } = req.params
  let ids = []
  try {
    if (!id) {
      res.send("No hay id !!! ")
    } else {
      const idDelete = ids.find((p) => p.id === id)
    }

    if()
  } catch (error) {
    console.log(error)
    next(error)
  }
}) */



module.exports = router;