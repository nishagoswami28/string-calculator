import { Component } from '@angular/core';
import { StringCalculatorService } from '../string-calculator.service';

@Component({
  selector: 'app-string-calculator',
  templateUrl: './string-calculator.component.html',
  styleUrls: ['./string-calculator.component.css']
})
export class StringCalculatorComponent {

  inputString: string = '';
  result: number | string = '';
  errorMessage: string = '';

  constructor(private stringCalculatorService: StringCalculatorService) { }

  calculate(): void {
    const removedQuotes = this.inputString.replace(/["']/g, '');
    try {
      this.result = this.stringCalculatorService.add(removedQuotes);
      this.errorMessage = '';
    } catch (e) {
      this.result = '';
      this.errorMessage = (e as Error).message;
    }
  }
}
