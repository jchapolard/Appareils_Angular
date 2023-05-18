import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil-component',
  templateUrl: './single-appareil-component.component.html',
  styleUrls: ['./single-appareil-component.component.scss']
})
export class SingleAppareilComponent implements OnInit {

	name: string = 'Appareil';
	status: string = 'Statut';

	constructor(private appareilService: AppareilService,
            private route: ActivatedRoute) { }

	ngOnInit() {
		const id = this.route.snapshot.params['id'];
		this.name = this.appareilService.getAppareilById(+id).name;
		this.status = this.appareilService.getAppareilById(+id).status;
		// Fragment d'URL de type  string , et que la méthode  getAppareilById()  
		// prend un nombre comme argument, utiliser  +  avant  id  dans l'appel 
		// pour caster la variable comme nombre.
	}

}
