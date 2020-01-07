const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
}

app.listen(port, () => console.log(`Server start on ${port} port!`));