import { AuthGuard } from './guards/auth.guard';
import { appRoutes } from './route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/AuthService.service.js';
import { ValuesService } from './services/ValuesService.service.js';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';

import { NgxGalleryModule } from 'ngx-gallery';
import { AlertifyService } from './services/AlertifyService.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule, TabsModule, PaginationModule, ButtonsModule} from 'ngx-bootstrap';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { UserService } from './services/UserService.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponentComponent } from './members/photo-editor-component/photo-editor-component.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ListResolver } from './resolvers/listResolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    MemberlistComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponentComponent,
    TimeAgoPipe,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,    
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter
      },    
  }),
  TabsModule.forRoot(),
  NgxGalleryModule,
  FileUploadModule,
  PaginationModule.forRoot(),
  ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    ValuesService,
    AlertifyService,
    JwtHelperService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    ListResolver,
    MessagesResolver
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
