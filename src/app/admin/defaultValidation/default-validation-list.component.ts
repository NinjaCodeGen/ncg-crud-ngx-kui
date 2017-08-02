
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import { DefaultValidation } from './../services/api/models';

// components
import { BaseListComponent } from './../common/components';

// pipes
import { DisplayDataTransformPipe } from './../common/pipes';

// services
import { LocalStorageService, RestoreService } from './../common/services';
import { DataContext } from './../services/api/rest';
import { EntityService, ModalDialogService, BusyIndicatorService, NotifierService } from '../../core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'defaultValidationList',
  templateUrl: './default-validation-list.component.html'
})

export class DefaultValidationListComponent extends BaseListComponent<DefaultValidation>  {

  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;

  private gridView: GridDataResult;
  private isServerSide: boolean = true;  
  private sort: SortDescriptor[] = [];

  constructor(protected titleService: Title,
    protected entityService: EntityService, 
    protected modalDialogService: ModalDialogService, 
    protected busyIndicatorService: BusyIndicatorService, 
    protected notifierService: NotifierService,
    private datacontextService: DataContext,
    private dialogService: DialogService,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(titleService, entityService, modalDialogService, busyIndicatorService, notifierService, datacontextService.DefaultValidationApi, router, activatedRoute);

    this.formMetaData = require('./default-validation.metaData.json'); 
    this.componentName = 'DefaultValidationListComponent';

    this.generateFilterModel();
  }

  public getList() {
    this.busyIndicatorService.show();
    this.isLoading = true;
    this.datacontextService.DefaultValidationApi
      .get(this.query.expand, this.query.filter, this.query.select, this.query.orderBy,
      this.query.top, this.query.skip, this.query.count, this.query.keywords, null)
      .subscribe((listWithCount) => {
        this.isLoading = false;
        this.listWithCount = listWithCount;
        
        if (this.isServerSide) {
          this.gridView = {
            data: listWithCount.list,
            total: this.listWithCount.count
          };
        } else {
          this.gridView = {
            data: orderBy(listWithCount.list, this.sort),
            total: this.listWithCount.count
          };
        }

        this.busyIndicatorService.hide();
      }, (error) => {
        this.isLoading = false;
        this.errorMessage = <any>error;
        this.busyIndicatorService.hide();        
      });
  }

  public delete(id: number) {
    this.isLoading = true;
    this.dialogService.open({
      title: 'Confirmation',
      content: 'Do you want to delete item \'' + id + '\'',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ]
    }).result.subscribe((res) => {
      if (!(res instanceof DialogCloseResult)) {
        if (res['primary']) {
          this.isLoading = true;
          this.datacontextService.DefaultValidationApi.delete(id).subscribe((result) => {
            this.isLoading = false;
            this.getList();
          }, (error) => {
            this.isLoading = false;
            this.errorMessage = <any>error;
          });
        }
      }
    });
  }

  public generateFilterModel() {
    const filterModel = [];
    if (this.formMetaData && this.formMetaData.properties) {
      for (const key in this.formMetaData.properties) {
        if (this.formMetaData.properties.hasOwnProperty(key)) {
          const element = this.formMetaData.properties[key];

          if (element.type && element['x-ncg']) {
            filterModel.push({
              display: element['x-ncg'].label,
              value: key
            });
          }
        }
      }
    }

    this.fieldFilterModel = filterModel;
  }

  private sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

    if (this.isServerSide) {
      if (sort[0].dir) {
        if (sort[0].dir === 'desc') {
          this.query.orderBy = sort[0].field + ' ' + sort[0].dir;
        } else {
          this.query.orderBy = sort[0].field;
        }
      } else {
        this.query.orderBy = undefined;
      }
    }

    this.getList();
  }

  private gridPageChanged(event: PageChangeEvent): void {
    this.query.skip = event.skip;
    this.getList();
  }

  private numPagesUpdated(event) { }

  protected customValidate() { }

  protected populateComponentDataAsync() {
  }
}
