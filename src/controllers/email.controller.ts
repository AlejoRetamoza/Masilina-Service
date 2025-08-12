import { Request, Response } from "express";
import {
	sendPartnersMail,
	sendWorkTogetherMail,
	sendUnitRequestMail,
} from "../services/email.service";

export async function sendMailController(req: Request, res: Response) {
	let sendMail: ((body: any) => Promise<any>) | undefined;

	if (req.body.emailType === "partners") {
		sendMail = sendPartnersMail;
	} else if (req.body.emailType === "work-together") {
		sendMail = sendWorkTogetherMail;
	} else if (req.body.emailType === "unit-request") {
		sendMail = sendUnitRequestMail;
	}

	if (!sendMail) {
		return res.status(400).json({ error: "Invalid email type" });
	}

	sendMail(req.body)
		.then((data) => {
			return res.status(200).json({
				message: "Email enviado correctamente",
				data,
			});
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: "Error al enviar el correo" });
		});
}
