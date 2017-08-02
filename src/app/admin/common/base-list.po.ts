
import { browser, by, element, ElementHelper, protractor } from 'protractor';
import { E2eHelper } from '../common/e2eHelper';
import { AbstractBaseListPageObject } from './abstract.base-list.po';

export class BaseListPageObject extends AbstractBaseListPageObject {

  // --Elements--
  searchInput = element(by.id('searchInput'));
  filterFieldSelect = element(by.id('filterFieldSelect'));
  filterTypeSelect = element(by.id('filterTypeSelect'));
  filterValueInput = element(by.xpath('//*[@id="searchInput"]/input'));
  recordsPerPageInput = element(by.id('recordsPerPageInput'));
  getButton = element(by.id('getButton'));
  addButton = element(by.id('addButton'));

  firstButton = element(by.className('k-pager-first'));
  previousButton = element(by.xpath('//span[contains(@class,"k-i-arrow-w")]/parent::*[contains(@class,"k-link k-pager-nav")]'));
  nextButton = element(by.xpath('//span[contains(@class,"k-i-arrow-e")]/parent::*[contains(@class,"k-link k-pager-nav")]'));
  lastButton = element(by.className('k-pager-last'));

  itemsCountLabel = element(by.css('.k-pager-info'));

  confirmationDialog = element(by.id('confirmationModal'));
  modalCancelButton = this.confirmationDialog.element(by.id('cancelButton'));
  modalOKButton = this.confirmationDialog.element(by.xpath('//button[contains(text(),"Yes")][contains(@class,"k-button k-primary")]'));

  editSelector = by.xpath('//button[contains(@class, "edit-item")]');
  editButton = element(this.editSelector);

  deleteSelector = by.xpath('//button[contains(@class, "delete-item")]');
  deleteButton = element(this.deleteSelector);

  currentPageNumberElement = element(by.xpath('//a[contains(@class,"k-state-selected")]'));

  getCellText(rowXPathIndex: any, columnIndex: number): any {
    if (parseInt(rowXPathIndex)) {
      rowXPathIndex = parseInt(rowXPathIndex);
    }
    return element(by.xpath(`//tr[${rowXPathIndex}]/td[${columnIndex}]`)).getText();
  }

  getFirstAndLastRecordValues(columnIndex): any {
    // columnIndex = 2
    return this.getCellText('1', columnIndex).then((value) => {
      let arr = [];
      arr.push(value);
      return this.checkIfNavigationButtonDisabled('Last').then((isDisabled) => {
        if (!isDisabled) {
          this.goToLastPage();
        }

        return this.getCellText('last()', columnIndex).then((value) => {
          arr.push(value);
          this.goToFirstPage();

          return arr;
        });
      });
    });
  }

  sortColumn(columnIndex): void {
    element(by.xpath(`//th[${columnIndex}]`)).click();
  }

  getColumnIndex(columnLabel) {
    element.all(by.xpath(`//th[.//*/text()[normalize-space(.)="Id"]]/preceding-sibling::*`)).count()
    return element.all(by.xpath(`//th[.//*/text()[normalize-space(.)="${columnLabel}"]]/preceding-sibling::*`))
      .count()
      .then((count) => count + 1);
  }

  getItemsCount(): any {
    return this.itemsCountLabel.getText()
      .then((text) => {
        return parseInt(text.split(' ')[4]); // "1 - 5 of 11 items"
      });
  }

  checkIfNavigationButtonDisabled(navigationButtonText): any {
    return element(by.xpath('//a[contains(@class,"k-state-disabled k-pager-last")]')).isPresent().then((isDisabled) => {
      return isDisabled;
    });
  }

  getNumberOfPagesOnScreen(): any {
    return element(by.xpath('(//ul[contains(@class,"k-pager-numbers")]/li/a)[last()]'))
      .getText()
      .then((text) => {
        return parseInt(text);
      });
  }

  // chooseFieldSelect(columnLabel: string) {
  //   // TODO: return element(by.xpath('//*[@id="fieldSelect"]/option[text()="' + columnLabel + '"]'));
  //   element(by.xpath('//*[@id="fieldSelect"]')).click();
  //   element(by.xpath('//md-option[text()="' + columnLabel + '"]')).click();
  // }

  filter(columnLabel: string, searchValue): void {
    // this.chooseFieldSelect(columnLabel);
    // TODO: element(by.xpath('//*[@id="fieldSelect"]/option[text()="' + columnLabel + '"]')).click();
    element(by.xpath('//*[@id="fieldSelect"]')).click();
    // TODO: element(by.xpath('//*[@id="filterType"]/option[text()="="]')).click();
    element(by.xpath('//md-option[text()="' + columnLabel + '"]')).click();
    element(by.xpath('//*[@id="searchInput"]/input')).clear();
    element(by.xpath('//*[@id="searchInput"]/input')).sendKeys(searchValue);
  }
}
