const { userService, mailService } = require('../services');
const { errors: { USER_NOT_FOUND } } = require('../error');
const { pwdHelper: { hash } } = require('../helpers');
const { emailActions: { WELCOME, USER_DELETED } } = require('../constants');

module.exports = {
    addNewUser: async (req, res, next) => {
        try {
            const { email, password, name } = req.body;
            const hashedPass = await hash(password);

            Object.assign(req.body, { password: hashedPass });
            await userService.putUser(req.body);

            await mailService.sendMail(email, WELCOME, { userName: name });

            res.json('User added');
        } catch (e) {
            next(e);
        }
    },
    showUsers: async (req, res) => {
        const users = await userService.findUsers();

        res.json(users);
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id, email, name } = req.body;

            await userService.delUser(id);

            await mailService.sendMail(email, USER_DELETED, { userName: name });

            res.json(`user with id:${id} deleted`);
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
    updateUser: async (req, res, next) => {
        try {
            await userService.updateData(req.params.userId, req.body);

            res.json('User updated');
        } catch (e) {
            next(e);
        }
    },
};
