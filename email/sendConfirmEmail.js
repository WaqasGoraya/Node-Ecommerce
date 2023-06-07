import transporter from '../config/mailConfig.js';
import ejs from 'ejs';
import path from 'path';

const sendEmail = async (email,link) => {
    const mail_data = await ejs.renderFile(path.join(process.cwd(),'/views/emails/user_verification.ejs'),{link:link});
    try {
        let info = await transporter.sendMail({
            from:process.env.MAIL_FROM,
            to:email,
            subject: 'Account Verification',
            html: mail_data
        });
        if(info){
            return true;
        }
    } catch (error) {
        console.log('Mail Error',error);
    }
}

export default sendEmail;