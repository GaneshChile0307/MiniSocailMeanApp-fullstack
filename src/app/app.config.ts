import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient ,withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { AuthGuard } from "./auth/auth.guard";
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideAnimationsAsync() ,
     HttpClientModule,
     AuthGuard,
     provideHttpClient(withInterceptorsFromDi()),  
      {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
      }
    ],

};
