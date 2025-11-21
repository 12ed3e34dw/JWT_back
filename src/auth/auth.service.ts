import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private users = [
        {
            id: 1,
            email: 'test@example.com',
            password: bcrypt.hashSync('123456', 10),
            name: 'Test User',
            role: 'user'
        },
    ];

    constructor(private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = this.users.find(u => u.email === email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Неверный email или пароль');

        // 👉 Делаем админа по e-mail
        if (email === process.env.ADMIN_EMAIL) {
            const index = this.users.findIndex(u => u.email === email);
            this.users[index].role = 'admin';
            user.role = 'admin';
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async register(email: string, password: string, name: string) {
        const existingUser = this.users.find(u => u.email === email);
        if (existingUser) throw new UnauthorizedException('Пользователь уже существует');

        const hashedPassword = await bcrypt.hash(password, 10);

        const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';

        const newUser = {
            id: this.users.length + 1,
            email,
            password: hashedPassword,
            name,
            role
        };

        this.users.push(newUser);

        const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };

        return {
            access_token: this.jwtService.sign(payload),
            user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
        };
    }

    async me(user: any) {
        return user;
    }
}
