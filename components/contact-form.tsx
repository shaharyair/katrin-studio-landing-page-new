"use client";

import { sendContactMessage } from "@/app/actions/contact";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";

export function ContactForm() {
	const t = useTranslations("contact");
	const [isPending, startTransition] = useTransition();
	const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(null);

	const schema = useMemo(
		() =>
			z.object({
				name: z.string().min(2, t("errors.nameMin")),
				email: z
					.string()
					.optional()
					.refine((val) => !val || z.email().safeParse(val).success, t("errors.emailInvalid")),
				phone: z
					.string()
					.min(1, t("errors.required"))
					.refine((val) => isMobilePhone(val, "he-IL"), t("errors.phoneInvalid")),
				message: z.string().optional(),
			}),
		[t],
	);

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const onSubmit = (data: z.infer<typeof schema>) => {
		startTransition(async () => {
			const { success } = await sendContactMessage(data);
			setSubmitResult(success ? "success" : "error");
			if (success) form.reset();
		});
	};

	if (submitResult === "success") {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
				<CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
				<p className="text-lg font-semibold text-green-800 dark:text-green-200">{t("success")}</p>
				<Button variant="outline" onClick={() => setSubmitResult(null)}>
					{t("sendAnother")}
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
			<FieldGroup className="gap-5">
				<div className="grid gap-5 sm:grid-cols-2">
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="name">
									{t("fields.name")} <span className="text-destructive">*</span>
								</FieldLabel>
								<Input
									{...field}
									id="name"
									placeholder={t("fields.namePlaceholder")}
									aria-invalid={fieldState.invalid}
									className="bg-background h-11"
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="email">{t("fields.email")}</FieldLabel>
								<Input
									{...field}
									id="email"
									type="email"
									placeholder={t("fields.emailPlaceholder")}
									aria-invalid={fieldState.invalid}
									className="bg-background h-11"
								/>
								<FieldError errors={[fieldState.error]} />
							</Field>
						)}
					/>
				</div>

				<Controller
					name="phone"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="phone">
								{t("fields.phone")} <span className="text-destructive">*</span>
							</FieldLabel>
							<Input
								{...field}
								id="phone"
								type="tel"
								placeholder={t("fields.phonePlaceholder")}
								aria-invalid={fieldState.invalid}
								className="bg-background h-11"
							/>
							<FieldError errors={[fieldState.error]} />
						</Field>
					)}
				/>

				<Controller
					name="message"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="message">{t("fields.message")}</FieldLabel>
							<Textarea
								{...field}
								id="message"
								placeholder={t("fields.messagePlaceholder")}
								rows={5}
								aria-invalid={fieldState.invalid}
								className="bg-background resize-none"
							/>
							<FieldError errors={[fieldState.error]} />
						</Field>
					)}
				/>
			</FieldGroup>

			{submitResult === "error" && (
				<Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40">
					<XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
					<AlertDescription className="text-red-800 dark:text-red-200">{t("error")}</AlertDescription>
				</Alert>
			)}

			<Button type="submit" disabled={isPending} className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 w-full font-semibold">
				{isPending ? t("submitting") : t("submit")}
			</Button>
		</form>
	);
}
