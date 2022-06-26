import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService{
   constructor(private prisma: PrismaService) {}

   async signup(dto: AuthDto){
      // create user password hash using argon
      const hash = await argon.hash(dto.password)

      // save user to database
      try{
         const user = await this.prisma.user.create({
            data:{
               email: dto.email,
               hash
            },
            
         });
         delete user.hash;
         return user;
      }catch(error){
         if (error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){ //prisma error code for duplicated record found in database
               throw new ForbiddenException('Credentials is already taken')
            } 
         } throw error;
         
         
      }
      
      }
   
   async signin(dto: AuthDto){
      //we have to find user by email
      const user = await this.prisma.user.findUnique({
         where: {
            email: dto.email
         }
      });
      //if user does not exist throw exception
      if(!user) throw new ForbiddenException ('Credentials incorrect')
      
      //compare password
      const passwdMatch = await argon.verify(user.hash, dto.password);

      //if password incorect throw exception
      if (!passwdMatch) throw new ForbiddenException('Password incorrect')

      //send back user
      delete user.hash;
      return user;

   }


   
}