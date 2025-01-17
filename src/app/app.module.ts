import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Ant Design Modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';

// Services
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Ant Design Modules
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule,
  ],
  providers: [
    AuthService,
  ],
})
export class AppModule {}
