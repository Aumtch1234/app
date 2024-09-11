import { Routes } from '@angular/router';
import { LandmarksComponent } from './pages/landmarks/landmarks.component';
import { ShowComponent } from './pages/show/show.component';

export const routes: Routes = [
    {path: '', component: LandmarksComponent},
    {path: 'show', component: ShowComponent}
];
