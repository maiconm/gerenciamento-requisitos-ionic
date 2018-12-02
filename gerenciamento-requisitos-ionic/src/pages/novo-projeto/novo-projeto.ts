import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-novo-projeto',
  templateUrl: 'novo-projeto.html',
})
export class NovoProjetoPage {
  protected projetoForm: FormGroup;

  constructor(
    public toastCtrl: ToastController,
    private http: Http,
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.initForm();
  }

  ionViewDidLoad() {
  }

  protected criarBtn(): void {
    const nome: string = this.projetoForm.get('nome').value;
    const dataInicio = this.projetoForm.get('dataInicio').value;
    const dataFim = this.projetoForm.get('dataFim').value;
    this.criar(nome, dataInicio, dataFim);
  }

  private initForm(): void {
    this.projetoForm = this.fb.group({
      nome: [
        null,
        [Validators.required]
      ],
      dataInicio: [
        null,
        [Validators.required]
      ],
      dataFim: [
        null,
        [Validators.required]
      ]
    });
  }

  private criar(nomeInp: string, dataIniInp: Date, dataFimInp: Date): void {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.token}`
    }
    const data1 = new Date(dataIniInp).toLocaleDateString('pt-BR');
    const data2 = new Date(dataFimInp).toLocaleDateString('pt-BR');
    console.log(data1);
    const iProj = {
      nome: nomeInp,
      dataInicio: data1,
      dataFim: data2,
      status: 'Criando' // TODO: Implementar status.
    };
    this.http.post(`http://gdr.jhonylara.com.br/api/usuario/${localStorage.id}/projeto`, iProj, {headers: new Headers(headerDict)})
      .subscribe(() => {
        const toast = this.toastCtrl.create({
          message: 'Projeto criado com sucesso!',
          duration: 3000
        });
        toast.present();
      },
      () => {
        const toast = this.toastCtrl.create({
          message: 'Erro',
          duration: 3000
        });
        toast.present();
      });
  }
}
