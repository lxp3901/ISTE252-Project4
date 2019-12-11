import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ExerciseDetailComponent } from './tab2/exercise-detail/exercise-detail.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab2', 
    loadChildren: './tab2/tab2.module#Tab2PageModule'
  },
  {
    path: 'exercise-detail/:id',
    component: ExerciseDetailComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
