const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const outputFile = require('./swagger.json');
const connectDB = async () => {
        try {
            await mongoose.connect(process.env.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        }
    };
connectDB();

//Database connection

const db = mongoose.connection;

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Conexion exitosa"))

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(outputFile));
/*
app.get("/", (req, res) => {
    res.send("Hello world");
});
*/

app.use("/", require("./routes/librosRoutes"))
app.listen(port, () => console.log("El servidor esta funcionando"));
