// product-item.js

class ProductItem extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({mode: 'open'});
		const linkElem = document.createElement('link')
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', './styles/styles.css');
		this.shadowRoot.append(linkElem);
	}

	connectedCallback() {
		const li = document.createElement('li');
		li.setAttribute('class', 'product');
		li.setAttribute('id', 'product-item-' + this.getAttribute('id'))
		const img = li.appendChild(document.createElement('img'));
		img.setAttribute('src', this.getAttribute('img'));
		img.setAttribute('alt', this.getAttribute('title'));
		img.setAttribute('width', 200);
		const title = li.appendChild(document.createElement('p'));
		title.textContent = this.getAttribute('title');
		title.setAttribute('class', 'title');
		const price = li.appendChild(document.createElement('p'));
		price.textContent = this.getAttribute('price');
		price.setAttribute('class', 'price');
		const button = li.appendChild(document.createElement('button'));
		button.setAttribute('id', "cart-button")
		if(this.getAttribute('in-cart') === "true")
			button.textContent = "Remove from Cart";
		else
			button.textContent = "Add to Cart";
		button.setAttribute('onclick', 'toggleCart(' + this.getAttribute('id') + ')');
		this.shadowRoot.append(li);
	}

	static get observedAttributes() {
		return ['in-cart'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		var button = this.shadowRoot.querySelector('#cart-button');
		if(button == null) return
		if(this.getAttribute('in-cart') === "true")
			button.textContent = "Remove from Cart";
		else
			button.textContent = "Add to Cart";
	}
}

customElements.define('product-item', ProductItem);