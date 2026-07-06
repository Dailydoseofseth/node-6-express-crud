// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import fs from "fs/promises";
// import cors from "cors";
// import { getAllRecipes, getOneRecipe, getAllRecipeNames, getRecipesCount } from "./recipes.js";

const app = express();

const port = 3000;

// app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running HOT on http://localhost:${port}`);
});
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()
async function getAllRecipes() {
  // READ IT
  const data = await fs.readFile("recipes-data.json", "utf-8");
  // PARSE IT
  const parsedData = JSON.parse(data);
  // LOG IT
  console.log("DATA SAY WHAT RECIPES??:", parsedData);
  // BOP IT (...errr... we meant RETURN IT!!!)
  return parsedData;
}
// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  // READ IT
  const data = await fs.readFile("recipes-data.json", "utf-8");
  // PARSE IT
  const parsedData = JSON.parse(data);
  // STORE IT & CAPTURE IT
  const recipe = parsedData[index];
  // BOP IT!!! .....ERRR... DROP IT!!! .....ERRRRR we meant RETURN IT!!!
  return recipe;
}

// 3. getAllRecipeNames()
async function getAllRecipeNames() {
  // READ IT
  const data = await fs.readFile("recipes-data.json", "utf-8");
  // PARSE IT
  const parsedData = JSON.parse(data);
  // STORE IT & MAP IT
  const recipeNames = parsedData.map((recipe) => recipe.name);
  // RETURN IT
  return recipeNames;
}

// 4. getRecipesCount()
async function getRecipesCount() {
  // READ IT
  const data = await fs.readFile("recipes-data.json", "utf-8");
  // PARSE IT
  const parsedData = JSON.parse(data);
  // STORE IT & COUNT IT
  const recipesCount = parsedData.length;
  // RETURN IT
  return recipesCount;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  // call the helper FUNC. Store in VAR.
  const recipes = await getAllRecipes();
  // return the VAR to the endpoint
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
app.get("/get-one-recipe/:index", async (req, res) => {
  // capture the index from the URL
  const index = req.params.index;
  // call()... the HELPER FUNC .THEN, Store in VAR (recipe)
  const recipe = await getOneRecipe(index);
  // return the VAR to the endpoint
  res.json(recipe);
  console.log("RECIPE SAYS:", recipe);
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  // call the helper FUNC. Store in VAR.
  const recipeNames = await getAllRecipeNames();
  // return the VAR to the endpoint
  res.json(recipeNames);
  console.log("RECIPE NAMES SAYS:", recipeNames);
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  // call the helper FUNC. Store in VAR.
    // const recipesCount = await getRecipesCount();
    const count = await getRecipesCount();
  // return the VAR to the endpoint
  // means:
  // Create an object.
  // Inside that object...
  // Create a property called
  // count
  //  add : (key-value pair operator) to it
  // whose value is whatever is inside the recipesCount variable
    //   res.json({ count: recipesCount });
    res.json({ count });
  console.log("RECIPES COUNT SAYS:", recipesCount);
});
