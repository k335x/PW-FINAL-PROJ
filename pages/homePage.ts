import {expect, Locator, Page} from "@playwright/test";

export class HomePage {
    page: Page;
    pageTitleName: Locator;
    nameInMenu: Locator;
    constructor(page:Page) {
        this.page = page;
        this.pageTitleName =  this.page.getByTestId('page-title');
        this.nameInMenu =  this.page.getByTestId('nav-menu');
    }

    getPageTitleLocator() {
        return this.pageTitleName;
    }

    getNameInMenuLocator() {
        return this.nameInMenu;
    }
}