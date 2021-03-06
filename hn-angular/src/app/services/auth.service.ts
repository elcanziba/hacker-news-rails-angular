import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { Subject, Observable } from "rxjs";
import { Response } from "@angular/http";

@Injectable()
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();
  admin$:Subject<boolean> = new Subject();


  constructor(public authService:Angular2TokenService) {

    this.authService.validateToken().subscribe(
        res => {
          if (res.status == 200){
            if(res.json().success){
              this.userSignedIn$.next(true)
              if(this.authService.currentUserData["admin"]){
                this.admin$.next(true)
              }else{
                this.admin$.next(false)
              }
            }else{
              this.userSignedIn$.next(false)
              this.admin$.next(false)
            }
          }
          else{
            this.userSignedIn$.next(false)
            this.admin$.next(false)
          }
        }
    )
  }



  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          this.admin$.next(false)
          return res;
        }
    );
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string, nickname: string}):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$.next(true);

          return res
        }
    );
  }

  logInUser(signInData: {email:string, password:string}):Observable<Response>{

    return this.authService.signIn(signInData).map(
        res => {
          if (res.text() == "false"){

          }else{
            this.userSignedIn$.next(true);
            if(this.authService.currentUserData["admin"]){
              this.admin$.next(true)
            }
            return res
          }

        }
    );

  }

}
