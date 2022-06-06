import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {
  title = 'simplex';
  matriz!: Array<any[]>;

  constructor() { }

  ngOnInit(): void {
    const qtdVarDecisao = parseInt(prompt('Quantas variáveis de decisão tem o problema?') as string);
    const qtdRestricoes = parseInt(prompt('Digite a quantidade de restricoes:') as string);
    console.log(qtdVarDecisao, qtdRestricoes);

    this.matriz = this.buildMatriz(qtdRestricoes+2, qtdVarDecisao+qtdRestricoes+2);
    console.log(this.matriz);
    //popular cabecalho
    this.matriz[0][0] = 'Z';
    this.matriz[0][this.matriz[0].length-1] = 'B';
    //inserir no cabecalho as variaveis de decisao
    for (let i = 0; i < qtdVarDecisao; i++) {
      this.matriz[0][i+1] = 'x'+(i+1);
    }
    for (let i = 0; i < qtdRestricoes; i++) {
      this.matriz[0][i+qtdRestricoes+2] = 'xf'+(i+1);
    }
    console.log("cabecalho pronto")
    console.log(this.matriz);


    const coeficienteFuncao: number[] = (prompt('Informe os coeficientes da funcao') as string).split(',').map(n => parseInt(n) * -1);

    console.log(coeficienteFuncao)


    // preencher coeficientes da funcao na matriz
    // Z sempre sera 1 na linha da funcao
    this.matriz[this.matriz.length-1][0] = 1;
    for (let i = 0; i < coeficienteFuncao.length; i++) {
      this.matriz[this.matriz.length-1][i+1] = coeficienteFuncao[i];
    }
    // inserir folgas da funcao
    for (let i = 0; i < qtdRestricoes; i++) {
      this.matriz[this.matriz.length-1][i+qtdRestricoes+2] = 0;
    }
    // B tbm e 0 na linha da funcao
    this.matriz[this.matriz.length-1][this.matriz[0].length-1] = 0;


    console.log("MATRIZ COM COEFICIENTES DA FUNCAO")
    console.log(this.matriz)



  }

  buildMatriz(linha: number, coluna: number) {
    const matriz = [];
    for (let i = 0; i < linha; i++) {
      matriz[i] = new Array(coluna);
    }
    return matriz;
  }

}

