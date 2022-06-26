import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import{Request} from 'express'
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
   constructor(private AuthService: AuthService){}


   @Post('signup')
   singup(@Body() dto:AuthDto){
      return this.AuthService.signup(dto);
   }


   @Post('signin')
   singin(@Body() dto:AuthDto){
      return this.AuthService.signin(dto);
   }



}