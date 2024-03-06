import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = 'Search...';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInput') // Referencia del input #txtTagInput
  public txtInput!: ElementRef<HTMLInputElement>;

  public emitValue(): void {
    this.onValue.emit(this.txtInput.nativeElement.value);
    this.txtInput.nativeElement.value = '';
  }
}
