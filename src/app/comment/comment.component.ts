import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';
import { Comment } from '../comment.model';
import { Observable } from 'rxjs';
import { DynamicComponentService } from '../services/dynamic-component/dynamic-component.service';


@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  public comment: Comment;
  comments$: Observable<Comment[]>;

  COMMENTS_REF: string = "comments";
  COL_NODE: string;

  viewReply: string;
  editComment: string;

  constructor(private fbService: FirebaseService, private dynComponent: DynamicComponentService) {
    this.comment = new Comment();
    this.viewReply = "";
  }

  ngOnInit() {
    this.COL_NODE = `${this.comment.docPath}/${this.COMMENTS_REF}`;
    this.comments$ = this.fbService.colWithIds$(this.COL_NODE, ref => ref.orderBy('date', 'desc'));
  }

  onComment(comment: Comment) {
    this.fbService.add(comment, this.COL_NODE)
      .then(_ => {
        this.comment = new Comment();
      })
  }

  onEdit(comment: Comment) {
    this.fbService.update(comment.docPath, comment)
      .then(_ => {
        this.editComment = "";
      })
  }

  onDelete(comment: Comment) {
    this.fbService.delete(comment.docPath);
  }

  onViewReply(comment: Comment) {
    this.dynComponent.addDynamicComponent(this.viewContainerRef, comment);
  }

}
