import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "viaredesarrollos@gmail.com",
		pass: "hzxecptwbbycgdgu",
	},
	tls: {
		rejectUnauthorized: false,
	},
});

transporter.verify().then(() => {
	console.log("Ready for send emails");
});
