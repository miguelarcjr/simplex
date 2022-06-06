import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimplexService } from '../services/simplex.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  qtdVarDecisao: number = 2;
  qtdRestricoes: number = 2;

  constructor(private simplexService: SimplexService, private router: Router) { }

  ngOnInit(): void {
  }

  next() {
    this.simplexService.qtdRestricoes = this.qtdRestricoes;
    this.simplexService.qtdVarDecisao = this.qtdVarDecisao;
    if(!(this.qtdVarDecisao > 0 && this.qtdRestricoes > 0)) {
      alert("INFORME A QUANTIDADE DAS VARIAVEIS DE DECISAO E RESTRICAO!");
    }

    this.router.navigate(['/funcoes']);
  }

}
