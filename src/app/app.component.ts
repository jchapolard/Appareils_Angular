import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	
	title: string = 'Projet CRUD Device';
	interval: any;
	seconde: number = 0;
	minute: number = 0;
	authStatus : boolean;
	secondes: number = 0;
	counterSubscription: Subscription;
	counter: any;
	values: number = 0;
	
	constructor( private authService: AuthService ) { 
		this.counterSubscription = new Subscription();
		this.authStatus = this.authService.isAuth;
	}

	ngOnInit() { 
		this.authStatus = this.authService.isAuth;
		
		if(this.authStatus === true){
			this.interval = setInterval(() => {
				this.minute = this.authService.minute;
				this.seconde = this.authService.seconde;
			}, 1000);
		} else {
			clearInterval(this.interval);
			
			/* this.counter = setInterval(() => {
				this.values++;
				this.secondes = this.values;
			}, 1000); */
			
			// Connection depuis load page
			this.counter = interval(1000);
			
			this.counterSubscription = this.counter.subscribe(
				(value: number) => { // se déclenche à chaque fois que l'Observable émet de nouvelles données
					this.secondes = value;
					
					/*if(value === 20){
						this.secondes = 0;
						this.ngOnDestroy();
					} */
				},
				(error: string) => { // se déclenche si l'Observable émet une erreur
					alert('Error : ' + error);
					this.ngOnDestroy();
				},
				() => { // déclenchera si l'Observable s'achève
					alert('Observable completed');
				}
			);
		}	
	}
	
	ngOnDestroy() {
		this.counter = this.counterSubscription.unsubscribe();		
		this.counterSubscription.unsubscribe();
	}
}
