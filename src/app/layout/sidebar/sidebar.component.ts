import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: any[] = 
  [
    {label: 'Contas à pagar',link: 'pagar'},
    {label: 'Contas pagas',link: 'pagas'},
    {label: 'Checklist contas',link: 'checklist'},
    {label: 'Histórico',link: 'historico'}
  ]

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string){
    this.route.navigate(['/'+route])
  }

}
