import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimplexService {
  qtdVarDecisao: number = 2;
  qtdRestricoes: number = 2;
  funcaoZ: number[] = [10, 12];
  restricoes: number[][] = [[1, 1, 100], [1, 3, 270]];

  constructor() { }
}
