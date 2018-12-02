import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  protected cadastroForm: FormGroup;

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
    console.log('ionViewDidLoad CadastroPage');
  }

  private initForm(): void {
    this.cadastroForm = this.fb.group({
      nome: [
        null,
        [Validators.required]
      ],
      email: [
        null,
        [Validators.required]
      ],
      senha: [
        null,
        [Validators.required]
      ]
    });
  }

  protected cadastrarBtn(): void {
    const nome: string = this.cadastroForm.get('nome').value;
    const email: string = this.cadastroForm.get('email').value;
    const senha: string = this.cadastroForm.get('senha').value;

    this.cadastrar(nome, email, senha);
  }

  private cadastrar(nomeInp: string, emailInp: string, senhaInp: string): void {
    this.http.post(`http://gdr.jhonylara.com.br/api/usuario/`, { nome: nomeInp, email: emailInp, senha: senhaInp })
      .subscribe(() => {
        const toast = this.toastCtrl.create({
          message: 'Cadastrado com sucesso',
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
