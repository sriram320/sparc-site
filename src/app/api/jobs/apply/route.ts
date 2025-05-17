import { prisma } from '@/lib/prisma';
import { sendJobApplicationNotification } from '@/lib/email';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const jobApplicationSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    position: z.string().min(2, 'Position must be at least 2 characters'),
    experience: z.string().min(10, 'Experience details must be at least 10 characters'),
    resumeUrl: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const data = await req.json();
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

        return new Response(JSON.stringify({ success: true, data: application }), {
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

        console.error('Job application error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET() {
    try {
        const applications = await prisma.jobApplication.findMany();
        return new Response(JSON.stringify({ success: true, data: applications }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
