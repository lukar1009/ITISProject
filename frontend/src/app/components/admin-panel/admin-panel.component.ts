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


class NavListItem {
  id: number;
  text: string;
  icon: string;
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

  public isDrawerOpen: boolean;
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

  onListItemClick(e) {
    console.log(e.itemData.id);
    this.tableChoosen = +e.itemData.id;
    switch(this.tableChoosen) {
      case 1: this.getAllUsers();
              break;
      case 2: this.getAllProducts();
              break;
      case 3: this.getAllCategories();
              break;
      case 4: this.getAllOrders();
              break;
      case 5: this.getAllNews();
              break;
      case 6: this.getAllComments();
              break;
      default: break;
    }
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

  getAllProducts() {
    this._productsService.getAllProducts().then(res => {
      if(res.success && res.data) {
        this.mapProductsResponse(res.data);
      }
    });
  }

  mapProductsResponse(data: any) {
    this.productItems = data.map(p => this.populateProductsResponse(p));
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

  getAllCategories() {
    this._categoriesService.getAllCategories().then(res => {
      if(res.success && res.data) {
        this.mapCategoriesResponse(res.data);
      }
    });
  }

  mapCategoriesResponse(data: any) {
    this.categoryItems = data.map(c => this.populateCategoriesData(c));
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
    console.log("get all orders");
    this._ordersService.getAllOrders().then(res => {
      console.log(res);
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

}
