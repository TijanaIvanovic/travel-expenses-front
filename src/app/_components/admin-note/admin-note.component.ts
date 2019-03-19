import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionToken } from 'src/app/_config/session.config';

@Component({
  selector: 'app-admin-note',
  templateUrl: './admin-note.component.html',
  styleUrls: ['./admin-note.component.scss']
})
export class AdminNoteComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onBack() {
    const token = sessionStorage.getItem('userSession');
    const tokenData: SessionToken = JSON.parse(token);
    this.router.navigate(['user/' + tokenData.uid]);
  }
}
