class FormOrderController{

    constructor(formId){

        this.formEl = document.getElementById(formId);
        this._products = this.getProductsLocalStorage();     
        this._content = document.getElementById("itemSearchs");

        this.getQueryParams();
        this.fillFields();
        this.displayProducts(this._products);
        this.searchProducts();

        
        this.teste();

    }

    getQueryParams() {

        let query = location.search.slice(1);
        let parts = query.split('&');
        let data = {};
        
        parts.forEach(function (part){
            let valueKey = part.split('=');
            let key = valueKey[0];
            let value = valueKey[1];

            if (value) {
            value = value.replaceAll('%20', ' ');
            }

            data[key] = value;
        });

        return data;
    }

    fillFields(){
        let params = this.getQueryParams();
        document.getElementById("orderService-number").innerHTML = params.orderCode;
        document.getElementById("place-number").innerHTML = params.orderTable;
        document.getElementById("name-client").innerHTML = params.orderName;
        document.getElementById("cpf-number").innerHTML = params.orderCpf;
        document.getElementById("numberPhone").innerHTML = params.orderNumber;
    }

    getProductsLocalStorage(){
        return localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    }

    displayProducts(productsToDisplay) {
        const productsHtml = productsToDisplay.map(product => `
            <div class="searchingProducts">
                ${product._name} &nbsp - &nbsp ${product._descript} &nbsp - &nbsp R$ ${product._price}
            </div>
            `).join('');

        this._content.innerHTML = productsHtml;
    }

    searchProducts(){

        let inputSearch = document.querySelector("input[type='search']");
        let items = [];
        let item = this._content;

        items = this.getNameDescriptPrice();

        inputSearch.oninput = () => {
            this._content.innerHTML = "";
            

            items
                .filter((item) =>
                    item.toLowerCase().includes(inputSearch.value.toLowerCase())
                )
            .forEach((item) => addHTML(item));

        };

    }

    searchProducts(){
        let inputSearch = document.querySelector("input[type='search']");
        
        // Ação 3: O evento "oninput" será o responsável por filtrar os produtos
        inputSearch.oninput = () => {
            const searchTerm = inputSearch.value.toLowerCase();
            
            // Ação 4: Filtra o array de produtos original.
            const filteredProducts = this._products.filter(product => 
                product._name.toLowerCase().includes(searchTerm) ||
                (product._descript && product._descript.toLowerCase().includes(searchTerm))
            );

            // Ação 5: Chama o método displayProducts para exibir apenas os itens filtrados.
            this.displayProducts(filteredProducts);
        };
    }

    teste(){
        console.log(this._content);
    }

}