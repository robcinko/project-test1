import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    singup(dto: AuthDto): {
        msg: string;
    };
    singin(): {
        msg: string;
    };
}
