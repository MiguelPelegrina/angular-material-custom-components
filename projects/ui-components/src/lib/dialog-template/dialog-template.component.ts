import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogData } from './models/dialog-data.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormElement } from './models/form-element.model';
import { onTimeInput } from '../utils/time-utils';

// TODO Abstraction
@Component({
  selector: 'ui-dialog-template',
  imports: [MatDialogModule],
  templateUrl: './dialog-template.component.html',
  styleUrl: './dialog-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTemplateComponent {
  // Fields
  public form?: FormGroup;

  /**
   *
   * @param data
   * @param dialogRef
   * @param formBuilder
   */
  constructor(@Inject(MAT_DIALOG_DATA) protected data: DialogData, private readonly dialogRef: MatDialogRef<DialogTemplateComponent>, private formBuilder: FormBuilder){
    this.form = this.createForm();
    this.assignDefaultValues(this.data);
  }

  /**
   * When the interaction is cancelled.
   */
  protected onCancel() {
    this.dialogRef.close(false);
  }

  /**
   * When the interaction is confirmed.
   */
  protected onConfirm() {
    if (this.form) {
      this.dialogRef.close(this.form?.value);
    } else {
      this.dialogRef.close(true);
    }
  }

   /**
   * Handles time input and automatically formats time input to HH:mm.
   * @param event
   */
   protected onTimeInput(event: Event, controlName: string): void {
    this.form!.get(controlName)?.setValue(onTimeInput(event));
  }

  /**
   * Assigns default values to data if not initialized previously.
   * @param data - The data, that the dialog needs to work with.
   */
  private assignDefaultValues(data: DialogData): void {
    this.data = {
      ...data,
      showConfirmButton: data.showConfirmButton ?? true,
      showCancelButton: data.showCancelButton ?? false,
      confirmButtonText:
        data.confirmButtonText ?? 'Delete',
        cancelButtonText:
        data.cancelButtonText ?? 'Cancel'
    };
  }

  // TODO Refactor?
  /**
   * Creates a form dynamically from the received form elements.
   * @returns A form group.
   */
  private createForm(): FormGroup {
    const group: Record<string, object> = {};

    this.data.formElements?.forEach((element: FormElement) => {
      group[element.key] = [
        element.value || '',
        [
          ...(element.required ? [Validators.required] : []),
          ...(element.min !== undefined ? [Validators.min(element.min)] : []),
          ...(element.max !== undefined ? [Validators.max(element.max)] : []),
          ...(element.customValidators || []),
        ],
        element.customAsyncValidators || [],
      ];
    });

    return this.formBuilder.group(group);
  }
}
