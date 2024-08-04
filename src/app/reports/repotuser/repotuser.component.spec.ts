import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepotuserComponent } from './repotuser.component';

describe('RepotuserComponent', () => {
  let component: RepotuserComponent;
  let fixture: ComponentFixture<RepotuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepotuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepotuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
