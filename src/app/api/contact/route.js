// src/app/api/contact/route.js
export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required." }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log("Contact Form Data Received:", formData);
    // !!! Implement actual email sending here (e.g., with Nodemailer) !!!
    return new Response(JSON.stringify({ success: true, message: "Message sent successfully! (Logged to console)" }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("API Contact Form Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error." }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
}