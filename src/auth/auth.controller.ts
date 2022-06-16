import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
   constructor(private AuthService: AuthService){}

   @Post('signin')
   singin(){
      return this.AuthService.signin();
   }

   @Post('signup')
   singup(){
      return this.AuthService.signup();
   }

}