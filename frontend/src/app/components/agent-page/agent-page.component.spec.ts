import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPageComponent } from './agent-page.component';

describe('AgentPageComponent', () => {
  let component: AgentPageComponent;
  let fixture: ComponentFixture<AgentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentPageComponent]
    });
    fixture = TestBed.createComponent(AgentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
