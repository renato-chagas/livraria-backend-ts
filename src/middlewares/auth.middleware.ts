import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../api/services/auth.service.js';

// Extendendo a interface Request para incluir o usuário autenticado
export interface authRequest extends Request {
    user?: { id: number; email: string; };
}

export const authMiddleare = (req: authRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = decoded as { id: number; email: string; role?: string };

    next();
};