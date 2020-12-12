const { userService } = require('../services');
const { ErrorHandler, errors: { USER_NOT_FOUND } } = require('../error');

module.exports = {
    addNewUser: async (req, res) => {
        await userService.putUser(req.body);

        res.json('User added');
    },
    showUsers: async (req, res) => {
        const users = await userService.findUsers();

        res.json(users);
    },
    deleteUser: async (req, res) => {
        await userService.delUser(req.params);

        res.json(`user with id:${req.params.id} deleted`);
    },
    findByParam: async (req, res, next) => {
        try {
            const result = await userService.findByParams(req.body);

            if (result.length === 0) throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.code);

            res.json(result);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res) => {
        await userService.updateData(req.params, req.body);

        res.json('User updated');
    }
};
