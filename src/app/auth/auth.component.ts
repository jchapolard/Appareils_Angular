import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

	authStatus: boolean;
	//dateFrom: Date;
	interval: any;
	seconde: number = 0;
	minute: number = 0;
	
	constructor( private authService: AuthService,
				private router: Router,
				private appComponent: AppComponent ) { 
		this.authStatus = this.authService.isAuth;
		//this.dateFrom = new Date();
	}

	ngOnInit() { 
		this.interval = setInterval(() => { 
			this.minute = this.authService.minute;
			this.seconde = this.authService.seconde;
			this.authStatus = this.authService.isAuth;
		}, 1000);
		
		if(this.authStatus === false) {
			this.stopInterval();
		}
		
		
		/*if(this.authStatus === true) {
			if(this.authService.minute != 0){
				this.minute = this.authService.minute;
			}
			if(this.authService.seconde != 0){
				this.seconde = this.authService.seconde;
			}
			//alert(this.seconde);
			this.interval = setInterval(() => { 
				if (this.minute < 3) {
					this.seconde++;
					if (this.seconde === 15){
						this.minute++;
						this.seconde = 0;
					}
					this.authService.minute = this.minute;
					this.authService.seconde = this.seconde;
				} else {
					this.onSignOut();
					this.stopInterval();
					//this.router.navigate(['auth']);					
				}
			}, 1000);
		} */
		
	}

	onSignIn() {
		this.authService.signIn().then(
		  () => {
			//console.log('Sign in successful!');
			this.authStatus = this.authService.isAuth;
			this.authService.onInterval(); // Démarage du compteur
			this.appComponent.ngOnInit();
			this.router.navigate(['appareils']);
			
		  }
		);
	}

	onSignOut() {
		this.authService.signOut();
		this.authStatus = this.authService.isAuth;
		this.stopInterval();
	}
	
	stopInterval() {
		clearInterval(this.interval);
		this.minute = 0;
		this.seconde = 0;
		this.authService.stopInterval();
	}
	
	// Garde la dernière date d'authentification
	lastUp = this.authService.dateSignIn();

	/*
	// Màj de la date d'auth à chaque retour sur la page
	lastUpdate = new Promise((resolve, reject) => {
		const date = new Date();
		setTimeout(
		  () => {
			resolve(date);
		  },
		);
	}); */
}
