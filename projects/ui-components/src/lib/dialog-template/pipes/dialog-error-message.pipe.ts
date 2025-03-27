import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// TODO Internalization
@Pipe({
  name: 'errorMessage'
})
export class DialogErrorMessagePipe implements PipeTransform {

  transform(control: AbstractControl | null, label: string): string | null {
    if (!control || !control.errors) return null;

    const errors = control.errors;
    if (errors['required']) return `${label} is required.`;
    if (errors['min']) return `${label} must be at least ${errors['min'].min}.`;
    if (errors['max']) return `${label} cannot exceed ${errors['max'].max}.`;
    if (errors['pattern']) return `Invalid format for ${label}.`;

    return null;
  }

}
