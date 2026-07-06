// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import fs from "fs/promises";
// import cors from "cors";
// import { getAllBooks, getOneBook, getOneBookTitle } from "./books.js";

const app = express();

const port = 3000;

// app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
async function getAllBooks() {
  const data = await fs.readFile("books-data.json", "utf-8");
  const parsedData = JSON.parse(data);
  // console.log("DATA SAYS:", parsedData);
  return parsedData;
}

// 2. getOneBook(index)
async function getOneBook(index) {
  const data = await fs.readFile("books-data.json", "utf-8");
  // parse data into JS object  
  const parsedData = JSON.parse(data);
  // store book into VAR (by CAPTURING it via bracket notation)
  const book = parsedData[index];
  // console.log("DATA SAYS:", parsedData);
  return book;
}

// 3. getOneBookTitle(index)
async function getOneBookTitle(index) {
  // read file
  const data = await fs.readFile("books-data.json", "utf-8");
  // parse data
  const parsedData = JSON.parse(data);
  // store book title into VAR (by CAPTURING it via dot notation)
  const bookTitle = parsedData[index].title;
  // return with the book title into browser & console.log
  return bookTitle;
}
// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
// reads the books-data.json file and returns all info TO THE ENDPOINT (the books as an array of objects)
app.get("/get-all-books", async (req, res) => {
  // call the helper FUNC. Store in VAR.
  const books = await getAllBooks();
  console.log("BOOKS SAYS:", books);
  // send data BACK as JSON RES to CLIENT/BROWSER
  // res.send(books);
  res.json(books);
  //   res.send("Welcome to the Books API! Use /get-all-books to see all books.");
});

// 2. GET /get-one-book/:index
app.get("/get-one-book/:index/", async (req, res) => {
  // call the helper FUNC. Store in VAR.
  // sotre index into VAR
  const index = Number(req.params.index);
  const book = await getOneBook(index);
  console.log("BOOKS SAYS:", book);
  // send data BACK as JSON RES to CLIENT/BROWSER
  // res.send(books);
  res.json(book);
  //   res.send("Welcome to the Books API! Use /get-all-books to see all books.");
});

// 3. GET /get-one-book-title/:index — try writing this one yourself!
app.get("/get-one-book-title/:index/", async (req, res) => {
  // store index into VAR
  const index = Number(req.params.index);
  // call the helper FUNC. Store in VAR.
  const bookTitle = await getOneBookTitle(index);
  console.log("BOOK TITLE SAYS:", bookTitle);
  // send data BACK as JSON RES to CLIENT/BROWSER
  // res.send(books);
  res.json(bookTitle);
});
