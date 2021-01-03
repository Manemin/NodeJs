const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

module.exports = {
    delFile: (filePath) => fs.unlink(path.join(process.cwd(), 'public', filePath)),

    saveFile: async (file, id, folder = 'avatar') => {
        const pathWithoutPublic = path.join('users', `${id}`, folder);
        const pathToSave = path.join(process.cwd(), 'public', pathWithoutPublic);
        const extension = file.name.split('.').pop();
        const newFileName = `${uuid}.${extension}`;
        const pathForDb = path.join(pathWithoutPublic, newFileName);

        await fs.mkdir(pathToSave, { recursive: true });
        await file.mv(path.join(pathToSave, newFileName));

        return pathForDb;
    }
};
