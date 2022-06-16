import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
   constructor(private AuthService: AuthService){}


   @Post('signup')
   singup(@Body() dto: AuthDto){
      console.log({
         dto,
      })
      return this.AuthService.signup();
   }


   @Post('signin')
   singin(){
      return this.AuthService.signin();
   }



}