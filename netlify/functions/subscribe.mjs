// Netlify Function: add a website signup to the MailerLite "Whisker Club" group.
// No npm dependencies — calls the MailerLite API directly with fetch.
// The API key is read from MAILERLITE_API_KEY (set in Netlify env vars),
// so it never reaches the browser.

const GROUP_NAME = "Whisker Club";

export default async (request) => {
  if (request.method !== "POST")
    return new Response("Method not allowed", { status: 405 });

  const key = process.env.MAILERLITE_API_KEY;
  if (!key) return Response.json({ error: "not_configured" }, { status: 503 });

  let body;
  try { body = await request.json(); } catch { body = {}; }
  const email = (body.email || "").trim().toLowerCase();
  const name = (body.name || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return Response.json({ error: "invalid_email" }, { status: 400 });

  const headers = {
    Authorization: "Bearer " + key,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Resolve the Whisker Club group id by name
  let groupId = null;
  try {
    const gr = await fetch("https://connect.mailerlite.com/api/groups?limit=100", { headers });
    const gj = await gr.json();
    const g = (gj.data || []).find((x) => x.name === GROUP_NAME);
    groupId = g ? g.id : null;
  } catch (e) { /* fall through — still add the subscriber */ }

  const payload = { email };
  if (name) payload.fields = { name };
  if (groupId) payload.groups = [groupId];
  // status omitted on purpose: respects the form's double opt-in setting,
  // so MailerLite sends the confirmation email and the welcome automation
  // fires once the subscriber confirms.

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    return Response.json(
      { error: "mailerlite_error", detail: data.message || "unknown" },
      { status: 502 }
    );
  return Response.json({ ok: true });
};
