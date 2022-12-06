import express from "express";
import cors from "cors";
import { sequelize } from "./models.js";
//import { Restaurant, Review, User } from "./modules.js";
import * as data from "./sample_data.js"

const app = express();
app.use(cors());

app.get("/drivers/waitingpassengercard", async(req, res) => {
    const cards = data.waitingpassengercard;
    res.json({
        rows: cards,
        count: cards.length,
    });
});

app.post("drivers/");

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`)
});

