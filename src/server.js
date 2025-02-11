const app = require(".");
const { connectDb } = require("./config/db");
const PORT = 8080;

app.listen(PORT, async () => {
  try {
    await connectDb();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});