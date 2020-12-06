const db = require('../db').getInstance();

module.exports = {
    findUsers: () => {
        const userModel = db.getModel('User');
        return userModel.findAll();
    },
    findUserById: (id) => {
        const userModel = db.getModel('User');
        return userModel.findByPk(id);
    },
    findByParams: (field, value) => {
        const userModel = db.getModel('User');
        return userModel.findAll({
            where: { [field]: value }
        });
    },
    putUser: (user) => {
        const userModel = db.getModel('User');
        userModel.create(user);
    },
    updateUser: (param, value) => {
        const userModel = db.getModel('User');
        userModel.update(value, {
            where: param
        });
    },
    delUser: (param) => {
        const userModel = db.getModel('User');
        userModel.destroy({
            where: param
        });
    }
};
