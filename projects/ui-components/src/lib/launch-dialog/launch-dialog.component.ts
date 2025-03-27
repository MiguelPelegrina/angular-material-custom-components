import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ui-launch-dialog',
  imports: [MatButtonModule],
  templateUrl: './launch-dialog.component.html',
  styleUrl: './launch-dialog.component.css'
})
export class LaunchDialogComponent {
  @Input() title = '';
  @Input() width = '';

  constructor(private dialog: MatDialog) { }

  launch(): void {
    this.dialog.open(DialogTemplateComponent, {
        autoFocus: false,
        width: this.width,
        data: {
            title: this.title
        }
    });
  }
}
