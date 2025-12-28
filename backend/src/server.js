import { environment } from "./config/environment.js";
import connectDB from "./config/db.js";
import app from "./app.js";

// Start the server and connect to the database
const startServer = async () => {
  await connectDB();
  console.log("Database cluster connected successfully");
  app.listen(environment.PORT, () => {
    console.log(`Server is running on http://localhost:${environment.PORT}`);
  });
};

startServer();
