import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdComponentsModule} from './modules/md-components.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//import { TokenInterceptor } from './services/http-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantHomePageComponent } from './restaurant-home-page/restaurant-home-page.component';
import { RecordTableComponent } from './record-table/record-table.component';
import { IndividualRecordComponent } from './individual-record/individual-record.component';
import { LoginComponent } from './login/login.component';
import { LoggedInControllerComponent } from './logged-in-controller/logged-in-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantHomePageComponent,
    RecordTableComponent,
    IndividualRecordComponent,
    LoginComponent,
    LoggedInControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '',component: LoginComponent},
      {path: 'web', component:LoggedInControllerComponent, children:[
        {path: 'home',component: RestaurantHomePageComponent},
        {path: 'recordTable',component: RecordTableComponent},
        {path: 'record',component: IndividualRecordComponent}
      ]},
      {path:"**",redirectTo:""}
    ]),
    MdComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
