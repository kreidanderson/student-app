const express = require("express");
const path = require("path");
const fs = require("fs");


// const studentList = require("./db/studentList");
// console.log(studentList);
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// const studentList = [
//     {
//         name:"Mark",
//         course:"Web Dev"
//     },
//     {
//         name:"Erik",
//         course:"Web Dev"
//     }
// ]

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/list", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/list.html"))
});

app.get("/api/students", function (req, res) {
    fs.readFile("./db/studentList.json", "utf8", function (err, data) {
        if (err) throw err;
        console.log(data);
        const newData = JSON.parse(data);
        res.json(newData);
    })
});

app.post("/api/student", function (req, res) {

    // console.log(req.body);
    fs.readFile("./db/studentList.json", "utf8", function (err, data) {
        if (err) throw err;
        console.log(data);
        const studentList = JSON.parse(data);
        studentList.push(req.body);
        console.log(studentList);
        fs.writeFile("./db/studentList.json", JSON.stringify(studentList), function (err) {
            if (err) throw err;
            console.log("added");
            res.redirect("/list");
        });
    });
})

app.delete("/api/student/:name", function (req, res) {
//splice or slice
    res.json(req.params.name);
})
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
