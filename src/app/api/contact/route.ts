import { prisma } from '../../../lib/prisma';
import { sendContactNotification } from '../../../lib/email';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = contactSchema.parse(data);

    // Store in database
    const contact = await prisma.contact.create({
      data: validated,
    });

    // Send email notification
    await sendContactNotification(
      validated.name,
      validated.email,
      validated.message
    );

    return new Response(JSON.stringify({ success: true, data: contact }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      return new Response(JSON.stringify({ success: false, error: validationError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    return new Response(JSON.stringify({ success: true, data: contacts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
