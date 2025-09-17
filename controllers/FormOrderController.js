class FormOrderController{

    constructor(formId){

        this.formEl = document.getElementById(formId);
        this.getQueryParams();
        this.teste();
        this.fillFields();

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

        let orderServiceNumber = document.getElementById("orderService-number");
        orderServiceNumber.innerHTML = params.orderCode;

        let orderTable = document.getElementById("place-number");
        orderTable.innerHTML = params.orderTable;

        let orderName = document.getElementById("name-client");
        orderName.innerHTML = params.orderName;

        let orderCpf = document.getElementById("cpf-number");
        orderCpf.innerHTML = params.orderCpf;

        let orderNumber = document.getElementById("numberPhone");
        orderNumber.innerHTML = params.orderNumber;

    }

    teste(){
        let parametros = this.getQueryParams();
        console.log(parametros);
    }

}