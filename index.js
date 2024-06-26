import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
const API_URL = "https://byabbe.se/on-this-day";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index.ejs", {
    content: "Waiting for Input...",
    date: "__ /__ /____",
  });
});

app.post("/get-events", async (req, res) => {
  const monthInput = req.body.month;
  const dayInput = req.body.day;

  try {
    const result = await axios.get(
      `${API_URL}/${monthInput}/${dayInput}/events.json`
    );
    const responseData = result.data;

    const randomEvent = Math.floor(Math.random() * responseData.events.length);
    const date =
      responseData.date + " " + responseData.events[randomEvent].year;

    // console.log(randomEvent);
    // console.log(responseData.events[randomEvent].description);
    // console.log(responseData.date + " " + responseData.events[randomEvent].year);

    res.render("index.ejs", {
      content: responseData.events[randomEvent].description,
      date: date,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: "Undefined Inputs.",
      date: "",
    });
  }
});

app.post("/get-deaths", async (req, res) => {
  const monthInput = req.body.month;
  const dayInput = req.body.day;

  try {
    const result = await axios.get(
      `${API_URL}/${monthInput}/${dayInput}/deaths.json`
    );
    const responseData = result.data;

    const randomDeath = Math.floor(Math.random() * responseData.deaths.length);
    const date =
      responseData.date + " " + responseData.deaths[randomDeath].year;

    res.render("index.ejs", {
      content: responseData.deaths[randomDeath].description,
      date: date,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: "Undefined Inputs.",
      date: "",
    });
  }
});

app.post("/get-births", async (req, res) => {
  const monthInput = req.body.month;
  const dayInput = req.body.day;

  try {
    const result = await axios.get(
      `${API_URL}/${monthInput}/${dayInput}/births.json`
    );
    const responseData = result.data;

    const randomBirth = Math.floor(Math.random() * responseData.births.length);
    const date =
      responseData.date + " " + responseData.births[randomBirth].year;

    res.render("index.ejs", {
      content: responseData.births[randomBirth].description,
      date: date,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: "Undefined Inputs.",
      date: "",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`);
});
