import { Locator, Page } from "@playwright/test";
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

    async navigateTo() {
        await this.page.goto('/');
    }

    getPageTitleLocator() {
        return this.pageTitleName;
    }

    getNameInMenuLocator() {
        return this.nameInMenu;
    }

    async mockProductsResponse(count:number): Promise<void> {
        await this.page.route('**/products*', async (route) => {
            const response = await route.fetch();
            const json = await response.json();

            const originalLength = json.data.length;
            for (let i = 0; i < count - originalLength; i++) {
                json.data.push(json.data[i % originalLength]);
            }

            json.per_page = count;

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(json),
            });
        });
    }
}