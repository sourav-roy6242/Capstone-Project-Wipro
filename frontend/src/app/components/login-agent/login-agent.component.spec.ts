import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAgentComponent } from './login-agent.component';

describe('LoginAgentComponent', () => {
  let component: LoginAgentComponent;
  let fixture: ComponentFixture<LoginAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAgentComponent]
    });
    fixture = TestBed.createComponent(LoginAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
