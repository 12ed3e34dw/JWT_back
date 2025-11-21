// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            email: 'test@example.com',
            password: bcrypt.hashSync('123456', 10),
            name: 'Test User',
            role: 'user',
        },
    ];

    findAll() {
        return this.users.map(u => ({ ...u, password: undefined }));
    }

    findOne(id: number) {
        const user = this.users.find(u => u.id === id);
        if (!user) throw new NotFoundException('Пользователь не найден');
        return { ...user, password: undefined };
    }

    create(email: string, password: string, name: string, role: string = 'user') {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: this.users.length + 1,
            email,
            password: hashedPassword,
            name,
            role,
        };
        this.users.push(newUser);
        return { ...newUser, password: undefined };
    }

    update(id: number, data: Partial<{ email: string; name: string; password: string; role: string }>) {
        const user = this.users.find(u => u.id === id);
        if (!user) throw new NotFoundException('Пользователь не найден');

        if (data.password) data.password = bcrypt.hashSync(data.password, 10);
        Object.assign(user, data);

        return { ...user, password: undefined };
    }

    delete(id: number) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) throw new NotFoundException('Пользователь не найден');
        const deleted = this.users.splice(index, 1)[0];
        return { ...deleted, password: undefined };
    }
}
