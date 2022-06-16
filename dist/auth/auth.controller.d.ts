import { AuthService } from "./auth.service";
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    singin(): {
        msg: string;
    };
    singup(): {
        msg: string;
    };
}
