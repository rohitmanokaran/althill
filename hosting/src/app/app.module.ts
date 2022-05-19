import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule, USE_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireFunctionsModule, ORIGIN } from '@angular/fire/compat/functions';
import { AngularFireAnalyticsModule, APP_NAME, APP_VERSION, UserTrackingService } from '@angular/fire/compat/analytics';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StylizePipe } from './stylize.pipe';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular-i18n';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';


const configErrMsg = `You have not configured and imported the Firebase SDK.
Make sure you go through the codelab setup instructions.`;

const bucketErrMsg = `Your Firebase Storage bucket has not been enabled. Sorry
about that. This is actually a Firebase bug that occurs rarely. Please go and
re-generate the Firebase initialization snippet (step 4 of the codelab) and make
sure the storageBucket attribute is not empty. You may also need to visit the
Storage tab and paste the name of your bucket which is displayed there.`;

if (environment.firebase) {
  if (!environment.firebase.apiKey) {
    window.alert(configErrMsg);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    StylizePipe,
    MapComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatDialogModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    RouterModule.forRoot([
      {path: 'map', component: MapComponent},
      {path: '', component: AppComponent},
      {path: '**', component: AppComponent} // PageNotFoundComponent
    ])
  ],
  // providers: [{ provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined}],
  providers: [
    UserTrackingService,
    { provide: APP_NAME, useValue: environment.name },
    { provide: APP_VERSION, useValue: environment.version },
    { provide: LOCALE_ID, useValue: navigator.language, },
    // https://github.com/angular/angularfire/blob/master/docs/functions/functions.md
    // https://www.w3schools.com/js/js_window_location.asp
    { provide: ORIGIN, useValue: window.location.href.replace(window.location.pathname, '') + '/api' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
