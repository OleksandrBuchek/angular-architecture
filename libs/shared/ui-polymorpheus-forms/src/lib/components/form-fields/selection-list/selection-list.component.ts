import { Component, Signal, effect } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { injectFieldControl, injectFieldOptions, injectSelectedByFn } from '../../../injectors';
import { controlValueSignal } from '@shared/util-forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'selection-list-field',
  standalone: true,
  imports: [MatListModule, AsyncPipe],
  templateUrl: './selection-list.component.html',
  styleUrl: './selection-list.component.scss',
})
export class SelectionListComponent<Form extends FormGroup, Key extends keyof Form['controls']> {
  private readonly control = injectFieldControl<Form, Key>();
  private readonly selectedByFn = injectSelectedByFn<Form, Key>();
  private readonly $formValue: Signal<Form['value'][Key]> = controlValueSignal(this.control);

  public readonly options = injectFieldOptions<Form>();
  public readonly selectionSet = new Map<ReturnType<typeof this.selectedByFn>, Form['value'][Key]>();

  constructor() {
    this.propagateFormToStore();
  }

  public isSelected(value: Form['value'][Key]): boolean {
    return this.selectionSet.has(this.selectedByFn(value));
  }

  public onSelectionChange(event: MatSelectionListChange): void {
    event.options.forEach(({ selected, value }) => {
      if (selected) {
        this.selectionSet.set(this.selectedByFn(value), value);
      } else {
        this.selectionSet.delete(this.selectedByFn(value));
      }

      this.propagateSetToForm();
    });
  }

  private propagateFormToStore(): void {
    effect(
      () => {
        this.$formValue().forEach((item: Form['value'][Key][number]) => {
          this.selectionSet.set(this.selectedByFn(item), item);
        });
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  private propagateSetToForm(): void {
    this.control.setValue([...this.selectionSet.values()]);
  }
}
