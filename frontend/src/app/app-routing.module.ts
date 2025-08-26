// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LoginUserComponent } from './components/login-user/login-user.component';
// import { LoginAgentComponent } from './components/login-agent/login-agent.component';
// import { LoginAdminComponent } from './components/login-admin/login-admin.component';
// import { RegisterUserComponent } from './components/register-user/register-user.component';
// import { RegisterAgentComponent } from './components/register-agent/register-agent.component';
// import { UserPageComponent } from './components/user-page/user-page.component';
// import { AgentPageComponent } from './components/agent-page/agent-page.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { HomeComponent } from './components/home/home.component';
// import { PoliciesComponent } from './components/policies/policies.component';
// import { InsuranceDetailComponent } from './components/insurance-detail/insurance-detail.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login-user', component: LoginUserComponent },
//   { path: 'login-agent', component: LoginAgentComponent },
//   { path: 'login-admin', component: LoginAdminComponent },
//   { path: 'register-user', component: RegisterUserComponent },
//   { path: 'register-agent', component: RegisterAgentComponent },
//   { path: 'user-page', component: UserPageComponent },
//   { path: 'agent-page', component: AgentPageComponent },
//   { path: 'admin-dashboard', component: AdminDashboardComponent },
//   { path: 'policies', component: PoliciesComponent },
//   { path: 'insurance/:type', component: InsuranceDetailComponent },
//   { path: '', redirectTo: '/login-user', pathMatch: 'full' },
 
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}






// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LoginUserComponent } from './components/login-user/login-user.component';
// import { LoginAgentComponent } from './components/login-agent/login-agent.component';
// import { LoginAdminComponent } from './components/login-admin/login-admin.component';
// import { RegisterUserComponent } from './components/register-user/register-user.component';
// import { RegisterAgentComponent } from './components/register-agent/register-agent.component';
// import { AgentPageComponent } from './components/agent-page/agent-page.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { HomeComponent } from './components/home/home.component';
// import { PoliciesComponent } from './components/policies/policies.component';
// import { InsuranceDetailComponent } from './components/insurance-detail/insurance-detail.component';


// const routes: Routes = [
//   // Default route → Home page
//   { path: '', component: HomeComponent, pathMatch: 'full' },

//   { path: 'login-user', component: LoginUserComponent },
//   { path: 'login-agent', component: LoginAgentComponent },
//   { path: 'login-admin', component: LoginAdminComponent },
//   { path: 'register-user', component: RegisterUserComponent },
//   { path: 'register-agent', component: RegisterAgentComponent },
//   { path: 'agent-page', component: AgentPageComponent },
//   { path: 'admin-dashboard', component: AdminDashboardComponent },
//   { path: 'policies', component: PoliciesComponent },

//   // Dynamic detail page → e.g. /insurance/health
//   { path: 'insurance/:type', component: InsuranceDetailComponent },

//   // Wildcard route → redirect invalid paths to Home
//   { path: '**', redirectTo: '', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}




import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { ProfileComponent } from './components/profile/profile.component'; 
import { CreateClaimsComponent } from './components/claims/create-claims/create-claims.component';
import { ClaimsListComponent } from './components/claims/claims-list/claims-list.component';
import { ClaimPageComponent } from './components/claim-page/claim-page.component';
import { AdminClaimComponent } from './components/admin-claim/admin-claim.component';

 



const routes: Routes = [
  // Default route → Home page
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'login-user', component: LoginUserComponent },
  { path: 'login-agent', component: LoginAgentComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-agent', component: RegisterAgentComponent },
  { path: 'agent-page', component: AgentPageComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'claims', component: ClaimPageComponent },
  
  // Profile routes - Add these lines
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-user', component: ProfileComponent },
  { path: 'profile-agent', component: ProfileComponent },
  { path: 'profile-admin', component: ProfileComponent },
  { path: '', redirectTo: '/create-claims', pathMatch: 'full' },
  { path: 'create-claims', component: CreateClaimsComponent },
  { path: 'list-claims', component: ClaimsListComponent },
  { path: 'admin-claims', component: AdminClaimComponent },

  // Dynamic detail page → e.g. /insurance/health
  { path: 'insurance/:type', component: InsuranceDetailComponent },

  // Wildcard route → redirect invalid paths to Home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }