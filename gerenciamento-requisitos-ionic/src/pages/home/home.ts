import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { Projeto } from '../../classes/projeto';
import { IProjeto } from '../../interfaces/projeto.interface';
import { NovoProjetoPage } from '../novo-projeto/novo-projeto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private urlServer: string = 'http://gdr.jhonylara.com.br/api/usuario'
  protected obsProjetos: Observable<Projeto[]>

  constructor(
    private http: Http,
    public navCtrl: NavController
  ) {
    this.obsProjetos = this.getProjetos();
  }

  protected getProjetos(): Observable<Projeto[]> {
    const headerDict = {
      'Authorization': `Bearer ${localStorage.token}`
    }

    return this.http
      .get(`${this.urlServer}/${localStorage['id']}/projeto/list`, {headers: new Headers(headerDict)})
      .pipe(
        map(res => res.json()),
        map(
          (iPrjs: IProjeto[]) => {
            return iPrjs.map(
              (iPrj: IProjeto) => {
                return new Projeto(
                  iPrj.id,
                  iPrj.nome,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null
                )
              }
            );
          }
        ),
        take(1)
      );
  }

  public goToNovoProjeto() {
    this.navCtrl.push(NovoProjetoPage);
  }

}
