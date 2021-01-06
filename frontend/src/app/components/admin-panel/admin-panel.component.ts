import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { News } from 'src/app/models/News';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { Comment } from 'src/app/models/Comment';
import { UsersService } from 'src/app/services/users.service';
import { ProductService } from 'src/app/services/product.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { NewsService } from 'src/app/services/news.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserParams } from 'src/app/models/http-models/UserParams';
import { CommentParams } from 'src/app/models/http-models/CommentParams';
import { NewsParams } from 'src/app/models/http-models/NewsParams';
import { OrderParams } from 'src/app/models/http-models/OrderParams';
import { ProductParams } from 'src/app/models/http-models/ProductParams';


class NavListItem {
  id: number;
  text: string;
  icon: string;
}

class DxoDropdown {
  id: number;
  value: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  listItems: NavListItem[] = [
    {
      id: 1,
      text: "Users",
      icon: "user"
    },
    {
      id: 2,
      text: "Products",
      icon: "product"
    },
    {
      id: 3,
      text: "Categories",
      icon: "folder"
    },
    {
      id: 4,
      text: "Orders",
      icon: "export"
    },
    {
      id: 5,
      text: "News",
      icon: "edit"
    },
    {
      id: 6,
      text: "Comments",
      icon: "comment"
    }
  ];

  public isDrawerOpen: boolean = true;
  public selectedOpenMode: string = 'shrink';
  public selectedPosition: string = 'left';
  public selectedRevealMode: string = 'slide';

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      text: 'Toggle menu',
      onClick: () => this.isDrawerOpen = !this.isDrawerOpen
    }
  }];

  public adminLookups: DxoDropdown[] = [
    {
      id: 0,
      value: "No"
    },
    {
      id: 1,
      value: "Yes"
    }
  ];
  public categoryLookups: DxoDropdown[] = [];
  public userLookups: DxoDropdown[] = [];
  public productLookups: DxoDropdown[] = [];

  public tableChoosen: number = 0;
  public userItems: User[] = [];
  public productItems: Product[] = [];
  public categoryItems: Category[] = [];
  public orderItems: Order[] = [];
  public newsItems: News[] = [];
  public commentsItems: Comment[] = [];

  constructor(private _usersService: UsersService,
              private _productsService: ProductService,
              private _categoriesService: CategoriesService,
              private _ordersService: OrdersService,
              private _newsService: NewsService,
              private _commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  fillLookups(lookupToFill: DxoDropdown[], arrayToFillWith: any[]): DxoDropdown[] {
    lookupToFill = [];
    for(var i = 0; i < arrayToFillWith.length; i++) {
      let newLookup = new DxoDropdown();
      newLookup.id = arrayToFillWith[i]["id"];
      if(arrayToFillWith[i]["name"] == undefined || arrayToFillWith[i]["name"] == null) {
        newLookup.value = arrayToFillWith[i]["title"];
      } else {
        newLookup.value = arrayToFillWith[i]["name"];
      }
      lookupToFill.push(newLookup);
    }
    return lookupToFill;
  }

  onListItemClick(e) {
    let choosenId = +e.itemData.id;
    switch(choosenId) {
      case 1: this.getAllUsers();
              break;
      case 2: this.getAllProducts();
              this.getAllCategories();
              break;
      case 3: this.getAllCategories();
              break;
      case 4: this.getAllOrders();
              this.getAllUsers();
              this.getAllProducts();
              break;
      case 5: this.getAllNews();
              break;
      case 6: this.getAllComments();
              break;
      default: break;
    }
    this.tableChoosen = choosenId;
  }

  getAllUsers() {
    this._usersService.getAllUsers().then(res => {
      if(res.success && res.data) {
        this.mapUsersResponse(res.data);
      }
    });
  }

  mapUsersResponse(data: any) {
    this.userItems = data.map(u => this.populateUserData(u));
    this.userLookups = this.fillLookups(this.userLookups, this.userItems);
  }

  populateUserData(data: any) {
    let res = new User();
    res.id = data["id"];
    res.name = data["name"];
    res.email = data["email"];
    res.password = data["password"];
    res.admin = data["admin"];
    res.createdAt = data["createdAt"];
    res.updatedAt = data["updatedAt"];
    return res;
  }

  userOnRowInserting(e) {
    let newUser: UserParams = new UserParams();
    newUser.name = e.data["name"];
    newUser.admin = e.data["admin"];
    newUser.email = e.data["email"];
    newUser.password = e.data["password"];
    this._usersService.insertNewUser(newUser);
  }

  userOnRowUpdating(e) {
    let updatedUser: UserParams = new UserParams();
    updatedUser.userId = +e.key;
    updatedUser.name = e.newData["name"] == undefined ? e.oldData["name"] : e.newData["name"];
    updatedUser.email = e.newData["email"] == undefined ? e.oldData["email"] : e.newData["email"];
    updatedUser.password = e.newData["password"] == undefined ? e.oldData["password"] : e.newData["password"];
    updatedUser.admin = e.newData["admin"] == undefined ? e.oldData["admin"] : e.newData["admin"];
    this._usersService.updateExistingUser(updatedUser);
  }

  userOnRowRemoving(e) {
    let removeUser: UserParams = new UserParams();
    removeUser.userId = +e.key;
    this._usersService.removeExistingUser(removeUser);
  }

  getAllProducts() {
    this._productsService.getAllProducts().then(res => {
      if(res.success && res.data) {
        this.mapProductsResponse(res.data);
      }
    });
  }

  mapProductsResponse(data: any) {
    this.productItems = data.map(p => this.populateProductsResponse(p));
    this.productLookups = this.fillLookups(this.productLookups, this.productItems);
  }

  populateProductsResponse(data: any) {
    let res = new Product();
    res.id = data["id"];
    res.price = data["price"];
    res.title = data["title"];
    res.imageUrl = data["imageUrl"];
    res.description = data["description"];
    res.categoryId = data["categoryId"];
    res.createdAt = data["createdAt"];
    res.updatedAt = data["updatedAt"];
    return res;
  }

  productOnRowInserting(e) {
    let productParams: ProductParams = new ProductParams();
    productParams.title = e.data["title"];
    productParams.imageUrl = e.data["imageUrl"];
    productParams.description = e.data["description"];
    productParams.price = e.data["price"];
    productParams.categoryId = e.data["categoryId"];
    this._productsService.insertNewProduct(productParams);
  }

  productOnRowUpdating(e) {
    let productParams: ProductParams = new ProductParams();
    productParams.productId = +e.key;
    productParams.title = e.newData["title"] == undefined ? e.oldData["title"] : e.newData["title"];
    productParams.imageUrl = e.newData["imageUrl"] == undefined ? e.oldData["imageUrl"] : e.newData["imageUrl"];
    productParams.description = e.newData["description"] == undefined ? e.oldData["description"] : e.newData["description"];
    productParams.price = e.newData["price"] == undefined ? e.oldData["price"] : e.newData["price"];
    productParams.categoryId = e.newData["categoryId"] == undefined ? e.oldData["categoryId"] : e.newData["categoryId"];
    this._productsService.updateExistingProduct(productParams);
  }

  productOnRowRemoving(e) {
    let productParams: ProductParams = new ProductParams();
    productParams.productId = +e.key;
    this._productsService.removeExistingProduct(productParams);
  }

  getAllCategories() {
    this._categoriesService.getAllCategories().then(res => {
      if(res.success && res.data) {
        this.mapCategoriesResponse(res.data);
      }
    });
  }

  mapCategoriesResponse(data: any) {
    this.categoryItems = data.map(c => this.populateCategoriesData(c));
    this.categoryLookups = this.fillLookups(this.categoryLookups, this.categoryItems);
  }

  populateCategoriesData(data: any) {
    let res = new Category();
    res.id = data["id"];
    res.title = data["title"];
    res.createdAt = data["createdAt"];
    res.updatedAt = data["updatedAt"];
    return res;
  }

  getAllOrders() {
    this._ordersService.getAllOrders().then(res => {
      if(res.success && res.data) {
        this.mapOrdersResponse(res.data);
      }
    });
  }

  mapOrdersResponse(data: any) {
    this.orderItems = data.map(o => this.populateOrdersData(o));
  }

  populateOrdersData(data: any) {
    let res = new Order();
    res.id = data["id"];
    res.deliveryAddress = data["deliveryAddress"];
    res.createdAt = data["createdAt"];
    res.productId = data["productId"];
    res.productName = data["productName"];
    res.quantity = data["quantity"];
    res.userId = data["userId"];
    res.userName = data["userName"];
    return res;
  }

  orderOnRowInserting(e) {
    let orderParams: OrderParams = new OrderParams();
    orderParams.userId = e.data["userId"];
    orderParams.productId = e.data["productId"];
    orderParams.deliveryAddress = e.data["deliveryAddress"];
    orderParams.quantity = e.data["quantity"];
    this._ordersService.insertNewOrder(orderParams);
  }

  getAllNews() {
    this._newsService.getAllNews().then(res => {
      if(res.success && res.data) {
        this.mapNewsResponse(res.data);
      }
    });
  }

  mapNewsResponse(data: any) { 
    this.newsItems = data.map(n => this.populateNewsData(n));
  }

  populateNewsData(data: any) {
    let res = new News();
    res.author = data["author"];
    res.content = data["content"];
    res.createdAt = data["createdAt"];
    res.id = data["id"];
    res.imageUrl = data["imageUrl"];
    res.title = data["title"];
    res.updatedAt = data["updatedAt"];
    return res;
  }

  newsOnRowInserting(e) {
    let newsParams: NewsParams = new NewsParams();
    newsParams.title = e.data["title"];
    newsParams.author = e.data["author"];
    newsParams.imageUrl = e.data["imageUrl"];
    newsParams.content = e.data["content"];
    this._newsService.insertNewNews(newsParams);
  }

  newsOnRowUpdating(e) {
    let newsParams: NewsParams = new NewsParams();
    newsParams.newsId = +e.key;
    newsParams.title = e.newData["title"] == undefined ? e.oldData["title"] : e.newData["title"];
    newsParams.author = e.newData["author"] == undefined ? e.oldData["author"] : e.newData["author"];
    newsParams.imageUrl = e.newData["imageUrl"] == undefined ? e.oldData["imageUrl"] : e.newData["imageUrl"];
    newsParams.content = e.newData["content"] == undefined ? e.oldData["content"] : e.newData["content"];
    this._newsService.updateExistingNews(newsParams);
  }

  newsOnRowRemoving(e) {
    let newsParams: NewsParams = new NewsParams();
    newsParams.newsId = +e.key;
    this._newsService.removeExistingNews(newsParams);
  }

  getAllComments() {
    this._commentsService.getAllComments().then(res => {
      if(res.success && res.data) {
        this.mapCommentsResponse(res.data);
      }
    });
  }

  mapCommentsResponse(data: any) {
    this.commentsItems = data.map(c => this.populateCommentData(c));
  }

  populateCommentData(data: any) {
    let res = new Comment();
    res.author = data["author"];
    res.content = data["content"];
    res.id = data["id"];
    res.title = data["title"];
    return res;
  }

  commentsOnRowInserting(e) {
    let commentParams: CommentParams = new CommentParams();
    commentParams.title = e.data["title"];
    commentParams.author = e.data["author"];
    commentParams.content = e.data["content"];
    this._commentsService.insertNewComment(commentParams);
  }

  commentsOnRowRemoving(e) {
    let commentParams: CommentParams = new CommentParams();
    commentParams.commentId = e.key;
    this._commentsService.removeExistingComment(commentParams);
  }

}
