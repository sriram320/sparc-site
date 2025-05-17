import { Handler } from '@netlify/functions';
import { prisma } from '../../src/lib/prisma';
import { sendJobApplicationNotification } from '../../src/lib/email';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const jobApplicationSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    position: z.string().min(2, 'Position must be at least 2 characters'),
    experience: z.string().min(10, 'Experience details must be at least 10 characters'),
    resumeUrl: z.string().optional(),
});

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const data = JSON.parse(event.body || '{}');
        const validated = jobApplicationSchema.parse(data);

        // Store in database
        const application = await prisma.jobApplication.create({
            data: validated,
        });

        // Send email notification
        await sendJobApplicationNotification(
            validated.fullName,
            validated.email,
            validated.position,
            validated.experience,
            validated.resumeUrl
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: application }),
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

        console.error('Job application error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: 'Internal server error' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
};
