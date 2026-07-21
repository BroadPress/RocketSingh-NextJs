import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleInternshipSubmission } from "@/lib/submit-internship";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleInternshipSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
