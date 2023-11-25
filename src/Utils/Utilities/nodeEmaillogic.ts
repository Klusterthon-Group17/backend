import { SentMessageInfo } from "nodemailer";
import emailData from "../../Interfaces/email.dat";
import sendNodeEmail from "./sendEmail";


// Function to extract the username from the email
const getUsernameFromEmail = (email: string): string => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }
  return 'User';
};

const sendVerificationMail = async ({
  email,
  verificationToken,
}: {
  email: string;
  verificationToken: string;
}): Promise<SentMessageInfo> => {
  // Extract user name from the email
  const userName = getUsernameFromEmail(email);

  const message = `<p>Hello ${userName}, your verification code is: ${verificationToken}</p>`;

  const emaildata: emailData = {
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello ${userName},</h4>
          ${message}
          `,
    from: '', // Replace with the sender's email address
    text: 'Email Verification',
  };

  const result = await sendNodeEmail(
    emaildata.to,
    emaildata.subject,
    emaildata.html
  );

  return { ...result, verificationToken };
};

const sendResetPasswordMail = async ({
  email,
  token,
  origin,
}: {
  email: string;
  token: string;
  origin: string;
}): Promise<SentMessageInfo> => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
    <a href="${resetURL}">Reset Password</a></p>`;

  const emaildata: emailData = {
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello</h4>
          ${message}
          `,
    from: '',
    text: 'Reset Password Verification',
  };

  return sendNodeEmail(emaildata.to, emaildata.subject, emaildata.html);
};


export  {sendVerificationMail,
sendResetPasswordMail};
