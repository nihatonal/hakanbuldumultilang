import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, legalArea } = body as {
      name: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
      legalArea?: string;
    };

    // Nodemailer Transport
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "info@hakanbuldu.com",
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    // E-Posta İçeriği
    const emailContent = `
Ad Soyad: ${name}
Email: ${email}
Telefon: ${phone || "-"}
Konu: ${subject || "-"}
Hukuki Alan: ${legalArea || "-"}
Mesaj:
${message}
`;

    // Gönder
    await transporter.sendMail({
      from: `"Web Form" <info@hakanbuldu.com>`,
      replyTo: email,
      to: "info@hakanbuldu.com",
      subject: subject ? `Web Form: ${subject}` : "Web Form Mesajı",
      text: emailContent,
      html: `
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Konu:</strong> ${subject || "-"}</p>
        <p><strong>Hukuki Alan:</strong> ${legalArea || "-"}</p>
        <p><strong>Mesaj:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail gönderim hatası:", err);
    return NextResponse.json({ error: "Email gönderilemedi" }, { status: 500 });
  }
}
