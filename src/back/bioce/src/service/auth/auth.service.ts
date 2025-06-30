import {HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import {Usuario} from "../../model/usuario/usuario.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {MensagensUsuario} from "../../model/usuario/utils/mensagens-usuario";
import {TokenJwt} from "../../model/auth/types/token-jwt.type";
import {AccessToken} from "../../model/auth/interfaces/access-token.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async login(usuario: Usuario, providedPassword: string): Promise<AccessToken> {
        const { senha, salt } = usuario;
        const hashedProvidedPassword: string = await bcrypt.hash(providedPassword, salt);
        if (senha != hashedProvidedPassword) {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                message: MensagensUsuario.EMAIL_OU_SENHA_INCORRETOS
            });
        }
        const tokenJwt: TokenJwt = await this.jwtService.sign({
            sub: usuario.id, username: usuario.username
        });
        return {
            userId: usuario.id,
            username: usuario.username,
            accessToken: tokenJwt
        };
    }
}
