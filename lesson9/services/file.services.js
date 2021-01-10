const fs = require('fs-extra').promises;
const path = require('path');
const { v1: uuid } = require('uuid');

const {
    fileUploadConfig: {
        PUBLIC_FOLDER,
        USERS_FOLDER,
        AVATAR_FOLDER
    }
} = require('../config');

module.exports = {
    delFile: (filePath) => fs.unlink(path.join(process.cwd(), PUBLIC_FOLDER, `${filePath}`)),

    delUserDir: (dir) => fs.rmdir(
        path.join(process.cwd(), PUBLIC_FOLDER, USERS_FOLDER, `${dir}`),
        { recursive: true }
    ),

    saveFile: async (file, id, folder = AVATAR_FOLDER) => {
        const pathWithoutPublic = path.join(USERS_FOLDER, `${id}`, folder);
        const pathToSave = path.join(process.cwd(), PUBLIC_FOLDER, pathWithoutPublic);
        const extension = file.name.split('.').pop();
        const newFileName = `${uuid()}.${extension}`;
        const pathForDb = path.join(pathWithoutPublic, newFileName);

        await fs.mkdir(pathToSave, { recursive: true });
        await file.mv(path.join(pathToSave, newFileName));

        return pathForDb;
    }
};
