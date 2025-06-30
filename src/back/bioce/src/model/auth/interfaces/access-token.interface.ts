import { TokenJwt } from "../types/token-jwt.type";

export interface AccessToken {
    userId: number,
    username: string,
    accessToken: TokenJwt;
}