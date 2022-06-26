import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    singup(dto: AuthDto): Promise<import(".prisma/client").User>;
    singin(dto: AuthDto): Promise<import(".prisma/client").User>;
}
