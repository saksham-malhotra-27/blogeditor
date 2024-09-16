import { cookies } from 'next/headers'; 
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';

export async function getCurrentUser() {
    try {
        const token = cookies().get('token')?.value; 

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        return user;
    } catch (err) {
        console.error('Error decoding token:', err);
        return null;
    }
}
