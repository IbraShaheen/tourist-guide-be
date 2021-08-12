// Libraries
const express = require("express");
const cors = require("cors");
const path = require("path");

const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./routes/userRoutes")
const guideRoutes= require("./routes/guideRoutes")
const countryRoutes = require("./routes/countryRoutes")
const cityRoutes = require("./routes/cityRoutes")
// Mongo Db
const connectDb = require("./db");

const app = express();



app.use(cors());
connectDb();
app.use(express.json());
app.use(passport.initialize());
app.use("/upload", express.static(path.join(__dirname, "upload")));

passport.use(localStrategy);
passport.use(jwtStrategy);

// routes
app.use(userRoutes);
app.use(guideRoutes);
app.use(countryRoutes);
app.use(cityRoutes);



//error M.W
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

//Path not found M.W
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found" });
});



app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });