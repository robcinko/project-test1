import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

   signin(){
      return {msg:"You have been signin"}
   }

   signup(){
      return {msg:"You have been signup"}
   }
}