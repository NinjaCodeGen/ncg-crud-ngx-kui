import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalQueryHelper, LocalStorageService, RestoreService, ValidationService } from './services';

// 3rd party
import {
  MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule,
  MdRadioModule, MdProgressBarModule, MdSelectModule, MdToolbarModule, MdOptionModule, MdOption
} from '@angular/material';

// Import the kendoUI modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule, MaskedTextBoxModule, NumericTextBoxModule, SwitchModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { FlexLayoutModule } from '@angular/flex-layout';

// pipes
import { DisplayDataTransformPipe, OrderBy } from './pipes';

// directives
import { InputDebounceComponent } from './directives/input-debounce';

// components
import { ParentFilterAndPagingComponent } from './components';

@NgModule({
  declarations: [
    DisplayDataTransformPipe,
    InputDebounceComponent,
    OrderBy,
    ParentFilterAndPagingComponent
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    InputDebounceComponent, FlexLayoutModule,
    MdCardModule, MdCheckboxModule, MdIconModule,
    MdInputModule, MdRadioModule, MdProgressBarModule, MdSelectModule, MdToolbarModule, MdOptionModule,
    ButtonsModule, DialogModule, InputsModule, MaskedTextBoxModule, NumericTextBoxModule, SwitchModule, GridModule,
    ParentFilterAndPagingComponent
  ],
  entryComponents: [
    ParentFilterAndPagingComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    MdCardModule, MdCheckboxModule, MdIconModule,
    MdInputModule, MdRadioModule, MdProgressBarModule, MdSelectModule, MdToolbarModule, MdOptionModule,
    ButtonsModule, DialogModule, InputsModule, MaskedTextBoxModule, NumericTextBoxModule, SwitchModule, GridModule
  ],
  providers: [
    FormBuilder,
    LocalQueryHelper,
    LocalStorageService,
    MdOption,
    RestoreService,
    ValidationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminCommonModule,
      providers: [
        FormBuilder
      ]
    }
  }
}

/* NinjaCodeGen.com by DNAfor.NET */
