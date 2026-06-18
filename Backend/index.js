import express from 'express';

const app = express();

app.get("/", (req, res) =>{
    res.send("hello anjai");
});

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});