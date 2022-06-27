import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{
   constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

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

         return this.signToken(user.id, user.email);

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
      return this.signToken(user.id, user.email);

   }
   // create token for user, that means user dont have to singin again for 15 minutes
   async signToken (userId: number, email: string): Promise<{access_token: string}> {
      const paylod = {
         sub: userId,
         email
      }
      const secret = this.config.get('JWT_SECRET')
      const token = await this.jwt.signAsync(
         paylod,
          {
         expiresIn: '15m',
         secret: secret,
          },
      );
         
      return {
         access_token: token
      }
   }
   


   
}