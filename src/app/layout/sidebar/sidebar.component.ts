import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  icon = '<>';
  toggle: boolean = false;

  menu: any[] = 
  [
    {label: 'Contas à pagar',link: 'pagar', icon: 'cash-register'},
    {label: 'Contas pagas',link: 'pagas', icon: 'receipt'},
    {label: 'Checklist contas',link: 'checklist', icon: 'comments-dollar'},
    {label: 'Histórico',link: 'historico', icon: 'clock-rotate-left'}
  ]

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string){
    this.route.navigate(['/'+route])
  }

  toggleSideBar(){
    this.toggle = !this.toggle;
  }

  returnIcon(icon: string){
    let template = `<i class="fa-solid fa-${icon}"></i>`
    return template
  }

}
