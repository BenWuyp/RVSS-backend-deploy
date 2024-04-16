import express from "express";
import cors from "cors";
import { filter, readTotalNum, findOne, filterRowNum } from "./routes/read.js";
import { client } from "./database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "https://rna-virus-ss-database.onrender.com" }));
app.use(express.json())

app.get("/filter", async (req, res) => {
  try {
    const result = await filter(client, req.query);
    res.send(result);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/findOne", async (req, res) => {
  try {
    const result = await findOne(client, req.query);
    res.send(result);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/holdings", async (req, res) => {
  try {
    const result = await readTotalNum(client);
    res.send(result.toString());
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/filterRowNum", async (req, res) => {
  try {
    const result = await filterRowNum(client, req.query);
    res.send(result.toString());
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
