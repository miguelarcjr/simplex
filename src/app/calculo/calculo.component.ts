import { Component, OnInit } from '@angular/core';
import { SimplexService } from '../services/simplex.service';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.scss']
})
export class CalculoComponent implements OnInit {

  constructor(public simplex: SimplexService) { }

  tabela: number[][] = [];
  cabecalho: any[] = [];
  vb: any[] = [];
  vnb: any[] = [];
  valorZ: number = 0;

  ngOnInit(): void {
    this.montarTabelaInicial();
  }
  montarTabelaInicial() {
    console.log(this.simplex.funcaoZ)
    console.log(this.simplex.restricoes)
    console.log("MONTAR TABELA");
    this.tabela = this.buildMatriz(this.simplex.qtdRestricoes+1, this.simplex.qtdVarDecisao+this.simplex.qtdRestricoes+2);
    console.log(this.mostraMatriz(this.tabela));
    //PREENCHER
    //Z
    this.tabela[0][0] = 1;
    for (let i = 0; i < this.simplex.funcaoZ.length; i++) {
      this.tabela[0][i+1] = this.simplex.funcaoZ[i]*-1;
    }
    //FOLGAS
    for (let i = 0; i < this.simplex.qtdRestricoes; i++) {
      this.tabela[0][i+this.simplex.qtdVarDecisao+1] = 0;
    }
    //B
    this.tabela[0][this.tabela[0].length-1] = 0;
    console.log(this.mostraMatriz(this.tabela));
    //RESTRICOES
    for (let i = 0; i < this.simplex.restricoes.length; i++) {
      //Z
      this.tabela[i+1][0] = 0;
      for (let j = 0; j < this.simplex.restricoes[i].length-1; j++) {
        this.tabela[i+1][j+1] = this.simplex.restricoes[i][j];
      }
      //FOLGAS
      for (let j = 0; j < this.simplex.qtdRestricoes; j++) {
        this.tabela[i+1][j+this.simplex.qtdVarDecisao+1] = 0;
      }
      this.tabela[i+1][this.simplex.qtdVarDecisao+1+i] = 1;
      //B
      this.tabela[i+1][this.tabela[0].length-1] = this.simplex.restricoes[i][this.simplex.restricoes[i].length-1];
      console.log(this.mostraMatriz(this.tabela));
    }

    this.montarNovaTabela()


  }
  montarNovaTabela() {
    //Pega coluna com maior valor
    let maiorValor = 0;
    let colunaMaiorValor = 0;
    for (let i = 0; i < this.tabela[0].length-1; i++) {
      if (this.tabela[0][i] < maiorValor) {
        maiorValor = this.tabela[0][i];
        colunaMaiorValor = i;
      }
    }

    console.log("MAIOR VALOR: " + maiorValor);
    console.log("COLUNA MAIOR VALOR: " + colunaMaiorValor);
    //Pega os termos e divide pela coluna com maior valor
    let menorValor = 0;
    let linhaMenorValor = 0;//
    for (let i = 0; i < this.tabela.length-1; i++) {
      const res = this.tabela[i+1][this.tabela[0].length-1]/this.tabela[i+1][colunaMaiorValor]
      console.log(res);//
      if (res < menorValor && res > 0 || menorValor == 0) {
        menorValor = res;
        linhaMenorValor = i+1;
      }
    }
    console.log("MENOR VALOR: " + menorValor);
    console.log("LINHA MENOR VALOR: " + colunaMaiorValor);
    console.log("NLP: NOVA LINHA PIVOT:")
    console.log(this.tabela[linhaMenorValor]);
    const novaTabela = this.buildMatriz(this.tabela.length, this.tabela[0].length);
    const linhasNovaCalculada = [linhaMenorValor];
    const novaLinhaPivo = this.tabela[linhaMenorValor].map(x => x/this.tabela[linhaMenorValor][colunaMaiorValor]).map(x => parseFloat(x.toFixed(3)));
    novaTabela[linhaMenorValor] = novaLinhaPivo;
    console.log(novaTabela);
    for (let i = 0; i < this.tabela.length; i++) {
      if (i != linhaMenorValor) {
        //const novaLinha = this.tabela[i].map(x => x*-1).map(x => parseFloat(x.toFixed(3)));
        let novaLinha = novaLinhaPivo
          .map(x => x*(this.tabela[i][colunaMaiorValor]*-1))
          .map((x, j) => x+this.tabela[i][j])
          .map(x => parseFloat(x.toFixed(3)))
        novaTabela[i] = novaLinha;
        linhasNovaCalculada.push(i);
      }
    }
    this.tabela = this.mostraMatriz(novaTabela);
    console.log("TABELA FINAL: ");
    console.log(this.tabela);
    if(this.tabela[0].find(x => x < 0)) {
      console.log("SOLUCAO NAO OTIMA! MONTAR NOVA TABELA:")
      this.montarNovaTabela();
    }else {
      console.log("SOLUCAO OTIMA!");
      console.log("RESULTADO: ");
      console.log(this.tabela);
      this.mostraResultado();
    }
  }
  mostraResultado() {
    //Variaveis basicas
    this.cabecalho.push("Z");
    for (let i = 0; i < this.simplex.qtdVarDecisao; i++) {
      this.cabecalho.push("x"+(i+1));
    }
    //Variaveis folgas
    const vb = [];
    for (let i = 0; i < this.simplex.qtdRestricoes; i++) {
      this.cabecalho.push("xf"+(i+1));
    }
    this.cabecalho.push("b");

    for (let c = 1; c < this.cabecalho.length-1; c++) {
      console.log(this.cabecalho[c]);
      let coluna = [];
      for (let l = 0; l < this.tabela.length; l++) {
        coluna.push(this.tabela[l][c]);
      }
      if(coluna.find(x => x == 1) && coluna.filter(x => x == 0).length === this.tabela.length-1) {
        console.log("Variavel Basicas: ");
        console.log(coluna);
        let linhaIndex = coluna.findIndex(x => x == 1);
        vb.push({nome: this.cabecalho[c], valor: this.tabela[linhaIndex][this.tabela[0].length-1]});
      }
    }
    this.vb = vb;

    for (let i = 0; i < this.cabecalho.length; i++) {
      if(!(this.vb.filter(x => x.nome == this.cabecalho[i]).length > 0) && this.cabecalho[i] != "b" && this.cabecalho[i] != "Z") {
        this.vnb.push({nome: this.cabecalho[i], valor: 0});
      }
    }
    console.log("VB FINAL")
    console.log(this.vb)
    console.log("VNB FINAL")
    console.log(this.vnb)
    this.valorZ = this.tabela[0][this.tabela[0].length-1];
    console.log("Valor Z: " + this.valorZ);

    console.log(this.cabecalho);
  }

  buildMatriz(linha: number, coluna: number) {
    const matriz = [];
    for (let i = 0; i < linha; i++) {
      matriz[i] = new Array(coluna);
    }
    return matriz as number[][];
  }

  mostraMatriz(matriz: number[][]) {
    const novaMatriz = [];
    for (let i = 0; i < matriz.length; i++) {
      novaMatriz[i] = new Array(matriz[i].length);
    }
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        novaMatriz[i][j] = matriz[i][j];
      }
    }
    return novaMatriz as number[][];
  }

  createRange(number: number){
    return new Array(number);
  }


}
