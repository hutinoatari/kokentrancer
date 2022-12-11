import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

const dateToYYYYMMDD = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${y}${(""+m).padStart(2, "0")}${(""+d).padStart(2, "0")}`;
}

app.use("/", express.static("public"));
app.use(express.json());

app.listen(port, () => console.log(`app start.`));

app.post("/add", (req, res) => {
    const {name, temperature} = req.body;
    if(!fs.existsSync("data")) fs.mkdirSync("data");
    const path = `data/${dateToYYYYMMDD(new Date())}.csv`;
    fs.open(path, "a", (err, fd) => {
        if(err) throw err;
        fs.appendFile(fd, `${name},${temperature}\n`, (err) => {
            if(err) throw err;
            fs.close(fd, (err) => {
                if(err) throw err;
            });
        });
    });
    console.log(`${name} fill out.`);
    res.status(200).send();
});