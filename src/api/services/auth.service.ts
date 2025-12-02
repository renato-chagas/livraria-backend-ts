import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET as string;

export class AuthService { 
    
    // Hash da senha (Cadastro)
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    // Comparar senha (Login)
    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    // Gerar Token
    static generateToken(payload: object): string {
        return jwt.sign(payload, SECRET, { expiresIn: '1d' }); 
    }

    // Verificar Token (Middleware)
    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, SECRET);
        } catch (error) {
            return null;
        }
    }
}