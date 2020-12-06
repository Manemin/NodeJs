const userService = require('../services/user.services');

module.exports = {
    createUser: async (req, res) => {
        try {
            await userService.putUser(req.body);

            res.json('User added');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    showUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            await userService.delUser(req.params);

            res.json('user deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    findById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await userService.findUserById(id);

            if (user === null) throw new Error('User not found');

            res.json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    findByParam: async (req, res) => {
        try {
            const { key, val } = req.validQuery;
            const result = await userService.findByParams(key, val);

            if (result.length < 1) throw new Error('User not found');

            res.json(result);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
