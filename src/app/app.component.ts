import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManager-FrontEnd';

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddDialogComponent, {
      width: '30%'
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.constructor();
    });
  }
}
