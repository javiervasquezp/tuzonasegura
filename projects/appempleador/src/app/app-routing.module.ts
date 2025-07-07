import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
 
const routes: Routes = [  
  {
    path: 'empleador',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'empleador/pagedefault'},
  { path: '**', redirectTo: 'empleador/pagedefault' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//, relativeLinkResolution: 'legacy'
  exports: [RouterModule]
})
export class AppRoutingModule { }
