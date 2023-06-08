import transporter from '../config/mailConfig.js';
import ejs from 'ejs';
import path from 'path';
import jwt from 'jsonwebtoken';

const sendEmail = async (id,email) => {
    const token = jwt.sign({ user: id },process.env.JWT_SECRET,{expiresIn: "2m",});
    const link = process.env.SITE_URL + "/verify/" + id + "/" + token;
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