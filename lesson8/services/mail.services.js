const EmailTemplates = require('email-templates');
const mailer = require('nodemailer');
const path = require('path');

const { mailConfig } = require('../config');
const { constants } = require('../constants');
const templatesInfo = require('../email-templates');
const { ErrorHandler, errors: { TEMPLATE_NOT_FOUND } } = require('../error');

const transporter = mailer.createTransport({
    service: mailConfig.MAIL_SERVICE,
    auth: {
        user: mailConfig.MAIL_USER,
        pass: mailConfig.MAIL_PASS,
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates'),
    },
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) throw new ErrorHandler(TEMPLATE_NOT_FOUND.message, TEMPLATE_NOT_FOUND.code);

        const html = await emailTemplates.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: constants.NO_REPLY,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = { sendMail };
