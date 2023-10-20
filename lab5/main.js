/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: Oct 14, 2023
 * Author: Shalana Driver
 *
 */

const path = require("path");
const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

Promise.resolve()
    .then(()=>IOhandler.unzip(zipFilePath, pathUnzipped))
    .then(() => console.log('Extraction operation complete'))
    .then(()=> IOhandler.readDir(pathUnzipped))
    .then((files) => files.forEach(file => IOhandler.grayScale(path.join(pathUnzipped,file), path.join(pathProcessed,file))))
    .then(() => console.log('Grayscale operation complete'))
    .catch((err) => console.log(err))


