"use server";

import { z } from "zod";

const contactSchema = z.object({
	name: z.string().min(2),
	email: z.string().optional(),
	phone: z.string().min(1),
	message: z.string().optional(),
});

type ContactResult = {
	success: boolean;
	message: string;
};

export async function sendContactMessage(formData: z.infer<typeof contactSchema>): Promise<ContactResult> {
	const parsed = contactSchema.safeParse(formData);

	if (!parsed.success) {
		return {
			success: false,
			message: "Invalid form data. Please check all fields.",
		};
	}

	const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

	if (!accessKey) {
		console.error("WEB3FORMS_ACCESS_KEY is not set");
		return {
			success: false,
			message: "Server configuration error. Please contact us directly.",
		};
	}

	const { name, email, phone, message } = parsed.data;

	const response = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"User-Agent": "Mozilla/5.0 (compatible; KatrinStudio/1.0)",
		},
		body: JSON.stringify({
			access_key: accessKey,
			name,
			email: email ?? "",
			phone,
			message: message ?? "",
			subject: `New inquiry from ${name} - Katrin Studio`,
			from_name: "Katrin Studio Website",
		}),
	});

	const contentType = response.headers.get("content-type") ?? "";

	if (!contentType.includes("application/json")) {
		console.error("Web3Forms returned non-JSON response:", response.status, await response.text());
		return { success: false, message: "Failed to send message. Please try again." };
	}

	const result = await response.json();

	if (result.success) {
		return { success: true, message: "Message sent successfully!" };
	}

	console.error("Web3Forms error:", result);
	return {
		success: false,
		message: "Failed to send message. Please try again.",
	};
}
