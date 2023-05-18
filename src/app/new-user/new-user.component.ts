import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserClass } from '../models/user.class.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})

// formulaire réactif
// Création de l'objet du Formulaire
export class NewUserComponent implements OnInit {

	userForm: FormGroup;
	listColor: string[];
	color: string;
	indexHobby: number;
	listHobbies: string[];
	
	constructor(private formBuilder: FormBuilder,
				private userService: UserService,
				private router: Router ) { 
					this.userForm = this.formBuilder.group({
						firstName: 		['', Validators.required],
						lastName: 		['', Validators.required],
						email: 			['', [Validators.required, Validators.email]],
						colorPreference: ['', Validators.required],
						hobbies: 		this.formBuilder.array([])
					  });
				  
					  this.listColor = [];
					  this.color = '';
					  this.indexHobby = 0;
					  this.listHobbies = [];
				}

	ngOnInit() {
		//this.initForm();
		this.listColor = this.userService.listColor;
	}
	
	/*initForm() {
		this.userForm = this.formBuilder.group({
			firstName: 		['', Validators.required],
			lastName: 		['', Validators.required],
			email: 			['', [Validators.required, Validators.email]],
			colorPreference: ['', Validators.required],
			hobbies: 		this.formBuilder.array([])
		});
	} */
	
	getHobbies(): FormArray {
		return this.userForm.get('hobbies') as FormArray;
	}

	onAddHobby() {
		const newHobbyControl = this.formBuilder.control(null, Validators.required);
		this.getHobbies().push(newHobbyControl);
	}

	// Ajout d'un nouvel utilisateur
	onSubmitForm() {
		const totalUserNumber = this.userService.lastUserId +1;
		const formValue = this.userForm.value;
		//console.log(formValue['hobbies']);
		const newUser = new UserClass(
			totalUserNumber,
			formValue['firstName'],
			formValue['lastName'],
			formValue['email'],
			formValue['colorPreference'],
			formValue['hobbies'] ? formValue['hobbies'] : []
		);
		this.userService.addUser(newUser);
		this.router.navigate(['/users']);
	}
	
	// Suppression d'un Input Hobbies
	closeInputHobby(idItemHobby: number){
		this.listHobbies = new Array();
		this.indexHobby = 0;
		for(let inputHobby of this.getHobbies().controls){
			if(this.indexHobby !== idItemHobby){
				this.listHobbies.push(inputHobby.value);
			}
			this.indexHobby++;
		}
			this.userForm = this.formBuilder.group({
				hobbies: this.formBuilder.array(this.listHobbies)
			});
	}
}