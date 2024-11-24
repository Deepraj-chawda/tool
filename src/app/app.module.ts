import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/AuthModules/login/login/login.component';
import { NavbarComponent } from './modules/SharedModules/navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MetaDataComponent } from './modules/meta-data/meta-data.component';
import { LightboxModule } from 'ngx-lightbox';
import { NoDataComponent } from './modules/no-data/no-data.component';
import { UploadModalComponent } from './modules/upload-modal/upload-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MetaDataComponent,
    NoDataComponent,
    UploadModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {closeButton:true,
        timeOut:2000
      }
    ),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LightboxModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
