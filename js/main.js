 /**
 * @author wambugujoseph    
 */
$(document).ready(function(){
	
	 myShoppingCart.loadCart();
	//add item to the cart
	$(".add-to-cart").click(function(event){
		event.preventDefault();
		var name = $(this).attr("data-name");
		var price= Number($(this).attr("data-price"));

		myShoppingCart.addItemToCart(name,"  ",1, price);
		displayCart();
	});

	//clear the whole cart
	$(".clear-cart").click(function(event){
		myShoppingCart.clearCart();
		displayCart();
	});

	$("#total-cart").html(myShoppingCart.totalCart());

	$("#show-cart").on("click",".delete-item", function(event){
		var name = $(this).attr("data-name");
		myShoppingCart.removeAllItemFromCart(name);
		displayCart();
	});

	$("#show-cart").on("click", ".subtract-item", function(event){
		var name = $(this).attr("data-name");
		myShoppingCart.removeItemFromCart(name);
		displayCart();
	});

	$("#show-cart").on("click", ".plus-item", function(event){
		var name = $(this).attr("data-name");
		myShoppingCart.addItemToCart(name, "", 1, 0);
		displayCart();
	});

	$("#show-cart").on("change", ".item-count", function(event){
		var name = $(this).attr("data-name");
		var count = Number( $(this).val() );
		myShoppingCart.setCountForItem(name, count);
		displayCart();
	});

	$("#show-cart").on("click", ".clear-cart", function(event){
		myShoppingCart.clearCart();
		displayCart();
	});
});

function displayCart(){
	//console.log("... cart is displayed...")
	var cartArray = myShoppingCart.listCart();
	var output = "";
	for(var i in cartArray){
		output += "<tr><td>" + cartArray[i].name +"</td>"
		+ "<td><input class='item-count' type='number' data-name='"
		+cartArray[i].name+"'value='"+cartArray[i].count+"'> </td>" 
		+"<td>"+ cartArray[i].price +"</td>"
		+" <td>" + (cartArray[i].price * cartArray[i].count).toFixed(2)+"</td>"
		+"<td><Button class='plus-item' data-name='"
		+cartArray[i].name+"'>+</button></td>"
		+"<td><Button class='subtract-item' data-name='"
		+cartArray[i].name+"'>-</button></td>"
		+"<td><button class='delete-item' data-name='"
		+cartArray[i].name+"'>Delete</button></td>" 
		+ "</tr>";
	}
	output +="<tr class='table-success'><td></td>"
	+"<td><b><u>Items in The Cart: </u></b><span id='count-cart'></span></td><td></td>"
	+"<td><b>Total Cart: Ksh </b><span id='total-cart'> </span></td>"
	+"<td></td><td></td>"
	+"<td><button class='btn-warning clear-cart' >Clear Cart</button> </td></tr>";

	$("#show-cart").html(output);
	$("#count-cart").html(myShoppingCart.countCart());
	$("#total-cart").html( myShoppingCart.totalCart() )

}