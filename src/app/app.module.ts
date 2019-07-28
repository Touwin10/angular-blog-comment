import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase/firebase.service';
import { CommentComponent } from './comment/comment.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { DynamicComponentService } from './services/dynamic-component/dynamic-component.service';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  entryComponents: [
    CommentComponent
  ],
  providers: [
    AngularFirestore,
    DynamicComponentService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
