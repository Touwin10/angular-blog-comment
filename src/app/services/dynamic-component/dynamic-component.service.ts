
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { Comment } from 'src/app/comment.model';
import { CommentComponent } from 'src/app/comment/comment.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  addDynamicComponent(viewContainerRef: ViewContainerRef, comment: Comment) {

    if (!viewContainerRef)
      return;
    viewContainerRef.clear();

    const factory = this.factoryResolver.resolveComponentFactory(CommentComponent);
    const component: ComponentRef<CommentComponent> = factory.create(viewContainerRef.parentInjector);
    const currComponent = component.instance;

    currComponent.comment = comment;
    viewContainerRef.insert(component.hostView);
  }
}
