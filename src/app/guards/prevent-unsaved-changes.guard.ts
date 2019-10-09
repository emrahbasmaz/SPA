import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{

    canDeactivate(component:MemberEditComponent){
        if (component.editForm.dirty) {
            return confirm('Are you sure to continue ? Any unsaved changes will be lost !!');            
        }
        return true;
    }
}