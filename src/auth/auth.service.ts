import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
   constructor(private prisma: PrismaService) {}

   signup(){
      return {msg:"You have been signup"}
   }
   
   signin(){
      return {msg:"You have been signin"}
   }


   
}