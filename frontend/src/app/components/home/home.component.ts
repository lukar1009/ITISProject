import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news: News[] = [];

  constructor(private _newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this._newsService.getAllNews().then(res => {
      this.news = res["data"];
    });
  }
}
