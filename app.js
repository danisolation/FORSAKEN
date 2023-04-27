const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const AIO_KEY = process.env.ADAFRUIT_IO_KEY;

const port = 8080;
app.use(bodyParser.json());
app.use(cors());
let AIO_USERNAME = "Danny0943777525";
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/lastTemp", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/temp/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/lastHumid", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/humidity/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/pir", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/pir/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/lastPump", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/pump/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/lastFan", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/fan/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/prevFan", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/fan/data`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data[1].value });
});

app.get("/prevLight", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/light/fan/data`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data[1].value });
});

app.get("/lastLight", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/light/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/lastLight", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/light/data/last`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  res.json({ value: response.data.value });
});

app.get("/tempChart", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/temp/data?limit=10`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  let newData = response.data.map((item) => ({
    name: new Date(item.created_at).toLocaleTimeString(),
    temperatureOfChip: item.value,
  }));
  res.json(newData);
});

app.get("/humidChart", async (req, res) => {
  const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/humidity/data?limit=10`;
  const response = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-AIO-Key": AIO_KEY,
    },
  });
  let newData = response.data.map((item) => ({
    name: new Date(item.created_at).toLocaleTimeString(),
    humidityOfChip: item.value,
  }));
  res.json(newData);
});

app.get("/about", (req, res) => {
  res.send("Đây là trang giới thiệu về tôi.");
});

// Chạy server trên port 3000
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
