import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/AlertifyService.service';
import { UserService } from '../services/UserService.service';
import { AuthService } from '../services/AuthService.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Pagination, PaginatedResult } from '../models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() recipientId;
  
  messages: Message[];
  pagination: Pagination;
  messageContainer = "Unread";

  constructor(private root: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.root.data.subscribe((data:any) =>{
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }
      
  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
                                 this.pagination.itemsPerPage,this.messageContainer)
    .subscribe((response: PaginatedResult<Message[]>) => {
      this.messages = response.result;
      this.pagination = response.pagination;
    },error =>{
      this.alertify.error(error);
    });
  }


  deleteMessage(id){
      this.alertify.confirm('Are you sure ?', () => {
        this.userService.deleteMessage(this.authService.decodedToken.nameid,id)
        .subscribe(() => {
          this.messages.splice(this.messages.findIndex(m=> m.id === id),1);
          this.alertify.success('deleted...');
        });
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
