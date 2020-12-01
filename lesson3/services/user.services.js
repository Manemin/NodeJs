const fs = require('fs').promises;
const path = require('path');

const pathToDbUsers = path.join(process.cwd(), './db/users.json');



module.exports = {
    readDb: async () => {
        const result = await fs.readFile(pathToDbUsers, 'utf8');
        return JSON.parse(result);
    },

    writeDb: (user) => async () => {
        const result = await fs.readFile(pathToDbUsers, 'utf8');
        JSON.parse(result);
    }
};
