import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { DxBoxModule, DxButtonModule, DxDataGridModule, DxDrawerModule, DxListModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminPanelComponent,
    AboutComponent,
    MenuComponent,
    ContactComponent,
    CartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxButtonModule,
    DxBoxModule,
    DxTextBoxModule,
    DxListModule,
    DxDataGridModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxDrawerModule,
    DxToolbarModule,
    DxTextAreaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
