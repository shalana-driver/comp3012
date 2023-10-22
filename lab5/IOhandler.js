/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Oct 14, 2023
 * Author: Shalana Driver
 *
 */

const AdmZip = require("adm-zip");
const fs = require("fs/promises")
const PNG = require("pngjs").PNG
const path = require("path");
const {createReadStream, createWriteStream} = require("fs")

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  const zip = new AdmZip(pathIn)
  return zip.extractAllTo(pathOut, true)
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return fs.readdir(dir, 'utf8').then((files) => {
    const filesList = files
    const pngList = filesList.filter((file) => path.extname(file) === '.png')
    const pngPathList = pngList.map((file) => path.format({
      dir: path.basename(dir),
      base: file
    }))
    return pngPathList
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  const rs = createReadStream(pathIn)
  const ws = createWriteStream(pathOut)
  const pt = new PNG({filterType: 4})

  rs
    .pipe(pt)
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
  
          this.data[idx] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
          this.data[idx + 1] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
          this.data[idx + 2] = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3
  
          this.data[idx + 3] = this.data[idx + 3] = 255;
        }
      }
      this.pack().pipe(ws);
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
