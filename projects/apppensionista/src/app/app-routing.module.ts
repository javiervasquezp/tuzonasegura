import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
  {
    path: 'pensionista',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'pensionista/ver-datos'},
  { path: '**', redirectTo: 'pensionista/ver-datos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//, relativeLinkResolution: 'legacy'
  exports: [RouterModule]
})
export class AppRoutingModule { }
