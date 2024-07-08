import { Component, HostBinding, HostListener, input, output } from '@angular/core';
import { createPolymorpheusComponent, partial } from '@shared/util-polymorpheus-content';
import {MATERIAL_TABLE_COLUMN_PROPS_DEFAULT } from '../../constants';

@Component({
  selector: 'column-header',
  template: `{{ title() }}`,
})
export class TableColumnHeaderComponent {
  @HostBinding('style.cursor') get isSortable(): 'pointer' | 'initial' {
    return this.sortable() ? 'pointer' : 'initial';
  }
  @HostListener('click') onClickHandler(): void {
    if (this.sortable()) {
      this.onClick.emit();
    }
  }
  public readonly sortable = input<boolean, boolean | undefined>(MATERIAL_TABLE_COLUMN_PROPS_DEFAULT.sortable, {
    transform: (input) => input ??MATERIAL_TABLE_COLUMN_PROPS_DEFAULT.sortable,
  });
  public readonly title = input<string, string | undefined>('', {
    transform: (input) => input ?? '',
  });
  public readonly onClick = output<void>();
}

export const createColumnHeaderPartial = partial(createPolymorpheusComponent(TableColumnHeaderComponent));
