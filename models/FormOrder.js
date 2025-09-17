class FormOrder{

    constructor(orderCode, orderTable, name, cpf, number){

        this._id;
        this._orderCode = orderCode;
        this._orderTable = orderTable;
        this._name = name;
        this._cpf = cpf;
        this._number = number;
        this._productPrice = [];

    }

    get id(){
        return this._id;
    }

    get orderCode(){
        return this._orderCode;
    }

    set orderCode(value){
        this._orderCode = value;
    }

    get orderTable(){
        return this._orderTable;
    }

    set orderTable(value){
        this._orderTable = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get cpf(){
        return this._cpf;
    }

    set cpf(value){
        this._cpf = value;
    }

    get number(){
        return this._number;
    }

    set number(value){
        this._number = value;
    }

    addProductPrice(item){
        this._productPrice.push(item);
    }

    loadFromJSON(json){

        for (let name in json){

            this[name] = json[name];

        }

    }

    static getFormOrdersStorage(){

        let formOrders = [];

        if(localStorage.getItem("formOrders")){

            formOrders = JSON.parse(localStorage.getItem("formOrders"));

        }

        return formOrders;

    }

    getNewId(){

        let formOrdersId = parseInt(localStorage.getItem("formOrderId"));

        if(!formOrdersId > 0) formOrdersId = 0;

        formOrdersId++;

        localStorage.setItem("formOrderId", formOrdersId);

        return formOrdersId;

    }

    save(){

        let formOrders = FormOrder.getFormOrdersStorage();

        if(this.id) {

            formOrders.map(f => {
                
                if(f._id == this.id){

                    Object.assign(f, this);

                }

                return f;

            });

        } else {

            this._id = this.getNewId();

            formOrders.push(this);

        }

        localStorage.setItem("formOrders", JSON.stringify(formOrders));

    }

    remove(){

        let formOrders = FormOrder.getFormOrdersStorage();

        formOrders.forEach((formOrderData, index) => {

            if(this._id == formOrderData._id) {

                formOrders.splice(index, 1);

            }

        });

        localStorage.setItem("formOrders", JSON.stringify(formOrders));
    }
    

}