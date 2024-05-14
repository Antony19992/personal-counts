import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChecklistComponent } from './layout/routes/checklist/checklist.component';
import { PayableComponent } from './layout/routes/payable/payable.component';
import { PaidComponent } from './layout/routes/paid/paid.component';
import { HistoricComponent } from './layout/routes/historic/historic.component';

const routes: Routes = [
  {path: '', component: ChecklistComponent},  
  {path: 'pagar', component: PayableComponent},  
  {path: 'pagas', component: PaidComponent},  
  {path: 'historico', component: HistoricComponent},  
  {path: 'checklist', component: ChecklistComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
