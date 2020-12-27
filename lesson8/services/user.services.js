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
                { association: user_cars },
            ],
            where: param
        });
    },
    putUser: (user) => {
        const userModel = db.getModel('User');

        userModel.create(user);
    },
    updateData: (id, data) => {
        const userModel = db.getModel('User');

        userModel.update(data, { where: { id } });
    },
    delUser: (id) => {
        const userModel = db.getModel('User');

        userModel.destroy({ where: { id } });
    },
};
