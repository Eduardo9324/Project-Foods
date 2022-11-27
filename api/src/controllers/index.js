require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const food = require("../dbFood.js");

//OBTENER DATA DE LA API
const getInfoApi = async () => {
  /* const getInfoFood = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100` 
  ); */
  const getInfoFood = food;
  try {
    const allInfoFood = await getInfoFood./* data. */results.map((e) => ({
      id: e.id,
      name: e.title,
      image: e.image,
      type: e.dishTypes,
      diets: e.diets.map((h) => {
        return { name: h };
      }),
      summary: e.summary.replace(/(<([^>]+)>)/gi, ""),
      healthScore: e.healthScore,
      steps: e.analyzedInstructions.map((f) =>
        f.steps.map((g) => g.step).join(" ")
      ),
    }));

    return allInfoFood;

  } catch (error) {
    console.log(error)
    return ({ error: "No se encontro la receta !!!" })
  }
};

//OBTENER DATA DE LA DB
const getInfoByDb = async () => {
  try {
    return await Recipe.findAll({
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
  } catch (error) {
    console.log(error)
  }
};


const getAllInfo = async () => {
  try {
    const infoApi = await getInfoApi()
    const infoDb = await getInfoByDb()
    const allInfo = infoApi.concat(infoDb)
    return allInfo

  } catch (error) {
    console.log(error)
    return ({ error: "No hay recetas !!!" })
  }
};

//OBTENER DATA POR ID (API)
const getById = async (id) => {
  try {
    const getFoodById = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    )
    const item = getFoodById.data
    return {
      id: item.id,
      name: item.title,
      image: item.image,
      type: item.dishTypes,
      diets: item.diets.map((h) => {
        return { name: h };
      }),
      summary: item.summary.replace(/(<([^>]+)>)/gi, ""),
      healthScore: item.healthScore,
      steps: item.analyzedInstructions.map((f) =>
        f.steps.map((g) => g.step).join(" ")
      ),
    };

  } catch (error) {
    console.log(error)
    return ({ error: "No se encuentra id !!!" })
  }
};


const getIdByDb = async (id) => {
  try {
    return await Recipe.findByPk(id, {
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
  } catch (error) {
    console.log(error)
    return ({ error: "No se encuentra id en DB !!!" })
  }
};


//OBTENER DIETAS
const getAllDiets = async () => {
  try {
    /* const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    ); */
    const dietsApi = food;

    const dietsData = dietsApi./* data. */results.map(e => e.diets)
    const filterDiets2 = new Set([...dietsData.flat()]);
    const filterDiets = [...filterDiets2, "vegetarian"];
    filterDiets.forEach((e) => {
      Diet.findOrCreate({
        where: {
          name: e
        }
      })
    })
  /*  const eag = filterDiets.map(el => {
      for (let i = 0; i < el.length; i++) return el[i]
    }) 
    console.log(eag)
    eag.forEach(e => {
      Diet.findOrCreate({
        where: {
          name: e
        }
      })
    }) */

    const allDiets = await Diet.findAll();
    return allDiets;

  } catch (error) {
    console.log(error)
    return ({ error: "Dieta no encontrada !!!" })
  }
};

module.exports = {
  getInfoApi,
  getInfoByDb,
  getAllInfo,
  getById,
  getIdByDb,
  getAllDiets,
};