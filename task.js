const express = require("express");
const Fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "timeStamp");

const app = express();
//app.use(express.json())

console.log(dirPath);

app.get("/timestamp", (req, res) => {
  let date = new Date();
  const timestampDate = `Last update  ${date.toUTCString().slice(0, -3)}`;
  Fs.writeFileSync(`${dirPath}/current-date-time.txt`, timestampDate, (err) => {
    if (err) {
      res.send({ message: "error writing timestamp" });
    }
  });
  res.sendFile(path.join(dirPath, "current-date-time.txt"));
});

// one sample operation

let carData = [
  {
    name: "neon",
    country: "india",
    company: "dada",
    fuel: "petrol",
    type: "manual",
  },
  {
    name: "neon",
    country: "india",
    company: "dada",
    fuel: "petrol",
    type: "manual",
  },
  {
    name: "gtr",
    country: "india",
    company: "dubai",
    fuel: "petrol",
    type: "DSG",
  },
  {
    name: "xl",
    country: "india",
    company: "tvs",
    fuel: "diesel",
    type: "DSG",
  },
  {
    name: "bmw",
    country: "foregin",
    company: "skoda",
    fuel: "diesel",
    type: "manual",
  },
];
//car data end point of the data
//get all data

app.get("/car/all", (req, res) => {
  const { type, fuel } = req.query;
  let returnData = carData;
  if (req.query) {
    if (type) {
      returnData = returnData.filter((val) => val.type === type);
    }
    if (fuel) {
      returnData = returnData.filter((val) => val.fuel === fuel);
    }
  }

  res.json({ data: returnData });
});

//get using params etchu oru parameter kututhu whole deatails finding
app.get("/car/:name", (req, res) => {
  const { name } = req.params;
  const selectedData = carData.find((val) => val.name === name);

  res.status(200).send({ name: selectedData });
});

//object kuila namaku thevayanthu matum print panatrathu method

app.get("/car/all/spec", (req, res) => {
  const selectedData = carData.map((val)=>({name:val.name, company:val.company}))
  // console.log(selectedData)
  
  res.status(200).json(selectedData);
});
 
//new data add pantr method(post)
app.post("/car/add",express.json(),(req,res)=>{
  const newCar = req.body;
  carData.push(newCar)

  res.status(201).json({data:carData})
})

app.put("/car/edit/:name",(req,res)=>{
  const {name} = req.params;
  const selectedCar = carData.find((val)=>val.name===name);
  //selectedCar.type = req.body.type
  //not work
 
  res.status(200).send(selectedCar)
})

app.delete("/car/remove/:name",(req,res)=>{
  const {name} = req.params;
  const newCarlist = carData.filter((val)=>val.name!==name);
  carData = newCarlist
  res.status(200).send({message:`${name} is deleted sucessfully`})
})






app.listen(9000, () => console.log(`server start in the localhost : 9000`));
