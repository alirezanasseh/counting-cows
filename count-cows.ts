import * as api from './api';

export class Solution implements api.SolutionInterface {
  private api: api.APICaller;
  private fieldSize: number;
  private cows: number;

  constructor(api: api.APICaller) {
    this.api = api;
    console.log('Press run code to see this in the console!')
    // You can initiate and calculate things here
    this.fieldSize = this.api.getFieldSize();
    this.cows = this.api.getNumberOfCows();
  }
  
  createCowArray(): boolean[] {
    let cowArray: boolean[] = new Array(this.fieldSize * this.fieldSize);
    cowArray.fill(false);
    let x, y;
    for (let i = 0; i < this.cows; i++) {
      x = this.api.getXCoordinateForCow(i);
      y = this.api.getYCoordinateForCow(i);
      cowArray[y * this.fieldSize + x] = true;
    }
    
    return cowArray;
  }
  
  getNeighbours(x: number, y: number): number[] {
    if (this.fieldSize === 1) return [];
    
    let neighbours: number[] = [];
    const index = y * this.fieldSize + x;
    
    if (x === 0) neighbours.push(index + 1);
    else if (x === this.fieldSize - 1) neighbours.push(index - 1);
    else {
      neighbours.push(index - 1);
      neighbours.push(index + 1);
    }
    
    if (y === 0) neighbours.push(index + this.fieldSize);
    else if (y === this.fieldSize - 1) neighbours.push(index - this.fieldSize);
    else {
      neighbours.push(index - this.fieldSize);
      neighbours.push(index + this.fieldSize);
    }
    
    return neighbours;
  }

  /**
   * Task 1: Return the number of cows hiding in corners.
   * 
   * 
   * @return {number (integer)}
   */
  getNumberOfCowsInCorners(): number {
    // Write your code here
    if (this.fieldSize === 1) return this.cows;
    
    const cowArray = this.createCowArray();
    const cornerIndexes = [
      0, 
      this.fieldSize - 1, 
      this.fieldSize * (this.fieldSize - 1), 
      this.fieldSize * this.fieldSize
    ];
    let count = cowArray.filter((cow, index) => cornerIndexes.includes(index) && cow).length;
    
    return count;
  }

  /**
   * Task 2: Return the number of cows with neighbours.
   * 
   * 
   * @return {number (integer)}
   */
  getNumberOfCowsWithNeighbours(): number {
    // Write your code here
    const cowArray = this.createCowArray();
    let x: number, y: number, neighbours: number[], count = 0;
    
    for (let i = 0; i < this.cows; i++) {
      x = this.api.getXCoordinateForCow(i);
      y = this.api.getYCoordinateForCow(i);
      
      neighbours = this.getNeighbours(x, y);
      count += cowArray.filter((cow, index) => neighbours.includes(index) && cow).length;
    }
    
    return count;
  }
}