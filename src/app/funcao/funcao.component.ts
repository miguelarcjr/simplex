import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SimplexService } from '../services/simplex.service';

@Component({
  selector: 'app-funcao',
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.scss']
})
export class FuncaoComponent implements OnInit {
  form!: FormArray;
  formFuncao!: FormGroup;
  formReady = false;
  cof: any;
  qtdVarDecisao: number = 0;
  qtdRestricoes: number = 0;

  constructor(private simplexService: SimplexService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    let { qtdVarDecisao, qtdRestricoes } = this.simplexService;
    this.qtdVarDecisao = qtdVarDecisao;
    this.qtdRestricoes = qtdRestricoes;
    /* qtdRestricoes = 2;
    qtdVarDecisao = 3; */
    this.formFuncao = new FormGroup({});
    for (let i = 0; i < qtdVarDecisao; i++) {
      this.formFuncao.addControl('var-' + i, new FormControl(''));

    }
    //this.coeficientesFuncao = new Array(qtdVarDecisao).fill(0);
    //this.restricoes = new Array(qtdRestricoes).fill(0);
    this.form = this.fb.array([])
    for (let i = 0; i < qtdRestricoes; i++) {
      this.form.push(this.fb.array([0]));
    }

    for (let control of this.form.controls) {
      for (let i = 0; i < qtdVarDecisao; i++) {
        (control as FormArray).push(this.fb.control(0));
      }
    }


    this.formReady = true;
  }

  next() {
    console.log(this.form.value)
    console.log()

    this.simplexService.restricoes = this.form.value;
    const funcaoZ: number[] = [];
    for (const [key, value] of Object.entries(this.formFuncao.value)) {
      console.log(key, value);  // first one, second two
      funcaoZ.push(value as number);
    }
    this.simplexService.funcaoZ = funcaoZ;
    this.router.navigate(['/calculo']);
  }

  buildMatriz(linha: number, coluna: number) {
    const matriz = [];
    for (let i = 0; i < linha; i++) {
      matriz[i] = new Array(coluna);
    }
    return matriz;
  }

  getControls(itemForm: AbstractControl) {
    return (itemForm as FormArray).controls as FormControl[];
  }

}
