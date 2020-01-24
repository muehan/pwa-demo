import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { NotificationComponent } from './components/notification/notification.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'notification', component: NotificationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
