import { Request, Response } from 'express';
import User from '../../models/userModel/User.js';
import { AuthService } from '../../services/auth.service.js';

export class userController {

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const isPasswordValid = await AuthService.comparePassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const token = AuthService.generateToken({ id: user.id, email: user.email, role: user.role });

            const userResponse = user.toJSON();
            delete userResponse.password;

            res.status(200).json({ token, user: userResponse });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;

            const hashedPassword = await AuthService.hashPassword(password);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            const userResponse = newUser.toJSON();
            delete userResponse.password;

            res.status(201).json(userResponse);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const payload = { ...req.body };

            if (payload.password) {
                payload.password = await AuthService.hashPassword(payload.password);
            }

            const [updated] = await User.update(payload, {
                where: { id }
            });

            if (!updated) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({
                where: { id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}