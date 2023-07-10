const Fs = require("fs")

// setup to npm init
console.log(process.argv);
// get value from componend line argument

const [, , name2]=process.argv;
console.log("command line", name2);

//reading file from your computer
Fs.readFile("./samplefilee.txt","utf-8",(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

const content = " I ' am writing a new file"

Fs.writeFile("./newFile.txt",content,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("fie writed sucessfuly")
    }
})

//appending file
const content2 = "\n i am writting a new file 2"
Fs.appendFile("./newFile.txt",content2,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("file updated sucessfuly")
    }
});
  

//  un link the file
Fs.unlink("./newFile.txt",(err)=>{ 
    if(err){
        console.log(err)
    }else{
        console.log("file deleted sucessfuly")
    }
})



//task guvi

const express = require("express");
const Fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "timeStamp");

const app = express();

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

app.listen(9000, () => console.log(`server start in the localhost : 9000`));









