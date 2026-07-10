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
// middleware: this SERVER will receive & RESpond in JSON format
app.use(express.json());

//
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

// This HELPER FUNCtion's job is to find and return ONE recipe from our JSON file.
// 2. getOneRecipe(index)
async function getOneRecipe(index) {
  // store the JSON file into VAR (data) as a STRING.
  // using the fs.readFile() method from the fs/promises module.
  // JSON DATA COMES BACK AS TEXT--->>.
  // READ IT
  const data = await fs.readFile("recipes-data.json", "utf-8");

  // separate the JSON file into a JS OBJect (parsedData) using the JSON.parse() method.
  // PARSE IT
  const parsedData = JSON.parse(data);

  // We use the index number to find one recipe in the array.
  // STORE IT & CAPTURE IT
  const recipe = parsedData[index];
  // BOP IT!!! .....ERRR... DROP IT!!! .....ERRRRR we meant >>>>RETURN IT!!!<<<<<
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

app.ge;
// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  // call the helper FUNC. Store in VAR.
  const recipes = await getAllRecipes();
  // return the VAR to the endpoint
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
// we create a GET route
// 2 arguments(1 is dynamic URL. 2nd is async arrow FUNC with its 2 PARAMS)
// CREATE IT!
app.get("/get-one-recipe/:index", async (req, res) => {
  // capture/grab the index from the URL (that USER inputs)
  // converts from STRING to a NUM
  // GRAB IT
  const index = req.params.index;

  // call()... the HELPER FUNC,
  // HELPER FUNC returns ONE RECIPE
  // ...THEN, Store in VAR (recipe)
  // CALL IT!
  const recipe = await getOneRecipe(index);

  // return the VAR to the endpoint
  // We send that recipe back to the client using res.json().
  // SEND IT!
  res.json(recipe);
  console.log("RECIPE SAYS:", recipe);
});

// -------------------------------------
// -------WHAT HAPPENS:------------------
// -------------------------------------
// What Happens?  ????????????????  ?
// User requests /get-one-recipe/1
// req.params.index = "1"
// Number("1") = 1
// getOneRecipe(1) runs
// JSON file is read
// Recipe at position 1 is selected
// Recipe is returned
// res.json(recipe) sends it back to Postman/browser
// Super Simple One-Liner

// "This endpoint takes an index from the URL, reads the recipes JSON file, finds the recipe at that index position, and sends that recipe back to the client as JSON."

// -------------------------------------

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
  console.log("RECIPES COUNT SAYS:", count);
});
