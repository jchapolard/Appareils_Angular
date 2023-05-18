import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	isAuth = false;
	date: Date = new Date();
	isDate: boolean = false;
	interval: any;
	minute: number = 0;
	seconde: number = 0;
	
	signIn() {
		return new Promise(
			(resolve, reject) => {
				setTimeout(
					() => {
						this.isAuth = true;
						resolve(true);
					}, 1000
				);
			}
		);
	}

	signOut() {
		this.isAuth = false;
		this.isDate = false;
	}
	
	dateSignIn() {
		return new Promise<Date>((resolve, reject) => {
			setTimeout(() => {
				if(this.isDate === false ) {
					this.date = new Date();
					this.isDate = true;
				}
					resolve(this.date);
			}, 1000);
		});
	}
	
	onInterval() {
		if(this.isAuth === true) {
			this.interval = setInterval(() => { 
				if (this.minute < 3) {
					this.seconde++;
					if (this.seconde === 60){
						this.minute++;
						this.seconde = 0;
					}
				} else {
					this.signOut();
					this.stopInterval();				
				}
			}, 1000);
		}
		
	}
	
	stopInterval() {
		clearInterval(this.interval);
		this.minute = 0;
		this.seconde = 0;
	}
	
	
}