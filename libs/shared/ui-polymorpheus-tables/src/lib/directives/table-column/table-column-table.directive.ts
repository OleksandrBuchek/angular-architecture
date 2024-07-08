/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[tableColumnName]',
})
export class TableColumnNameDirective<Key extends string> {
  @Input({ alias: 'tableColumnName', required: true }) public name!: Key;
}
