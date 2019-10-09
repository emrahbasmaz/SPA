import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { ListResolver } from './resolvers/listResolver';
import { MessagesResolver } from './resolvers/messages.resolver';

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path : '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members',component : MemberlistComponent, resolve:{user:MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent, resolve:{user:MemberDetailResolver}},
      {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
      {path: 'messages',component: MessagesComponent , resolve: {messages: MessagesResolver}},
      {path: 'lists', component: ListsComponent, resolve:{users:ListResolver}}
    ]
  },
    // {
    //     path: '',
    //     children: [
    //       {path: 'register', component:RegisterComponent ,
    //         // {path: 'members/:id', component: MemberDetailComponent,
    //         //     resolve: {user: MemberDetailResolver}},
    //         // {path: 'member/edit', component: MemberEditComponent,
    //         //     resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    //         // {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
    //         // {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}
    //     },
    //     ]
    // },
    {path: 'register', component:RegisterComponent},

    {
      //WildCard
          path: '**', 
          redirectTo: '404', 
          pathMatch: 'full'
    },
];