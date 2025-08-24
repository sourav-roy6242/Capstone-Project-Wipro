import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginAgentComponent } from './components/login-agent/login-agent.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterAgentComponent } from './components/register-agent/register-agent.component';
import { AgentPageComponent } from './components/agent-page/agent-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { InsuranceDetailComponent } from './components/insurance-detail/insurance-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    LoginAgentComponent,
    LoginAdminComponent,
    RegisterUserComponent,
    RegisterAgentComponent,
  
    AgentPageComponent,
    AdminDashboardComponent,
    HomeComponent,
    PoliciesComponent,
    InsuranceDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
