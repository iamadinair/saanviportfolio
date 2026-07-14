import nodemailer from 'nodemailer';
import { siteConfig } from '../../data/site.config.js';

// This route only exists because output is 'server' in astro.config.mjs —
// it runs on the server, per request, whenever the contact form submits.
export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const type = (body.type || 'General inquiry').trim();
    const message = (body.message || '').trim();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Please fill in your name, email, and a message.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Read SMTP credentials at request time (not import.meta.env — Astro
    // inlines that at build time, which would bake secrets into the build).
    // See .env.example for what to set.
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return new Response(
        JSON.stringify({
          error:
            'Email sending is not configured yet. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS in .env (see .env.example).',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: siteConfig.contact.to,
      cc: siteConfig.contact.cc,
      replyTo: email,
      subject: `${siteConfig.contact.subjectPrefix}${type}`,
      text: `From: ${name} (${email})\nInquiry type: ${type}\n\n${message}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong sending the message. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
