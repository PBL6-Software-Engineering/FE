import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, retry } from 'rxjs';
import { ArticleService } from 'src/app/admin/_services/article.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleOutstandingResolve implements Resolve<any> {
  constructor(private articleService: ArticleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService.getArticleOutStandingPublic({
      page: 1,
      paginate: 5,
      sortLatest: true,
      sort_search_number: true,
      search: '',
    });
  }
}
