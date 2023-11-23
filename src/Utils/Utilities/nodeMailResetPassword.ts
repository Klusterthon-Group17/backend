import { sendResetPasswordMail } from './nodeEmaillogic';


const sendResetPassswordMail = async ({ name, email, token, origin }  : { 
    name: string,
    email: string,  
    token: string, 
    origin: string,
  }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  return sendResetPasswordMail({
    email,
    origin,
  });
};

export default sendResetPassswordMail;