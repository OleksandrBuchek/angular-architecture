import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableItemActionsComponent } from './table-item-actions.component';

describe('TableItemActionsComponent', () => {
  let component: TableItemActionsComponent;
  let fixture: ComponentFixture<TableItemActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableItemActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
