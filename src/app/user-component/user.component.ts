import { Component, OnInit, Input } from '@angular/core';
import { UserClass } from '../models/user.class.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	@Input() id: number;
	@Input() index: number;
	@Input() userId: number;
	@Input() userFirstName: string;
	@Input() userLastName: string;
	@Input() userEmail: string;
	@Input() userColorPreference: string;
	@Input() userHobbies: string;
	
	titleEditionUser: string = "Edit user";
	editUser: boolean = false;
	
	
	constructor(private userService: UserService) {
		this.id = 0;
		this.index = 0;
		this.userId = 0;
		this.userFirstName = '';
		this.userLastName = '';
		this.userEmail = '';
		this.userColorPreference = '';
		this.userHobbies = '';
	 }

	ngOnInit(): void {}

  	// Mise à jour de l'user
	onEditUser(): string {
		if(!this.editUser){
			this.editUser = true;
			return this.titleEditionUser = 'Record user';
		} else {
			this.editUser = false;
			//console.log([this.userHobbies]);
			const newUser = new UserClass(
				this.userId,
				this.userFirstName,
				this.userLastName,
				this.userEmail,
				this.userColorPreference,
				[this.userHobbies]
			);
			this.userService.emitUsersEdit(newUser);
			return this.titleEditionUser = 'Edit user';
		}
	}
}
