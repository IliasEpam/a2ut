import { Routes } from '@angular/router';
import { LoginGuard } from './services/login.guard';

import { CoursesComponent } from './components/courses.component';
import { CourseComponent } from './components/course.component';
import { AddCourseComponent } from './components/addcourse.component';
import { NoContentComponent } from './components/nocontent.component';
import { LoginPageComponent } from './common/loginpage.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'addcourse',
    component: AddCourseComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'courses/:id',
    component: AddCourseComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: NoContentComponent
  }
];
