import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from "angular2-social-login";

import {AuthService as Auth} from "../services/auth.service";

import { Angular2TokenService } from "angular2-token";


@Component({
    selector: 'facebook-login',
    templateUrl: 'facebooklogin.component.html'
})

export class FacebookloginComponent implements OnInit {
  @Output() onFormResult = new EventEmitter<any>();

    signInUser = {
      email: '',
      password: ''
    };

    signUpUser = {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: ''
    };
    constructor(
        public _auth: AuthService,
        public authService: Auth,
        public _tokenService: Angular2TokenService
    ) {

    }
    onGoogleLoginClick() {
      this._tokenService.signInOAuth(
        'google_oauth2'
        ).subscribe(
            res => {
              console.log("lkmlk", res)
              this.onFormResult.emit({signedUp: true, res})
            },
            error => {
              console.log(error)
            }
        );
    }

    onFacebookLoginClick() {
      this._tokenService.signInOAuth(
        'facebook'
        ).subscribe(
            res => {
              console.log("lkmlk", res)
              this.onFormResult.emit({signedUp: true, res})
            },
            error => {
              console.log(error)
            }
        );
    }

    login(provider: string) {
      this._auth.login(provider).subscribe(
        (data) => {
          console.log("mkmlkm",data);
          this.signInUser.email = data["email"]
          this.signInUser.password = data["token"].substr(0,8)
          // todo signIn or login with rails app
          this.authService.logInUser(this.signInUser).subscribe(
              res => {
                if(res.status == 200){
                  console.log("Already signed in")
                  this.onFormResult.emit({signedUp: true, res})
                }
              },
              err => {
                console.log('err:', err);
                this.signUpUser.email = data["email"]
                this.signUpUser.password = data["token"].substr(0,8)
                this.signUpUser.passwordConfirmation = data["token"].substr(0,8)
                this.signUpUser.nickname = data["name"]
                this.authService.registerUser(this.signUpUser).subscribe(

                    (res) => {

                      if (res.status == 200){
                        console.log("Signed in")
                        this.onFormResult.emit({signedUp: true, res})

                      }

                    },

                    (err) => {
                      console.log(err.json())
                      this.onFormResult.emit({signedUp: false, err})

                    }
                )
              }
          );
        }
      )
    }

    statusChangeCallback(resp) {
      console.log(resp)

        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log(resp)
        }else if (resp.status === 'not_authorized') {

        }else {

        }
    };

    ngOnInit() {

    }
}
