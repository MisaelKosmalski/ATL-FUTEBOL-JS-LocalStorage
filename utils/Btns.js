class Btns{

    constructor(){

        this.btnProduct();
        this.btnClient();
        this.btnOrderService();
        this.btnOrder();

    }

    btnProduct(){

        document.querySelector("#btn-product").addEventListener("click", e => {

            this.showPanelProduct();
            document.querySelector("#title-page").innerHTML = "Produtos";
            document.querySelector("#subtitle-page").innerHTML = "Gerenciamento de Produtos";

        });

    }

    btnClient(){

        document.querySelector("#btn-client").addEventListener("click", e => {

            this.showPanelClient();
            document.querySelector("#title-page").innerHTML = "Clientes";
            document.querySelector("#subtitle-page").innerHTML = "Gerenciamento de Clientes";

        });

    }

    btnOrderService(){

        document.querySelector("#btn-orderService").addEventListener("click", e => {

            this.showPanelOrderService();
            document.querySelector("#title-page").innerHTML = "Comandas";
            document.querySelector("#subtitle-page").innerHTML = "Gerenciamento de Comandas";

        });

    }

    btnOrder(){

        document.querySelector("#btn-order").addEventListener("click", e => {

            this.showPanelOrder();
            document.querySelector("#title-page").innerHTML = "Pedidos";
            document.querySelector("#subtitle-page").innerHTML = "Lista de Pedidos";

        });

    }

    showPanelProduct(){

        document.querySelector(".background-form").style.display = "block";

        document.querySelector("#form-new-product").style.display = "block";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "block";

        document.querySelector("#form-new-client").style.display = "none";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "none";

        document.querySelector("#form-new-orderService").style.display = "none";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "none";

        document.querySelector("#order-list").style.display = "none";

    }

    showPanelClient(){

        document.querySelector(".background-form").style.display = "block";

        document.querySelector("#form-new-product").style.display = "none";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "none";

        document.querySelector("#form-new-client").style.display = "block";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "block";

        document.querySelector("#form-new-orderService").style.display = "none";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "none";

        document.querySelector("#order-list").style.display = "none";

    }

    showPanelOrderService(){

        document.querySelector(".background-form").style.display = "block";

        document.querySelector("#form-new-product").style.display = "none";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "none";

        document.querySelector("#form-new-client").style.display = "none";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "none";

        document.querySelector("#form-new-orderService").style.display = "block";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "block";

        document.querySelector("#order-list").style.display = "none";

    }

    showPanelOrder(){

        document.querySelector(".background-form").style.display = "none";

        document.querySelector("#form-new-product").style.display = "none";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "none";

        document.querySelector("#form-new-client").style.display = "none";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "none";

        document.querySelector("#form-new-orderService").style.display = "none";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "none";

        document.querySelector("#order-list").style.display = "block";

    }


}