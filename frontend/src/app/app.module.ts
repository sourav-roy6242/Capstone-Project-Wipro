import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,  ReactiveFormsModule } from '@angular/forms';
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
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateClaimsComponent } from './components/claims/create-claims/create-claims.component';
import { ClaimsListComponent } from './components/claims/claims-list/claims-list.component';
import { ClaimPageComponent } from './components/claim-page/claim-page.component';
import { AdminClaimComponent } from './components/admin-claim/admin-claim.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    LoginAgentComponent,
    LoginAdminComponent,
    RegisterUserComponent,
    RegisterAgentComponent,
  
    // AgentPageComponent,
    AdminDashboardComponent,
    HomeComponent,
    PoliciesComponent,
    InsuranceDetailComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    CreateClaimsComponent,
    ClaimsListComponent,
    ClaimPageComponent,
    AdminClaimComponent,
    AgentPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
