import { Injectable } from '@angular/core';
import { UserClass } from '../models/user.class.model';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {
	
	//private users: User[];
	private users: UserClass[] = [
		new UserClass(0, 'Will', 'Alexander', 'will@will.com', 'bleu', ['coder', 'aller courir'])
	];
	userSubject = new Subject<UserClass[]>();
	listColor: string[] = ['brown', 'purpule', 'bleu', 'green', 'yellow', 'orange', 'red'];
	totalUsers: number = 0;
	lastUserId: number = 0;
	
	constructor() {}
	
	// déclenche le Subject
	emitUsers(){
	//console.log("us : "+ this.users[0].firstName);
		this.userSubject.next(this.users.slice());
		this.totalUsers = this.users.length;
		for(let user of this.users){
			this.lastUserId = user.id;
		}
	}
	
	// Mise à jour d'un user
	emitUsersEdit(userObject: UserClass){
		for(let user of this.users){
			if(user.id === userObject.id){
				user.firstName = userObject.firstName;
				user.lastName = userObject.lastName;
				user.email = userObject.email;
				user.colorPreference = userObject.colorPreference;
				user.hobbies = userObject.hobbies;
				break;
			}
		}
	}
	
	// Ajout d'un utilisateur à la liste
	addUser(user: UserClass){
		this.users.push(user);
		this.emitUsers();
	}
	
}
