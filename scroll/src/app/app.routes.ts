import { Routes } from '@angular/router';
import { ScorllingComponent } from './scorlling/scorlling.component';
import { FormComponent } from './form/form.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

export const routes: Routes = [
    {
        path: "scrolling",
        component: ScorllingComponent
    },
      {
        path: "infinite-scrolling",
        component: InfiniteScrollComponent
    },
     {
        path: "",
        component: FormComponent
    },
];
