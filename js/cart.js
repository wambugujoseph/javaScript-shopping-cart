var myShoppingCart = {};

myShoppingCart.cart = [];
myShoppingCart.Item = function(name, description, count, price){
 	this.name = name;
 	this.description = description;
 	this.price = price;
 	this.count = count; 
 };
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                  cart function

 myShoppingCart.addItemToCart = function(name, description, count,price){
  	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count += count;
			this.saveCart();
			return;
		}
	  }
  	var item = new this.Item(name, description, count, price);
  	this.cart.push(item);
  	this.saveCart();
  };

  myShoppingCart.setCountForItem = function(name, count){
		for(var i in this.cart){
			if(this.cart[i].name === name){
				this.cart[i].count = count;
				break;
			}
		}
		this.saveCart();
  };

  //Remove one item
  myShoppingCart.removeItemFromCart = function(name) {
  	
  	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count --; 
			if (this.cart[i].count === 0) {
				this.cart.splice(i, 1)
			}
			break;
		} 	
	}  
	this.saveCart();  
  };
  
  // remove all the item from the cart
  myShoppingCart.removeAllItemFromCart = function(name) {
  	for (var i in this.cart) {
  		
  		if (this.cart[i].name === name) {
			this.cart.splice(i, 1);
  			break;
  		}
		
	  }
	  this.saveCart();
  };
  
  //clear everything from the cart
  myShoppingCart.clearCart = function(){
	this.cart = [];
  	this.saveCart();
  };
    
   //returns the total number of items
   myShoppingCart.countCart = function (){
   	 var totalCount = 0;
   	 for (var i in this.cart) {
   	 	totalCount += this.cart[i].count;
	   }
	return totalCount;
   };
   
   //return tatol price of all the commodities
   myShoppingCart.totalCart = function() {
  	var totalCost = 0;
  	for (var i in this.cart) {
		totalCost += this.cart[i].price * this.cart[i].count;
	  }
	  return totalCost.toFixed(2);
  };
   
  
  //return the cart
  myShoppingCart.listCart = function(){
  	var  cartCopy = [];
  	for(var i in this.cart){
  		var item = this.cart[i];
  		var itemCopy = {};
  		for(var prop in item){
  			itemCopy[prop] = item[prop];  			
  		}
  		cartCopy.push(itemCopy);
  	}
  	return cartCopy
  };
  
  //save the cart for local storage 
  myShoppingCart.saveCart = function (){
   	 localStorage.setItem("ShoppingCart", JSON.stringify(this.cart));
   };

   //load the cart ffrom loacl storage
   myShoppingCart.loadCart = function (){
  	this.cart = JSON.parse(localStorage.getItem("ShoppingCart"));
  };