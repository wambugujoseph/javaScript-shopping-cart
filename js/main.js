/**
 * @author wambugujoseph    
 */
$(document).ready(function(){
	$("#total-cart").html( totalCart() )
});

$(document).ready(function(){

	$(".add-to-cart").click(function(event){
		console.log("the test is working")
		event.preventDefault();
		var name = $(this).attr("data-name");
		var price= Number($(this).attr("data-price"));

		addItemToCart(name,"  ",1, price);
		displayCart();
	});

	$("#clear-cart").click(function(event){
		clearCart();
		displayCart();
	})
});

function displayCart(){
	//console.log("... cart is displayed...")
	var cartArray = listCart();
	var output = "";
	for(var i in cartArray){
		output += "<li>"+ cartArray[i].name+ " " +cartArray[i].count+"</li>";
	}
	$("#show-cart").html(output);
	$("#total-cart").html( totalCart() )

}


 var cart = [];
 var Item = function(name, description, count, price){
 	this.name = name;
 	this.description = description;
 	this.price = price;
 	this.count = count; 
 };

  function addItemToCart(name, description, count,price){
  	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].count += count;
			saveCart();
			return;
		}
	  }
  	var item = new Item(name, description, count, price);
  	cart.push(item);
  	saveCart();
  }

//   addItemToCart("apple", "large size", 2, 30);
//   console.log(cart);    
  //Remove one item
  function removeItemFromCart(name) {
  	
  	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].count --; 
			if (cart[i].count === 0) {
				cart.splice(i, 1)
			}
			break;
		} 	
	}  
	saveCart();  
  }
  
  // remove all the item from the cart
  function removeAllItemFrom(name) {
  	for (var i in cart) {
  		
  		if (cart[i].name === name) {
  			cart.splice(i, 1);
  			break;
  		}
		
	  }
	  saveCart();
  }
  
  //clear everything from the cart
  function clearCart(){
  	cart = [];
  	saveCart();
  }
    
   //returns the total number of items
   function countCart(){
   	 var totalCount = 0;
   	 for (var i in cart) {
   	 	totalCount += cart[i].count;
	   }
	return totalCount;
   } 
   
   //return tatol price of all the commodities
  function totalCart() {
  	var totalCost = 0;
  	for (var i in cart) {
		totalCost += cart[i].price * cart[i].count;
	  }
	  return totalCost.toFixed(2);
  }
   
  
  //return the cart
  function listCart(){
  	var  cartCopy = [];
  	for(var i in cart){
  		var item = cart[i];
  		var itemCopy = {};
  		for(var prop in item){
  			itemCopy[prop] = item[prop];  			
  		}
  		cartCopy.push(itemCopy);
  	}
  	return cartCopy
  }
  
  //save the cart for local storage 
   function saveCart(){
   	 localStorage.setItem("ShoppingCart", JSON.stringify(cart));
   }
   
   //load the cart ffrom loacl storage
  function loadCart(){
  	cart = JSON.parse(localStorage.getItem("ShoppingCart"));
  }
  
  loadCart();