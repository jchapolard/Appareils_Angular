import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-appareil-component',
  templateUrl: './edit-appareil-component.component.html',
  styleUrls: ['./edit-appareil-component.component.scss']
})
export class EditAppareilComponent implements OnInit {

	defaultOnOff: string = 'off';
	nbrTotalAppareils: number = 0;
	defaultname: string;
	appareils: any[];
	appareilSubscription: Subscription;
	
	constructor(private appareilService: AppareilService,
				private router: Router ) { 
					this.defaultname = "defaultname";
					this.appareils = this.appareilService.appareils;
					this.appareilSubscription = new Subscription();
				}

	ngOnInit(): void {
		this.nbrTotalAppareils = this.appareilService.totalAppareils;
		
		// Couche d' abstraction entre le service et les components,
		// où les données sont maintenues à jour grâce au Subject.
		this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
			(appareils: any[]) => {
				this.appareils = appareils;
			}
		);
		this.appareilService.emitAppareilSubject();
	}

	//  Recevoir les informations venant du formulaire
	// Ajout d'un appareil
	onSubmit(form: NgForm) {
		//console.log(form.value);
		//alert(form.value.name + " - " + form.value.status);
		const name = form.value['name'];
		const status = form.value['status'];
		this.appareilService.addAppareil(name, status);
		this.router.navigate(['/appareils']);
	}
	
	// Suppression d'un appareil
	onSubmitDelete(form: NgForm){
		const itemAppareil = form.value['itemAppareil'];
		//console.log(form.value);
		confirm('Vouhaitez-vous supprimer l\'appareil : ' +  form.value.itemAppareil.name + ' ?');
		this.appareilService.deleteAppareil(itemAppareil);
	}
}
