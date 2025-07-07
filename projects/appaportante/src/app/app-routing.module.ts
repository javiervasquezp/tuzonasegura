import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  

const routes: Routes = [  
  {
    path: 'aportante',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'aportante/ver-aportes'},
  { path: '**', redirectTo: 'aportante/ver-aportes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//, relativeLinkResolution: 'legacy'
  exports: [RouterModule]
})
export class AppRoutingModule { }
