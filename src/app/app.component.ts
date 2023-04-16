import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

const CURRENT_USER: User = new User(1, '岡田 孟');
const ANOTHER_USER: User = new User(2, '武井 健司');

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です。'),
  new Comment(ANOTHER_USER, 'この間の件ですが、どうなりましたか？'),
  new Comment(CURRENT_USER, 'お疲れ様です。'),
  new Comment(CURRENT_USER, 'クライアントからOKがでました')
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
  }

  addComment(comment: string): void {
    if(comment) {
      this.comments.push(new Comment(this.currentUser, comment))
    }
  }
}
