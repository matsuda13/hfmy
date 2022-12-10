import express from "express";
import cors from "cors";
import { sequelize } from "./models.js";
//import { Restaurant, Review, User } from "./modules.js";
import { json } from "sequelize";
import bodyParser from "body-parser"
import fs from 'fs';

const jsonfilepath = "./data.json"

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())

app.get("/waitingpassengercards", async(req, res) => {
    const jsonObject = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
    res.json({
        rows: jsonObject.cards,
    });
});

app.post("/create", async(req, res)=>{
    const jsonObject = JSON.parse(fs.readFileSync(jsonfilepath), "utf-8");
    const month = (new Date().getMonth()+1).toString()
    const date = new Date().getDate().toLocaleString()
    const card = {
        id: jsonObject.cards.length+1,
        userId: req.body.userId,
        date: month + "/" + date,
        departureTime: req.body.departureTime,
        departurePlace: req.body.departurePlace,
        destination: req.body.destination,
        capacity: req.body.capacity,
    }
    // console.log(card);
    jsonObject.cards.push(card);
    console.log(jsonObject.cards);
    const masterdata = JSON.stringify({cards:jsonObject.cards}, null, " ")
    fs.writeFileSync(jsonfilepath, masterdata);
    res.json({
        message:"受け取りましたよ",
        data: {
            info1: req.body,
        },
    });
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`)
});

