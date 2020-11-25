const fs = require('fs');
const path = require('path');

// как вариант ;)
// function swapFiles(folder1, folder2) {
//     // const pathFolder1 = path.join(__dirname, folder1);
//     // const pathFolder2 = path.join(__dirname, folder2);
//     // const temp = path.join(__dirname, 'temp');
//     fs.renameSync(folder1, 'temp');
//     fs.renameSync(folder2, folder1);
//     fs.renameSync('temp', folder2);
// }

// function swapFiles(dir1, dir2) {
//     const listDir = [dir1, dir2];   // [...arguments] 
//     let data = {};
//     listDir.forEach(dir => {
//         data[dir] = fs.readdirSync(dir);
//     })
//     const findNewPath = (path) => {
//         const [newPath] = listDir.filter(dir => dir !== path);
//         return newPath;
//     };
//     for (const [key, val] of Object.entries(data)) {
//     }

// }

function swapFiles(dir1, dir2) {
    const listDir = [dir1, dir2];

    const findPath = (path) => {
        const [newPath] = listDir.filter(dir => dir !== path);
        return newPath;
    };

    listDir.forEach(dir => {
        console.log(dir);
        currentPathFile = fs.readdirSync(dir)
        // .map(file => path.join(dir, file));
        console.log(currentPathFile);
        const url = path.join(dir, currentPathFile[0])
        console.log(url);
    })
}


swapFiles('1800', '2000');