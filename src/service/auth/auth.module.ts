import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import 'dotenv/config';
import {JwtModule, JwtService} from '@nestjs/jwt';

console.log(process.env.JWT_SECRET)
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '12h' },
        }),
    ],
    controllers: [],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}