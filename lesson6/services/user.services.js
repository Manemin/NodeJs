const db = require('../db').getInstance();

module.exports = {
    findUsers: () => {
        const userModel = db.getModel('User');

        return userModel.findAll();
    },
    findByParams: (param = {}) => {
        const userModel = db.getModel('User');

        return userModel.findAll({
            include: 'user_car',
            where: param
        });
    },
    putUser: (user) => {
        const userModel = db.getModel('User');

        userModel.create(user);
    },
    updateData: (id, data) => {
        const userModel = db.getModel('User');

        userModel.update(data, { where: id });
    },
    delUser: (id) => {
        const userModel = db.getModel('User');

        userModel.destroy({ where: id });
    }
};
