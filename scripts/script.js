// Script.js
var cart = [];

var parseShopData = function(data) {
	if(localStorage.getItem('cart') == null)
		localStorage.setItem('cart', JSON.stringify(cart))
	else
		cart = JSON.parse(localStorage.getItem('cart'))
	document.getElementById('cart-count').textContent = cart.length;
	localStorage.setItem('shopData', JSON.stringify(data))
	var target = document.getElementById('product-list');
	for(var i = 0; i < data.length; i++) {
		var product = data[i]
		var item = document.createElement("product-item");
		item.setAttribute('img', product.image);
		item.setAttribute('price', '$' + product.price);
		item.setAttribute('title', product.title);
		item.setAttribute('id', product.id);
		if(cart.indexOf(product.id) < 0)
			item.setAttribute('in-cart', false)
		else
			item.setAttribute('in-cart', true)
		target.appendChild(item)
	}
}

var toggleCart = function(id) {
	var elem = document.getElementById(id);
	if(cart.indexOf(id) < 0) {
		cart.push(id);
		elem.setAttribute('in-cart', true)
	} else {
		cart.splice(cart.indexOf(id), 1);
		elem.setAttribute('in-cart', false)
	}
	document.getElementById('cart-count').textContent = cart.length;
	localStorage.setItem('cart', JSON.stringify(cart));
}

window.addEventListener('DOMContentLoaded', () => {
 	if(localStorage.getItem('shopData') == null)
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => parseShopData(data))
	else
		parseShopData(JSON.parse(localStorage.getItem('shopData')))
});