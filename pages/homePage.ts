import {expect, Locator, Page} from "@playwright/test";
import {ProductsFiltersFragment} from "./ProductsFiltersFragment";


export class HomePage {
    page: Page;
    pageTitleName: Locator;
    nameInMenu: Locator;
    filters: ProductsFiltersFragment;
    constructor(page:Page) {
        this.page = page;
        this.pageTitleName =  this.page.getByTestId('page-title');
        this.nameInMenu =  this.page.getByTestId('nav-menu');
        this.filters = new ProductsFiltersFragment(page);
    }

    getPageTitleLocator() {
        return this.pageTitleName;
    }

    getNameInMenuLocator() {
        return this.nameInMenu;
    }
}