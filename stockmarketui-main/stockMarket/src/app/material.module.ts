import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from "@angular/material/divider";

const MATERIAL_MODULES = [
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatPaginatorModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule
];

@NgModule({
    imports: [...MATERIAL_MODULES],
    exports: [...MATERIAL_MODULES]
})
export class MaterialModule { }
