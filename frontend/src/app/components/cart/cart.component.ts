import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import notify from 'devextreme/ui/notify';
import { OrderParams } from 'src/app/models/http-models/OrderParams';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public itemsIds: number[] = [];
  public cartEmpty: boolean = true;
  public userLoggedIn: boolean = false;

  public allowDeleting: boolean = true;
  public cartItems: Product[] = [];
  public products: Product[] = [];
  public productsLoaded: boolean = false;

  public orderNameValue: string = "";
  public orderPhoneValue: string = "";
  public orderAddressValue: string = "";

  constructor(private _productsService: ProductService,
              private _ordersService: OrdersService,
              private _router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("id")) {
      this.userLoggedIn = true;
      this.checkForCartItems();
      this.orderNameValue = localStorage.getItem("name");
    }
  }

  checkForCartItems() {
    if(sessionStorage.getItem("cart")) {
      this.itemsIds = JSON.parse(sessionStorage.getItem("cart"));
      this.getAllProducts();
      this.cartEmpty = false;
    } else {
      this.cartEmpty = true;
    }
  }

  getAllProducts() {
    this._productsService.getAllProducts().then(res => {
      if(res.data) {
        this.mapProductsResponse(res.data);
      }
    });
  }

  mapProductsResponse(data: any) {
    this.products = data.map(p => this.populateProductData(p));
    this.productsLoaded = true;
    this.fillCartItems();
  }

  populateProductData(data: any) {
    let res = new Product();
    res.id = data["id"];
    res.title = data["title"];
    res.description = data["description"];
    res.price = data["price"];
    res.categoryId = data["categoryId"];
    res.imageUrl = data["imageUrl"];
    return res;
  }

  fillCartItems() {
    this.itemsIds.forEach(id => {
      let tempItem = this.products.find(p => p.id == id);
      if(tempItem != undefined) {
        this.cartItems.push(tempItem);
      } 
    });
  }

  deleteRow(e) {
    let removeIndexCart = this.cartItems.findIndex(p => p.id == e.data.id);
    let removeIndexItemsIds = this.itemsIds.findIndex(p => p == e.data.id);
    if(removeIndexCart > -1 && removeIndexItemsIds > -1) {
      this.cartItems.splice(removeIndexCart, 1);
      this.itemsIds.splice(removeIndexItemsIds, 1);
      if(this.itemsIds.length > 0) {
        sessionStorage.setItem("cart", JSON.stringify(this.itemsIds));
      } else {
        sessionStorage.removeItem("cart");
        this.cartEmpty = true;
        this.cartItems = [];
        this.itemsIds = [];
      }
    }
  }

  placeOrder() {
    // if(this.orderNameValue == "" || this.orderAddressValue == "" || this.orderPhoneValue == "") {
    //   console.log(this.orderNameValue)
    //   notify({
    //     message: "Please fill out your data!",
    //     width: 300,
    //     position: 'top center'
    //   }, "error", 1500);
    // } else {
      this.cartItems.forEach(item => {
      });

      for(var i = 0; i < this.cartItems.length; i++) {
        let orderParams = new OrderParams();
        orderParams.productId = this.cartItems[i].id;
        orderParams.deliveryAddress = this.orderAddressValue;
        orderParams.userId = +localStorage.getItem("id");
        orderParams.quantity = 1;
        this._ordersService.insertNewOrder(orderParams).then(res => {
          if(!res.success) {
            notify({
              message: "Order processing failed!",
              width: 300,
              position: 'top center'
            }, "error", 1500);
            return;
          }
        });
      }
      notify({
        message: "Order successfully processed!",
        width: 300,
        position: 'top center'
      }, "success", 1500);
      sessionStorage.removeItem("cart");
      this._router.navigate(['/home']);
    // }
  }

}
