import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  protected loginForm: FormGroup;

  constructor(
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.initForm();
  }

  ionViewDidLoad() {
  }

  protected login(emailInp: string, senhaInp: string): void {
    this.http.post(
      `http://gdr.jhonylara.com.br/api/usuario/auth`, { email: emailInp, senha: senhaInp }
    ).pipe(map((response: any) => {
      localStorage['token'] = response.token;

      if (localStorage['nome'] === response['nome']) {
        localStorage['nome'] = response['nome'];
      } else {
        localStorage['nome'] = response['nome'];
        localStorage['id'] = response.id;
      }
    })).subscribe(() => {
      this.navCtrl.push(HomePage);
    },
    () => {
      const toast = this.toastCtrl.create({
        message: 'Erro',
        duration: 3000
      });
      toast.present();
    });
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(80)
        ]
      ],
      senha: [
        null,
        [
          Validators.minLength(8)
        ]
      ]
    });
  }

  protected loginBtn(): void {
    const email: string = this.loginForm.get('email').value;
    const senha: string = this.loginForm.get('senha').value;
    this.login(email, senha);
  }

  goToCadastro() {
    this.navCtrl.push(CadastroPage);
  }

}
