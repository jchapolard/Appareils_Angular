import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription, Observable, from, of } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

	toutAllumer: string = 'Tout allumer';
	toutEteindre: string = 'Tout éteindre';
	// Property binding : modifier dynamiquement les propriétés 
	// d'un élément du DOM en fonction de données dans votre TypeScript.
	// Code TypeScript vers le template HTML
	isAuth: boolean = false;
	
	isOnAllumer: boolean = false;
	titleBtnAllumer: string = this.toutAllumer;
	nbrAppareilOn: number;
	nbrAppareilOff: number;
	
	appareils: any[];
	appareilSubscription: Subscription;
	
	lastUpdate: Observable<Date>;
  	lastUpdateValue: Date;

	constructor(private appareilService: AppareilService) { 
		this.nbrAppareilOn = this.appareilService.nbrAppareilOn;
		this.nbrAppareilOff = this.appareilService.nbrAppareilOff;
		this.appareils = this.appareilService.appareils;
		this.appareilSubscription = new Subscription();

		const date = new Date(); // Obtenir la date actuelle
    	this.lastUpdate = of(date); // Initialiser lastUpdate avec la valeur de la date actuelle
		this.lastUpdateValue = new Date(); // Initialisation avec une valeur par défaut
	}
	
	ngOnInit() {
		//this.appareils = this.appareilService.appareils;
		//this.nbrAppareilOn = this.appareilService.nbrAppareilOn;
		//this.nbrAppareilOff = this.appareilService.nbrAppareilOff;
		
		// Couche d' abstraction entre le service et les components,
		// où les données sont maintenues à jour grâce au Subject.
		this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
			(appareils: any[]) => {
				this.appareils = appareils;
			}
		);
		this.appareilService.emitAppareilSubject();

		const promise = new Promise<Date>((resolve, reject) => {
			const date = new Date();
			setTimeout(() => {
			  resolve(date);
			}, 2000);
		  });
	  
		  this.lastUpdate = from(promise);

		  this.lastUpdate.subscribe(value => {
			this.lastUpdateValue = value;
		  });
	}
	
	// Event binding :  lie une fonction TypeScript à un événement venant du template
	// Click Bouton "Tout allumer"
	onAllumerEteindre() {
		if(this.isOnAllumer){
			if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
				this.appareilService.switchOffAll();
				this.isOnAllumer = false;
				this.titleBtnAllumer = this.toutAllumer;
			} else {
				return null;
			}
		} else {
			this.appareilService.switchOnAll();
			//console.log("On allume tout");
			//alert("On allume tout");
			//window.confirm('On allume tout');
			this.isOnAllumer = true;
			this.titleBtnAllumer = this.toutEteindre;
		}
		// Déclaration de retour par défaut
		return null;
	}
	
	
	
	getNbrAppareilOn(): number {
		this.nbrAppareilOn = 0;
		for(let appareil of this.appareils) {
			if (appareil.status === 'on'){
				this.nbrAppareilOn ++;
			}
		}
		if (this.nbrAppareilOn === 3) {
			this.titleBtnAllumer = this.toutEteindre;
			this.isOnAllumer = true;
		}
		return this.nbrAppareilOn;
	}
	
	getNbrAppareilOff(): number {
		this.nbrAppareilOff = 0;
		for(let appareil of this.appareils) {
			if (appareil.status === 'off'){
				this.nbrAppareilOff ++;
			}
		}
		if (this.nbrAppareilOff === 3) {
			this.titleBtnAllumer = this.toutAllumer;
			this.isOnAllumer = false;
		}
		return this.nbrAppareilOff;
	}
	
	ngOnDestroy() {
		this.appareilSubscription.unsubscribe();
	}  
}
