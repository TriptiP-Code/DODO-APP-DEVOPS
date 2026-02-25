const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json({ db: "connected", result });
  } catch (error) {
    res.status(500).json({ db: "error", error: error.message });
  }
});