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

const generateVerificationCode = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const sendVerificationMail = async ({
  email,
}: {
  email: string;
}): Promise<SentMessageInfo> => {
  const verificationCode = generateVerificationCode();

  // Extract user name from the email
  const userName = getUsernameFromEmail(email);

  const message = `<p>Hello ${userName}, your verification code is: ${verificationCode}</p>`;

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

  return { ...result, verificationCode };
};

const sendResetPasswordMail = async ({
  email,
  origin,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
  origin: string;
}): Promise<SentMessageInfo> => {
  const resetURL = `${origin}/auth/verifyEmail?email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
    <a href="${resetURL}">Reset Password</a></p>`;

  const emaildata: emailData = {
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
          ${message}
          `,
    from: '',
    text: 'Reset Password Verification',
  };

  return sendNodeEmail(emaildata.to, emaildata.subject, emaildata.html);
};


export  {sendVerificationMail,
sendResetPasswordMail};
