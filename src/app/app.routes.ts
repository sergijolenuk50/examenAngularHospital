import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';


export const routes: Routes = [

    { path: 'doctor', component: DoctorListComponent },
    { path: 'create', component: DoctorFormComponent },
    { path: 'about', component: AboutComponent },
    { path: 'edit/:id', component: DoctorFormComponent },
];
