
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard) // ✅ Только для админа
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() body: { email: string; name: string; password: string; role?: string }) {
        return this.usersService.create(body.email, body.password, body.name, body.role);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<{ email: string; name: string; password: string; role: string }>) {
        return this.usersService.update(+id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }
}
