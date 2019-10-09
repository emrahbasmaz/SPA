import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

export function redirectToHome(activateRouteSnapshot: ActivatedRouteSnapshot,
  routerStateSnapshot: RouterStateSnapshot) {
  if (routerStateSnapshot['_routerState'].url.length > 1) {
    return {
      navigationCommands: ['/home'],
      navigationExtras: {
        queryParams: { 'url': routerStateSnapshot['_routerState'].url }
      }
    };
  }
  else
    return '/home';

}

 const routes: Routes = [
  {
    path: '', component: AppComponent,
    data: {
      permissions: {
        redirectTo: redirectToHome
      }
    }
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {path: 'register', component:RegisterComponent},
  {path: 'members', component: MemberlistComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
