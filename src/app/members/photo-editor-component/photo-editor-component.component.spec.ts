import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEditorComponentComponent } from './photo-editor-component.component';

describe('PhotoEditorComponentComponent', () => {
  let component: PhotoEditorComponentComponent;
  let fixture: ComponentFixture<PhotoEditorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoEditorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEditorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
