import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should return 0 for an empty string', () => {
      expect(service.add('')).toBe(0);
    });

    it('should return the sum of numbers separated by comma', () => {
      expect(service.add('1,2,3')).toBe(6);
    });

    it('should return the sum of numbers separated by newline', () => {
      expect(service.add('1\n2\n3')).toBe(6);
    });

    it('should return the sum of numbers with both comma and newline as delimiters', () => {
      expect(service.add('1\n2,3')).toBe(6);
    });

    it('should handle custom delimiters', () => {
      expect(service.add('//;\n1;2;3')).toBe(6);
    });

    it('should throw an error if negative numbers are included', () => {
      expect(() => service.add('1,-2,3')).toThrowError('Negative numbers not allowed: -2');
    });

    it('should handle multiple custom delimiters correctly', () => {
      expect(service.add('//[***]\n1***2***3')).toBe(6);
    });

    it('should handle custom delimiters with various lengths', () => {
      expect(service.add('//[***]\n1***2***3')).toBe(6);
      expect(service.add('//[|||]\n1|||2|||3')).toBe(6);
    });
  });
});
