import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { CommentParams } from 'src/app/models/http-models/CommentParams';
import { News } from 'src/app/models/News';
import { CommentsService } from 'src/app/services/comments.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news: News[] = [];
  public comments: Comment[] = [];
  public commentValue: string;
  public titleValue: string;
  public nameValue: string;

  constructor(private _newsService: NewsService,
              private _commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getNews();
    this.getComments();
  }

  getNews() {
    this._newsService.getAllNews().then(res => {
      this.news = res.data;
    });
  }

  getComments() {
    this._commentsService.getAllComments().then(res => {
      this.comments = res.data;
    });
  }

  submitComment() {
    let commentParams: CommentParams = new CommentParams();
    commentParams.title = this.titleValue;
    commentParams.author = this.nameValue;
    commentParams.content = this.commentValue;
    this._commentsService.insertNewComment(commentParams).then(res => {
      this.getComments();
      this.titleValue = "";
      this.nameValue = "";
      this.commentValue = "";
    });
  }
}
