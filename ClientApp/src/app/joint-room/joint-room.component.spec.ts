import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointRoomComponent } from './joint-room.component';

describe('JointRoomComponent', () => {
  let component: JointRoomComponent;
  let fixture: ComponentFixture<JointRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JointRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JointRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
