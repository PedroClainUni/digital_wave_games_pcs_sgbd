import { Jwt } from "./jwt.model";

export interface SignInResponse {
    banned?: boolean,
    nextAllowedAccess?: Date,
    jwt?: Jwt
}