import { NgModule } from '@angular/core';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@NgModule({
    imports: [
        DxDataGridModule,
    ],
    exports: [
        DxDataGridModule,
    ]
})
export class DevextremeModule { }
