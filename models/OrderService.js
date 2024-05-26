class OrderService{

    constructor(code, table, name, cpf, number){

        this._id;
        this._code = code;
        this._table = table;
        this._name = name;
        this._cpf = cpf;
        this._number = number;

    }

    get id(){
        return this._id;
    }

    get code(){
        return this._code;
    }

    set code(value){
        this._code = value;
    }

    get table(){
        return this._table;
    }

    set table(value){
        this._table = value;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get cpf(){
        return this._cpf;0
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

    loadFromJSON(json){

        for (let name in json){

            this[name] = json[name];

        }

    }

    static getOrderServicesStorage(){

        let orderServices = [];

        if(localStorage.getItem("orderServices")){

            orderServices = JSON.parse(localStorage.getItem("orderServices"));

        }

        return orderServices;

    }

    getNewId(){

        let orderServiceId = parseInt(localStorage.getItem("orderServiceId"));

        if(!orderServiceId > 0) orderServiceId = 0;

        orderServiceId++;

        localStorage.setItem("orderServiceId", orderServiceId);

        return orderServiceId;

    }

    save(){

        let orderServices = OrderService.getOrderServicesStorage();

        if(this.id) {

            orderServices.map(o => {
                
                if(o._id == this.id){

                    Object.assign(o, this);

                }

                return o;

            });

        } else {

            this._id = this.getNewId();

            orderServices.push(this);

        }

        localStorage.setItem("orderServices", JSON.stringify(orderServices));

    }

    remove(){

        let orderServices = OrderService.getOrderServicesStorage();

        orderServices.forEach((orderServiceData, index) => {

            if(this._id == orderServiceData._id) {

                orderServices.splice(index, 1);

            }

        });

        localStorage.setItem("orderServices", JSON.stringify(orderServices));
    }

}