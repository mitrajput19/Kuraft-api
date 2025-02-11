const app = require(".");
const { connectDb } = require("./config/db");
const PORT = 8080;

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log("ecommerce api listening on PORT:", PORT);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});