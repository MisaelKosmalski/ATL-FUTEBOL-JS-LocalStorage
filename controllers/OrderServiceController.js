class OrderServiceController{

    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formElUpdate = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        
        this.onSubmit();
        this.onEdit();
        this.selectAll();

        this._orderS;

    }

    onEdit() {

        document.querySelector("#form-update-orderService .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        });

        this.formElUpdate.addEventListener("submit", e => {

            e.preventDefault();

            let btn = this.formElUpdate.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formElUpdate);

            let index = this.formElUpdate.dataset.osIndex;

            let os = this._orderS;

            let orderService0 = JSON.parse(os.dataset.order);

            let result = Object.assign({}, orderService0, values);

            let orderService = new OrderService();

            orderService.loadFromJSON(result);

            orderService.save();

            this.getOs(orderService, os);

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

            this.addOrder(values);

            this.formEl.reset();

            btn.disabled = false;

        });

    }

    getValues(formEl) {

        let orderService = {};

        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if(["code", "table", "name", "cpf", "number"].indexOf(field.name) >  -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false;

            }

            orderService[field.name] = field.value;

        });

        if(!isValid) {

            return false;

        }

        return new OrderService(

            orderService.code,
            orderService.table,
            orderService.name,
            orderService.cpf,
            orderService.number

        );

    }

    selectAll() {

        let orderServices = OrderService.getOrderServicesStorage();

        orderServices.forEach(dataOrder => {

            let orderService = new OrderService();

            orderService.loadFromJSON(dataOrder);

            this.addOrder(orderService);

        });

    }

    addOrder(dataOrder, os = null){

        os = this.getOs(dataOrder);

        this.tableEl.appendChild(os);

    }

    getOs(dataOrder, os = null){

        if (os === null) os = document.createElement("div");

        os.dataset.order = JSON.stringify(dataOrder);

        os.innerHTML = `
        
            <div class="box-orderService" style="background-image: url(assets/img/background-ball.png);">
                <div class="header-box-orderService">
                    <button class="btn-edit-orderService" style="background-image: url(assets/img/edit-icon.png);">Editar</button>
                    <div class="id-orderService">#${dataOrder.code}</div>
                    <div class="new-order-orderService">
                        <button class="btn-order-orderService">Novo Pedido +</button>
                    </div>
                </div>
                <div class="name-orderService">${dataOrder.name}</div>
                <div class="cpf-orderService">CPF: ${dataOrder.cpf}</div>
                <div class="number-orderService">Telefone: ${dataOrder.number}</div>
                <hr class="hr-orderService">
                <div class="information-orderService">
                    <div class="orders-orderService">Pedidos: 10</div>
                    <div class="priceTotal-orderService">R$ 260,50</div>
                </div>
                <div class="close-orderService">
                    <button class="btn-close-orderService">Encerrar Comanda</button>
                    <div class="table-orderService">Mesa: ${dataOrder.table}</div>
                </div>
            </div>

        `;

        this.addEventsOs(os);

        return os;

    }    

    addEventsOs(os){

        os.querySelector(".btn-close-orderService").addEventListener("click", e => {

            if(confirm("Deseja realmente encerrar?")){

                let orderService = new OrderService();

                orderService.loadFromJSON(JSON.parse(os.dataset.orderService));

                orderService.remove();

                os.remove();

            }

        });
        
        os.querySelector(".btn-edit-orderService").addEventListener("click", e => {

            let json = JSON.parse(os.dataset.order);

            this._orderS = os;

            this.formElUpdate.dataset.osIndex = json._code;

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

        document.querySelector("#form-new-orderService").style.display = "block";
        document.querySelector("#form-update-orderService").style.display = "none";

    }

    showPanelUpdate() {

        document.querySelector("#form-new-orderService").style.display = "none";
        document.querySelector("#form-update-orderService").style.display = "block";

    }

}