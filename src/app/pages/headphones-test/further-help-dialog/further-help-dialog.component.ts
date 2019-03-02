import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-further-help-dialog',
  templateUrl: './further-help-dialog.component.html',
  styleUrls: ['./further-help-dialog.component.scss']
})
export class FurtherHelpDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FurtherHelpDialogComponent>) { }

  ngOnInit() {
    this.dialogRef.afterOpen().subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  onBackButtonClick() {
    this.dialogRef.close();
  }
}
