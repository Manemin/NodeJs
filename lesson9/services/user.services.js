const db = require('../db').getInstance();

const { can_drive, user_cars } = require('../db/association');

module.exports = {
    findUsers: () => {
        const userModel = db.getModel('User');

        return userModel.findAll();
    },

    findByParams: (param = {}) => {
        const userModel = db.getModel('User');

        return userModel.findAll({
            include: [
                {
                    association: can_drive,
                    through: { attributes: [] },
                },
                user_cars,
            ],
            where: param
        });
    },

    createUser: (user) => {
        const userModel = db.getModel('User');

        return userModel.create(user);
    },

    updateUserData: (id, data) => {
        const userModel = db.getModel('User');

        return userModel.update(data, { where: { id } });
    },

    delUser: (id) => {
        const userModel = db.getModel('User');

        return userModel.destroy({ where: { id } });
    },
};
