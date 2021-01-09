const fs = require('fs').promises;
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

async function swapFiles(dir1, dir2) {
    const listDir = [
        dir1,
        dir2
    ];
    const listFiles = {};

    const destination = (currentFolder) => {
        const [newFolder] = listDir.filter((folder) => folder !== currentFolder);
        return newFolder;
    };

    const promisesList = listDir.map(async (dir) => {
        listFiles[dir] = await fs.readdir(`${dir}`);
    });

    await Promise.all(promisesList);

    // eslint-disable-next-line array-bracket-newline,array-element-newline
    for (const [dir, list] of Object.entries(listFiles)) {
        list.map(async (file) => {
            await fs.rename(path.join(dir, file), path.join(destination(dir), file));
        });
    }

    console.log('done');
}

swapFiles('1800', '2000');
