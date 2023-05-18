import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

	// Interpolation : émettre des données issues de votre code TypeScript
	//appareilName: string = 'Machine à laver';
	//appareilStatus: string = 'off';
	
	// Propriétés personnalisées
	@Input() appareilName: string;
	@Input() appareilStatus : string;
	@Input() index: number;
	@Input() id: number;
	
	@Input() nbrAppareilOn: number;
	@Input() nbrAppareilOff: number;
	
	titleEditionName: string = "Edit name";
	editName: boolean = false;
	
	titleBtnAllumerAppareil: string = "Allumer ";
	
	
	constructor(private appareilService: AppareilService) { 
		this.appareilName = "DeviceName";
		this.appareilStatus = "off";
		this.index = 0;
		this.id = 0;
		this.nbrAppareilOn = this.appareilService.nbrAppareilOn;
		this.nbrAppareilOff = this.appareilService.nbrAppareilOff;
	}
	ngOnInit(): void { }

	getStatus(){
			return this.appareilStatus;
	}
	
	getColor() {
		if(this.appareilStatus === 'on') {
		  return 'green';
		} else if(this.appareilStatus === 'off') {
		  return 'red';
		} else {
			return 'gray'; // Valeur par défaut si aucune condition n'est satisfaite
		}
	}

	getNbrAppareilOn () {
		this.appareilService.nbrAppareilOn = 0;
		this.appareilService.nbrAppareilOff = 0;
		
		if (this.appareilStatus === 'on'){
			this.appareilService.nbrAppareilOn = 1;
		} else {
			this.appareilService.nbrAppareilOff = 1;
		}
		return this.appareilService.nbrAppareilOn;
	}
	
	getNbrAppareilOff () {
		this.appareilService.nbrAppareilOn = 0;
		this.appareilService.nbrAppareilOff = 0;
		
		if (this.appareilStatus === 'on'){
			this.appareilService.nbrAppareilOn = 1;
		} else {
			this.appareilService.nbrAppareilOff = 1;
		}
		return this.appareilService.nbrAppareilOff;
	}
	
	// Méthode qui permet d'allumer ou éteindre un seul appareil
	onSwitch() {
		if(this.appareilStatus === 'on') {
			this.appareilService.switchOffOne(this.index);
			this.titleBtnAllumerAppareil = "Allumer ";
			
			/*this.appareilService.nbrAppareilOn ++;
			if (this.appareilService.nbrAppareilOff > 0){
				this.appareilService.nbrAppareilOff --;			
			} */
			
		} else if(this.appareilStatus === 'off') {
			this.appareilService.switchOnOne(this.index);
			this.titleBtnAllumerAppareil = "Eteindre ";
			
			/*this.appareilService.nbrAppareilOff ++;
			if (this.appareilService.nbrAppareilOn > 0){
				this.appareilService.nbrAppareilOn --;
			} */
		}
	}
	
	onEditNameAppareil(): string {
		if(this.editName === false){
			this.editName = true;
			return this.titleEditionName = "Record name";
		
		// Mise à jour du nom et status de l'appareil
		} else if(this.editName === true){
			this.editName = false;
			const itemAppareil = {
				id: this.id,
				name: this.appareilName,
				status: this.appareilStatus
			};
			this.appareilService.upDateName(itemAppareil);
			return this.titleEditionName = "Edit name";
		} else{
			// Déclaration de retour par défaut
  			return "Error : appareil.component : onEditNameAppareil()";
		}
	}
}
