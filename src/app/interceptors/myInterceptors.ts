import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FakeBackendInterceptor } from "./fake-backend.interceptor";
import { RelDBInterceptor } from "./reldb-interceptor";

export const myInterceptors = [
    //{provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RelDBInterceptor, multi: true}
]