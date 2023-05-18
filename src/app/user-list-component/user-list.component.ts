import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserClass } from '../models/user.class.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

	users: UserClass[];
	userSubscription: Subscription;
	
	constructor(private userService: UserService) { 
		this.users = [];
    	this.userSubscription = new Subscription();
	}

	ngOnInit() {
		this.userSubscription = this.userService.userSubject.subscribe(
			(users: UserClass[]) => {
				this.users = users;
			}
		);
		this.userService.emitUsers();
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}
}