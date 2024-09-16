"use server"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { prisma } from '@/lib/db';
import { getCurrentUser } from '../middlewares/login';
import { Role } from '@prisma/client'; 

export async function login({ email, password }: { email: string, password: string }) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select:{
                blogs:false, 
                email: true, 
                password: true, 
                name       :true,
                role       :true,
                linkedIn   :true,  
                github     :true, 
                id: true, 
            }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { success: false, message: 'Invalid credentials' };
        }

        const { password: _, ...userWithoutPassword } = user;

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string, 
            { expiresIn: '7d' }
        );

        return { success: true, user: userWithoutPassword, token };
    } catch (err) {
        console.error('Login error:', err);
        return { success: false, message: 'Something went wrong' };
    }
}


export async function registerUser({ email, password, name, role }: { email: string, password: string, name: string, role: string }) {
    try {
        const currentUser = await getCurrentUser();

        
        if (!currentUser || currentUser.role !== Role.ADMIN) {
            return { success: false, message: 'Unauthorized' };
        }

        if (!Object.values(Role).includes(role as Role)) {
            return { success: false, message: 'Invalid role' };
        }

      
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { success: false, message: 'Email already exists' };
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role as Role, 
            },
        });

        return { success: true, user: newUser };
    } catch (err) {
        console.error('Register error:', err);
        return { success: false, message: 'Failed to register user' };
    }
}