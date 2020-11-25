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

function swapFiles(dir1, dir2) {
    const listDir = [dir1, dir2];
    let listFiles = {};

    const newFolder = (currentFolder) => {
        const [path] = listDir.filter(folder => folder !== currentFolder);
        return path;
    };

    listDir.forEach(dir => {
        listFiles[dir] = fs.readdirSync(dir);
    })

    for (const [dir, list] of Object.entries(listFiles)) {
        list.map(file => fs.renameSync(path.join(dir, file), path.join(newFolder(dir), file)));
    }
    console.log('done');
}


swapFiles('1800', '2000');