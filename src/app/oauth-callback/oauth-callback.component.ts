

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import {Router} from "@angular/router";

import { Subject, Observable } from "rxjs";
import {MaterializeAction} from "angular2-materialize";
import {AuthService} from "../services/auth.service";

@Component({
  template: ''
})
export class OauthCallbackComponent implements OnInit {
  userSignedIn$:Subject<boolean> = new Subject();
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    private _tokenService: Angular2TokenService,
    private router:Router,
    public authService:AuthService
  ) {}

  ngOnInit() {
    this._tokenService.processOAuthCallback();
    this.userSignedIn$.next(true);
    for(let x in this._tokenService.currentAuthData){
      localStorage.setItem(x, this._tokenService.currentAuthData[x]);
    }

    this.authService.userSignedIn$.next(true)
    this.router.navigateByUrl("/")

    console.log("should be connected now")
  }
}
