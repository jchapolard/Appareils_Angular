import { BrowserModule } 			from '@angular/platform-browser';
import { NgModule } 				from '@angular/core';
import { FormsModule } 				from '@angular/forms';
import { ReactiveFormsModule }		from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppareilService } 			from './services/appareil.service';
import { AuthService } 				from './services/auth.service';
import { AuthGuard } 				from './services/auth-guard.service';
import { UserService } 				from './services/user.service';

import { AppRoutingModule } 		from './app-routing.module';
import { Routes } 					from '@angular/router';
import { RouterModule } 			from '@angular/router';

import { AppComponent } 			from './app.component';
import { AppareilComponent } 		from './appareil/appareil.component';
import { AuthComponent } 			from './auth/auth.component';
import { AppareilViewComponent } 	from './appareil-view/appareil-view.component';
import { SingleAppareilComponent } 	from './single-appareil-component/single-appareil-component.component';
import { Component404Component } 	from './component404/component404.component';
import { EditAppareilComponent } 	from './edit-appareil-component/edit-appareil-component.component';
import { UserListComponent } 		from './user-list-component/user-list.component';
import { NewUserComponent } 		from './new-user/new-user.component';
import { UserComponent } 			from './user-component/user.component';

const appRoutes: Routes = [
	{ path: 'editAppareils', 	canActivate: [AuthGuard], component: EditAppareilComponent },
	{ path: 'appareils', 		  canActivate: [AuthGuard], component: AppareilViewComponent },
	{ path: 'appareils/:id', 	canActivate: [AuthGuard], component: SingleAppareilComponent },
	{ path: 'auth', 			    component: AuthComponent },
	{ path: 'users', 			    component: UserListComponent },
	{ path: 'new-user', 		  component: NewUserComponent },
	
	{ path: '', 				      component: AppareilViewComponent }, // racine de l'application seule
	{ path: 'not-found', 		  component: Component404Component },
	{ path: '**', 				    redirectTo: 'not-found' }
]; 

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    Component404Component,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [
	AppareilService,
	AuthService,
	AuthGuard,
	UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
