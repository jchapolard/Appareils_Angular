import { Subject } from 'rxjs';
import { IAppareil } from './interface.appareil';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {
	
	nbrAppareilOn: number = 0;
	nbrAppareilOff: number = 0;
	totalAppareils: number = 0;
	// Subject : Variable qui peut �tre modifi� depuis plusieurs components 
	// ET qui fera r�agir tous les components qui y sont li�s en m�me temps.
	appareilsSubject = new Subject<IAppareil[]>();
	urlFireBaseAppareils: string = 'https://fire-jcd1985.firebaseio.com/appareils.json';
	idFireBase: number;
	appareils: any[] = [];
	/*private appareils = [
		{
			id: 1,
			name: 'Machine a laver',
			status: 'off'
		},
		{
			id: 2,
			name: 'Frigo',
			status: 'on'
		},
		{
			id: 3,
			name: 'Ordinateur',
			status: 'off'
		}
	]; */

	constructor(private httpClient: HttpClient) {
		this.idFireBase = 0;
		// TODO: r�cup�rer les appareils 
		this.appareils = this.getAppareilsFromServer();
		alert("constructor, this.appareils.length : "+ this.appareils.length);
		/*if(this.appareils.length == 0){
			this.appareils = [
				{
					id: 1,
					name: 'Machine a laver',
					status: 'off'
				},
				{
					id: 2,
					name: 'Frigo',
					status: 'on'
				},
				{
					id: 3,
					name: 'Ordinateur',
					status: 'off'
				}
			];
			
			this.saveAppareilsToServer();
			this.upDateAppareilsToServer();
		}
		for(let appareil of this.appareils) {
			if (appareil.status === 'on'){
				this.nbrAppareilOn ++;
			} else {
				this.nbrAppareilOff ++;
			}
		} */
		//this.getAppareilsFromServer();
		//Enregistrement pour la 1ere fois sur le serveur Firebase
		/*this.deleteAppareilsToServer();
		this.saveAppareilsToServer();
		this.upDateAppareilsToServer(); */
	}
	
	// Couche d'abstraction entre le service et les components,
	// o� les donn�es sont maintenues � jour gr�ce au Subject.
	emitAppareilSubject(){
		
		if(this.appareils.length == 0){
			this.appareils = [
				{
					id: 1,
					name: 'Machine a laver',
					status: 'off'
				},
				{
					id: 2,
					name: 'Frigo',
					status: 'on'
				},
				{
					id: 3,
					name: 'Ordinateur',
					status: 'off'
				}
			];
			
			this.saveAppareilsToServer();
			this.upDateAppareilsToServer();
		}
		for(let appareil of this.appareils) {
			if (appareil.status === 'on'){
				this.nbrAppareilOn ++;
			} else {
				this.nbrAppareilOff ++;
			}
		}
		
		
		
		
	alert("emitAppareilSubject2, this.appareils.length : "+ this.appareils.length);
		this.appareilsSubject.next(this.appareils.slice()); // slice() -> Select elements from an array:
		this.totalAppareils = 0;
		for(let appareil of this.appareils) {
			this.totalAppareils++;
		}
	}
	
	// R�cup�ration de l'appareil correspondant � un identifiant
	getAppareilById(id: number) {
		const appareil = this.appareils.find(
			(s) => {
				return s.id === id;
			}
		);
		return appareil;
	}
  
	// M�todes global pour allumer ou �teindre les appareils.
	// Appell� dans app.component : onAllumerEteindre()
	switchOnAll() {
		for(let appareil of this.appareils) {
			appareil.status = 'on';
			this.emitAppareilSubject();
		}
	}
	switchOffAll() {
		for(let appareil of this.appareils) {
			appareil.status = 'off';
			this.emitAppareilSubject();
		}
	}
	
	// M�thode pour allumer ou �teindre un seul appareil
	switchOnOne(i: number) {
		this.appareils[i].status = 'on';
		this.emitAppareilSubject();
		
		this.nbrAppareilOn ++;
		if (this.nbrAppareilOff > 0){
			this.nbrAppareilOff --;
		}
	}

	switchOffOne(i: number) {
		this.appareils[i].status = 'off';
		this.emitAppareilSubject();
		
		this.nbrAppareilOff ++;
		if (this.nbrAppareilOn > 0){
			this.nbrAppareilOn --;
		}
	}
	
	// G�n�ration d'un nouvel appareil
	addAppareil(name: string, status: string){
		const appareilObject = {
			id: 0,
			name: '',
			status: ''
		};
		appareilObject.id = this.appareils[(this.appareils.length -1)].id + 1;
		appareilObject.name = name;
		appareilObject.status = status;
		this.appareils.push(appareilObject); // Ajout du nouvel appareil
		this.emitAppareilSubject();	// Mise � jour de la liste des appareils
		//this.saveAppareilsToServer(appareilObject);
		// TODO: ajout d'un appareil et non pas suppression puis tout recr�er
		//this.deleteAppareilsToServer();
		//this.saveAppareilsToServer();
		
		const newAppareils = [
			{
				id: appareilObject.id,
				name: appareilObject.name,
				status : appareilObject.status
			}
		];
		this.saveAppareilToServer(newAppareils);
		this.upDateAppareilsToServer();
	}
	
	// Suppression d'un appareil
	deleteAppareil(itemAppareil: any){
		for(let appareil of this.appareils) {
			if(appareil.id === itemAppareil.id){
			// Splice : add/remove item -> position, number to remove, object to add
				this.appareils.splice(appareil.id -1, 1);
				this.idFireBase = appareil.id -1;
				break;
			}
		}
		this.emitAppareilSubject();
		this.deleteOneAppareilToServer(this.idFireBase);
	}
	
	// Mise � jour du nom de l'appareil
	upDateName(itemAppareil: any){
		const appareilObject = {
			id: 0,
			name: '',
			status: ''
		};
		for(let appareil of this.appareils) {
			if(appareil.id === itemAppareil.id){
				appareilObject.id = itemAppareil.id;
				appareilObject.name = itemAppareil.name;
				appareilObject.status = itemAppareil.status;
				// Splice : add/remove item -> position, number to remove, object to add
				this.appareils.splice(appareil.id -1, 1, appareilObject);
				break;
			}
		}
		this.emitAppareilSubject();
		this.upDateAppareilsToServer();
	}
	
	// Http - UpDate Appareils
	upDateAppareilsToServer() {
		this.httpClient
			.put(this.urlFireBaseAppareils, this.appareils)
			.subscribe(
			() => {
				console.log('Enregistrement termin� !');
			},
			(error) => {
				console.log('Erreur ! : ' + error);
			}
		);
	}
	
	// HTTP - Save Appareils
	// post cr�ation et put mise � jour
	saveAppareilsToServer() {
		this.httpClient
			//.post('https://httpclient-demo.firebaseio.com/appareils.json', this.appareils)
			.post(this.urlFireBaseAppareils, this.appareils)
			.subscribe(
			() => {
				console.log('Enregistrement termin� !');
			},
			(error) => {
				console.log('Erreur ! : ' + error);
			}
		);
	}
	
	saveAppareilToServer(newAppareils: any){
		this.httpClient
			.post(this.urlFireBaseAppareils, newAppareils)
			.subscribe(
			() => {
				console.log('Enregistrement termin� !');
			},
			(error) => {
				console.log('Erreur ! : ' + error);
			}
		);
	}
	
	// HTTP - Suppression de tous les Appareils
	deleteAppareilsToServer(){
		this.httpClient
			.delete(this.urlFireBaseAppareils)
			.subscribe(
			() => {
				console.log('Enregistrement termin� !');
			},
			(error) => {
				console.log('Erreur ! : ' + error);
			}
		);
	}
	
	deleteOneAppareilToServer(idFireBase: number){
		alert("deleteOneAppareilToServer = " + idFireBase);
		this.httpClient
			.delete('https://fire-jcd1985.firebaseio.com/appareils/'+ idFireBase + '.json')
			.subscribe(
			() => {
				console.log('Enregistrement termin� !');
			},
			(error) => {
				console.log('Erreur ! : ' + error);
			}
		);
	}
	
	// Http - Get, recevoir depuis le backend
	getAppareilsFromServer(): any {
	this.httpClient
		.get<any[]>(this.urlFireBaseAppareils)
		.subscribe(
			(response) => {
				this.appareils = response;
				console.log(response);
				alert("getAppareilsFromServer, this.appareils.length : "+ this.appareils.length);
				this.emitAppareilSubject();
				return this.appareils;
			},
			(error) => {
				console.log('Erreur ! : ' + error);
			}
		);
		return this.appareils;
	}
}