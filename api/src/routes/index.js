const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const rouRecipes = require('./recipes.js');
const rouRecipe = require('./recipe.js')
const rouDiets = require('./diets.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', rouRecipes);
router.use('/recipe', rouRecipe);
router.use('/diets', rouDiets);


module.exports = router;