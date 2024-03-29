import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() public initialTerm: string = '';
  @Input() public placeholder: string = 'Search...';
  @Output() public onValue: EventEmitter<string> = new EventEmitter();
  private debouncer: Subject<string> = new Subject<string>(); // Subject es un tipo especial de Observable
  private debouncerSuscription?: Subscription;

  onKeyPress() {
    this.debouncer.next(this.txtInput.nativeElement.value);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500) // Tiempo de espera para que se emita el valor del Subject si no recive otro valor antes
      )
      .subscribe((value) => {
        console.log('debouncer - ', value);
        this.onValue.emit(value);
      });

    this.placeholder = this.initialTerm;
  }

  ngOnDestroy(): void {
    console.log('Destroy search box component');
    this.debouncerSuscription?.unsubscribe();
  }

  @ViewChild('txtInput') // Referencia del input #txtTagInput
  public txtInput!: ElementRef<HTMLInputElement>;
}
