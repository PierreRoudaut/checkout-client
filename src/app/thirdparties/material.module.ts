import { NgModule } from '@angular/core';

import {
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatCardModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
        MatGridListModule
    ],
    exports: [
        MatCardModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
        MatGridListModule
    ]
})
export class MaterialModule { }
