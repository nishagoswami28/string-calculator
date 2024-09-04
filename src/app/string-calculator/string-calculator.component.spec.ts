import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StringCalculatorComponent } from './string-calculator.component';
import { StringCalculatorService } from '../string-calculator.service';
import { of, throwError } from 'rxjs';

describe('StringCalculatorComponent', () => {
  let component: StringCalculatorComponent;
  let fixture: ComponentFixture<StringCalculatorComponent>;
  let mockStringCalculatorService: jasmine.SpyObj<StringCalculatorService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StringCalculatorService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ StringCalculatorComponent ],
      providers: [
        { provide: StringCalculatorService, useValue: spy }
      ]
    })
    .compileComponents();

    mockStringCalculatorService = TestBed.inject(StringCalculatorService) as jasmine.SpyObj<StringCalculatorService>;
    fixture = TestBed.createComponent(StringCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calculate', () => {
    it('should remove quotes and call add method from service', () => {
      const input = '"1,2,3"';
      const expectedResult = 6;

      mockStringCalculatorService.add.and.returnValue(expectedResult);

      component.inputString = input;
      component.calculate();

      expect(mockStringCalculatorService.add).toHaveBeenCalledWith('1,2,3');
      expect(component.result).toBe(expectedResult);
      expect(component.errorMessage).toBe('');
    });

    it('should handle service errors gracefully', () => {
      const input = '1,2,3';
      const errorMessage = 'An error occurred';

      mockStringCalculatorService.add.and.callFake(() => {
        throw new Error(errorMessage);
      });

      component.inputString = input;
      component.calculate();

      expect(mockStringCalculatorService.add).toHaveBeenCalledWith(input);
      expect(component.result).toBe('');
      expect(component.errorMessage).toBe(errorMessage);
    });
  });
});
