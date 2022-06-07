import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculoComponent } from './calculo/calculo.component';
import { FuncaoComponent } from './funcao/funcao.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SetupComponent } from './setup/setup.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: 'setup', pathMatch: 'full'},
      {path: 'setup', component: SetupComponent},
      {path: 'funcoes', component: FuncaoComponent},
      {path: 'teste', component: TesteComponent},
      {path: 'calculo', component: CalculoComponent}
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
