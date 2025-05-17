import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactNotification(name: string, email: string, message: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message:
${message}
    `,
    html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
    `,
  });
}

export async function sendJobApplicationNotification(
  fullName: string,
  email: string,
  position: string,
  experience: string,
  resumeUrl?: string
) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Job Application from ${fullName} for ${position}`,
    text: `
Name: ${fullName}
Email: ${email}
Position: ${position}
Experience:
${experience}
Resume: ${resumeUrl || 'No resume attached'}
    `,
    html: `
<h2>New Job Application</h2>
<p><strong>Name:</strong> ${fullName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Position:</strong> ${position}</p>
<p><strong>Experience:</strong></p>
<p>${experience}</p>
${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">Download Resume</a></p>` : ''}
    `,
  });
}
