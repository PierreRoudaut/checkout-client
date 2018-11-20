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
    MatGridListModule,
    MatDividerModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTableModule,
    MatTooltipModule
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
        MatGridListModule,
        MatDividerModule,
        MatSidenavModule,
        MatBadgeModule,
        MatTableModule,
        MatTooltipModule
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
        MatGridListModule,
        MatDividerModule,
        MatSidenavModule,
        MatBadgeModule,
        MatTableModule,
        MatTooltipModule
    ]
})
export class MaterialModule { }
