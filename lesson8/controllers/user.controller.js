const { userService } = require('../services');
const { errors: { USER_NOT_FOUND } } = require('../error');
const { pwdHelper: { hash } } = require('../helpers');

module.exports = {
    addNewUser: async (req, res) => {
        const password = await hash(req.body.password);

        Object.assign(req.body, { password });
        await userService.putUser(req.body);

        res.json('User added');
    },
    showUsers: async (req, res) => {
        const users = await userService.findUsers();

        res.json(users);
    },
    deleteUser: async (req, res, next) => {
        try {
            await userService.delUser(req.params.userId);

            res.json(`user with id:${req.params.userId} deleted`);
        } catch (e) {
            next(e);
        }
    },
    findByParam: async (req, res, next) => {
        try {
            const result = await userService.findByParams(req.body);

            if (!result.length) {
                res.json(USER_NOT_FOUND.message);
                return;
            }

            res.json(result);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res) => {
        await userService.updateData(req.params.userId, req.body);

        res.json('User updated');
    },
};
