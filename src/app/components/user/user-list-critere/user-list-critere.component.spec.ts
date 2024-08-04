import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListCritereComponent } from './user-list-critere.component';

describe('UserListCritereComponent', () => {
  let component: UserListCritereComponent;
  let fixture: ComponentFixture<UserListCritereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListCritereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
