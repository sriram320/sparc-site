import { Handler } from '@netlify/functions';
import { prisma } from '../../src/lib/prisma';
import { sendContactNotification } from '../../src/lib/email';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const handler: Handler = async (event) => {
  // Handle POST request
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');
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

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data: contact }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Configure this properly in production
        },
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, error: validationError.message }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        };
      }

      console.error('Contact form error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Internal server error' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }
  }

  // Handle GET request
  if (event.httpMethod === 'GET') {
    try {
      const contacts = await prisma.contact.findMany();
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data: contacts }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Internal server error' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }
  }

  // Handle unsupported methods
  return {
    statusCode: 405,
    body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
};
