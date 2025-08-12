import { Mail } from "interfaces/mail.interface";
import { transporter } from "../config/mailer";

export async function sendPartnersMail(data: Mail) {
	transporter
		.sendMail({
			from: '"Viare Desarrollos" <viaredesarrollos@gmail.com>',
			to: "viaredesarrollos@gmail.com",
			subject: "Ofrecimiento de terreno",
			html: `
			<p>Nombre y apellido: ${data.fullName}</p>
			<p>Email: ${data.email}</p>
			<p>Teléfono: ${data.phoneNumber}</p>
			<p>Dirección de la propiedad: ${data.address}</p>
			<p>Disponibilidad: ${data.availability}</p>
			<p>Información: ${data.info}</p>
        `,
		})
		.catch((err) => {
			console.log(err);
			throw new Error("Error al enviar email");
		});
}

export async function sendWorkTogetherMail(data: Mail) {
	transporter
		.sendMail({
			from: '"Viare Desarrollos" <viaredesarrollos@gmail.com>',
			to: "viaredesarrollos@gmail.com",
			subject: "Solicitud para ser proveedor de viare",
			html: `
			<p>Nombre y apellido: ${data.fullName}</p>
			<p>Email: ${data.email}</p>
			<p>Teléfono: ${data.phoneNumber}</p>
			<p>Empresa: ${data.company}</p>
			<p>Disponibilidad: ${data.availability}</p>
			<p>Detalles del producto/servicio: ${data.info}</p>
        `,
		})
		.catch((err) => {
			console.log(err);
			throw new Error("Error al enviar email");
		});
}

export async function sendUnitRequestMail(data: Mail) {
	transporter
		.sendMail({
			from: '"Viare Desarrollos" <viaredesarrollos@gmail.com>',
			to: "viaredesarrollos@gmail.com",
			subject: "Consulta para comprar una unidad",
			html: `
			<p>Nombre y apellido: ${data.fullName}</p>
			<p>Email: ${data.email}</p>
			<p>Teléfono: ${data.phoneNumber}</p>
			<p>Disponibilidad: ${data.availability}</p>
			<p>Tipo de propiedad: ${data.propertyType}</p>
			<p>Ubicación de la propiedad: ${data.propertyLocation}</p>
			<p>Cantidad de ambientes: ${data.propertyRoomsQuantity}</p>
        `,
		})
		.catch((err) => {
			console.log(err);
			throw new Error("Error al enviar email");
		});
}
