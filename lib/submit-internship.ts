import { NextResponse } from "next/server";

import { emailValidationError } from "@/lib/form-validation";
import {
  type CareerPayload,
  handleCareerSubmission,
} from "@/lib/submit-career";

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * Accepts internship form fields, remaps them onto the career/workforce
 * pipeline so applications land in the same backend as other applicants.
 */
export async function handleInternshipSubmission(
  request: Request,
): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return validationError("Invalid form data.");
  }

  const firstName = String(form.get("firstName") ?? "").trim();
  const lastName = String(form.get("lastName") ?? "").trim();
  const country = String(form.get("country") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const gender = String(form.get("gender") ?? "").trim();
  const subject = String(form.get("subject") ?? "").trim();
  const institution = String(form.get("institution") ?? "").trim();
  const passedYear = String(form.get("passedYear") ?? "").trim();
  const internshipPeriod = String(form.get("internshipPeriod") ?? "").trim();
  const headshot = form.get("headshot");
  const resume = form.get("resume");

  if (!firstName || !lastName || !country || !phone || !email || !gender) {
    return validationError("Please fill in all required fields (marked with *).");
  }

  if (!subject || !institution || !passedYear || !internshipPeriod) {
    return validationError("Please complete all internship details.");
  }

  const emailErr = emailValidationError(email);
  if (emailErr) return validationError(emailErr);

  if (!/^\d{10}$/.test(phone)) {
    return validationError("Enter a valid 10-digit mobile number.");
  }

  if (!(headshot instanceof File) || headshot.size === 0) {
    return validationError("Please upload a headshot.");
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return validationError("Please upload your CV/resume.");
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const coverLetter = [
    "Internship application",
    `Subject: ${subject}`,
    `Institution: ${institution}`,
    `Passed year: ${passedYear}`,
    `Period: ${internshipPeriod}`,
    `Gender: ${gender}`,
    `Country: ${country}`,
  ].join("\n");

  const careerForm = new FormData();
  careerForm.append("fullName", fullName);
  careerForm.append("phone", phone);
  careerForm.append("email", email);
  careerForm.append("positions", JSON.stringify(["Internship"]));
  careerForm.append("expertise", JSON.stringify([]));
  careerForm.append("yearsExperience", "");
  careerForm.append("preferredAreas", JSON.stringify([]));
  careerForm.append("insurancePolicyNumber", "");
  careerForm.append("emergencyContact", "");
  careerForm.append("coverLetter", coverLetter);
  careerForm.append(
    "message",
    `Internship — ${subject} (${internshipPeriod}) at ${institution}.`,
  );
  careerForm.append("idProof", headshot);
  careerForm.append("resume", resume);

  const careerRequest = new Request(request.url, {
    method: "POST",
    body: careerForm,
    headers: request.headers,
  });

  // Satisfy TypeScript that CareerPayload shape is intentional for remap.
  void (null as unknown as CareerPayload);

  return handleCareerSubmission(careerRequest);
}
