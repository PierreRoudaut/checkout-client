import { NgModule } from '@angular/core';

import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';

@NgModule({
    imports: [
        DxDataGridModule,
        DxFileUploaderModule
    ],
    exports: [
        DxDataGridModule,
        DxFileUploaderModule
    ]
})
export class DevextremeModule { }
