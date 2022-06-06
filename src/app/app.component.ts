import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simplex';
  matriz!: Array<any[]>;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  buildMatriz(linha: number, coluna: number) {
    const matriz = [];
    for (let i = 0; i < linha; i++) {
      matriz[i] = new Array(coluna);
    }
    return matriz;
  }

}
