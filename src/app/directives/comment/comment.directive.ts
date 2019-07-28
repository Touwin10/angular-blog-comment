import { Directive, ViewContainerRef, Input, OnChanges } from '@angular/core';
import { Comment } from 'src/app/comment.model';

@Directive({
  selector: '[commentDir]'
})
export class CommentDirective implements OnChanges {

  @Input('commentDir') comment: Comment;
  public currValue: Comment = new Comment();
  constructor(public viewContainerRef: ViewContainerRef) {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.currValue = <Comment>changes.comment.currentValue;
  }

}
