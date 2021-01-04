import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import notify from 'devextreme/ui/notify';

class CategoryWithProducts {
  catId: number;
  catName: string;
  productsAssociated: Product[] = [];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public categories: Category[] = [];

  public products: Product[] = [];
  public productsLoaded: boolean = false;

  public categoriesWithProducts: CategoryWithProducts[] = [];

  public choosenProductsForCart: number[] = [];

  constructor(private _productService: ProductService,
              private _categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.initialCartCheck();
    this.getAllCategories();
  }

  initialCartCheck() {
    if(sessionStorage.getItem("cart")) {
      let tempArr: number[] = JSON.parse(sessionStorage.getItem("cart"));
      tempArr.forEach(el => this.choosenProductsForCart.push(el));
    }
  }

  getAllCategories() {
    this._categoriesService.getAllCategories().then(res => {
      if(res.success) {
        this.mapCategoriesResponse(res.data);
      }else{
        console.log(res.message);
      }
    })
  }

  mapCategoriesResponse(data: any) {
    this.categories = data.map(c => this.populateCategoryData(c));
    this.getAllProducts();
  }

  populateCategoryData(data: any): Category {
    let res = new Category();
    res.id = data["id"];
    res.title = data["title"];
    return res;
  }

  getAllProducts() {
    this._productService.getAllProducts().then(res => {
      if(res.success) {
        this.mapProductsResponse(res.data);
      } else {
        console.log(res.message);
      }
    })
  }

  mapProductsResponse(data: any) {
    this.products = data.map(p => this.populateProductData(p));
    this.populateCategoriesWithProducts();
  }

  populateProductData(data: any): Product {
    let res = new Product();
    res.id = data["id"];
    res.title = data["title"];
    res.price = data["price"];
    res.categoryId = data["categoryId"];
    res.description = data["description"];
    res.imageUrl = data["imageUrl"];
    return res;
  }

  populateCategoriesWithProducts() {
    for(var i = 0; i < this.categories.length; i++) {
      this.categoriesWithProducts.push({
        catId: this.categories[i].id,
        catName: this.categories[i].title,
        productsAssociated: []
      });
    }
    for(var i = 0; i < this.categoriesWithProducts.length; i++) {
      this.products.forEach(prod => {
        if(prod.categoryId == this.categoriesWithProducts[i].catId) {
          this.categoriesWithProducts[i].productsAssociated.push(prod);
        }
      });
    }
  }

  addProductToCart(productId: number) {
    this.choosenProductsForCart.push(productId);
    notify({
      message: "Product added to cart!",
      width: 300,
      position: 'top center'
    }, "success", 1500);

    sessionStorage.setItem("cart", JSON.stringify(this.choosenProductsForCart));
  }
}
