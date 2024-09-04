import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (numbers === "") return 0;

    // Default delimiter is comma or newline
    let delimiter = /,|\n/;

    // Check if there is a custom delimiter
    if (numbers.startsWith("//")) {
        const parts = numbers.split("\n", 2);
        delimiter = new RegExp(parts[0].slice(2));
        numbers = parts[1];
    }

    // Split the numbers by the delimiter
    const nums = numbers.split(delimiter);

    // Convert to numbers and filter out empty strings
    const parsedNumbers = nums.map(Number).filter(n => !isNaN(n));

    // Check for negative numbers
    const negativeNumbers = parsedNumbers.filter(n => n < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(", ")}`);
    }

    // Sum the numbers
    return parsedNumbers.reduce((sum, num) => sum + num, 0);
  }
}
