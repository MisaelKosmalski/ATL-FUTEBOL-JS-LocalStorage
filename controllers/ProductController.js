class ProductController {

    constructor(formIdCreate, formIdUpdate, tableId) {

        this.formEl = document.getElementById(formIdCreate);
        this.formElUpdate = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll();

    }

    onEdit() {

        document.querySelector("#form-update-product .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        });

        this.formElUpdate.addEventListener("submit", e => {

            e.preventDefault();

            let btn = this.formElUpdate.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formElUpdate);

            let index = this.formElUpdate.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let product0 = JSON.parse(tr.dataset.product);

            let result = Object.assign({}, product0, values);

            let product = new Product();

            product.loadFromJSON(result);

            product.save();

            this.getTr(product, tr);

            this.formElUpdate.reset();

            btn.disabled = false;

            this.showPanelCreate();

        });

    }

    onSubmit() {

        this.formEl.addEventListener("submit", e => {

            e.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if(!values) return false;

            values.save();

            this.addLine(values);

            this.formEl.reset();

            btn.disabled = false;

        });

    }

    getValues(formEl) {

        let product = {};

        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if(["name", "brand", "descript", "price-buy", "price", "quantity"].indexOf(field.name) >  -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false;

            }

            product[field.name] = field.value;

        });

        if(!isValid) {

            return false;

        }

        return new Product(

            product.name,
            product.brand,
            product.descript,
            product.buyPrice,
            product.price,
            product.quantity

        );

    }

    selectAll() {

        let products = Product.getProductsStorage();

        products.forEach(dataProduct => {

            let product = new Product();

            product.loadFromJSON(dataProduct);

            this.addLine(product);

        });

    }

    addLine(dataUser, tr = null){

        tr = this.getTr(dataUser);

        this.tableEl.appendChild(tr);

    }

    getTr(dataUser, tr = null){

        if (tr === null) tr = document.createElement("tr");

        tr.dataset.product = JSON.stringify(dataUser);

        tr.innerHTML = `
        
            <td class="name-product">${dataUser.name}</td>
            <td class="brand-product">${dataUser.brand}</td>
            <td class="descript-product">${dataUser.descript}</td>
            <td class="price-buy-product">${dataUser.buyPrice}</td>
            <td class="price-product">${dataUser.price}</td>
            <td class="quantity-product">${dataUser.quantity}</td>
            <td class="btns-list">
                <button type="button" class="btn-list-edit">Editar</button>
                <button type="button" class="btn-list-delete">Excluir</button>
            </td>
        
        `;

        this.addEventsTr(tr);

        return tr;

    }    

    addEventsTr(tr){

        tr.querySelector(".btn-list-delete").addEventListener("click", e => {

            if(confirm("Deseja realmente excluir?")){

                let product = new Product();

                product.loadFromJSON(JSON.parse(tr.dataset.product));

                product.remove();

                tr.remove();

            }

        });
        
        tr.querySelector(".btn-list-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.product);

            this.formElUpdate.dataset.trIndex = tr.sectionRowIndex;

            for(let name in json){

                let field = this.formElUpdate.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {

                    field.value = json[name];

                }
            }

            this.showPanelUpdate();

        });

    }

    showPanelCreate() {

        document.querySelector("#form-new-product").style.display = "block";
        document.querySelector("#form-update-product").style.display = "none";

    }

    showPanelUpdate() {

        document.querySelector("#form-new-product").style.display = "none";
        document.querySelector("#form-update-product").style.display = "block";

    }

}