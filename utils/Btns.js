class Btns{

    constructor(){

        this.btnProduct();
        this.btnClient();
        this.btnOrderService();

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

    showPanelProduct(){

        document.querySelector("#form-new-product").style.display = "block";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "block";

        document.querySelector("#form-new-client").style.display = "none";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "none";

        document.querySelector("#form-new-orderService").style.display = "none";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "none";

    }

    showPanelClient(){

        document.querySelector("#form-new-product").style.display = "none";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "none";

        document.querySelector("#form-new-client").style.display = "block";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "block";

        document.querySelector("#form-new-orderService").style.display = "none";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "none";

    }

    showPanelOrderService(){

        document.querySelector("#form-new-product").style.display = "none";
        document.querySelector("#form-update-product").style.display = "none";
        document.querySelector("#product-list").style.display = "none";

        document.querySelector("#form-new-client").style.display = "none";
        document.querySelector("#form-update-client").style.display = "none";
        document.querySelector("#client-list").style.display = "none";

        document.querySelector("#form-new-orderService").style.display = "block";
        document.querySelector("#form-update-orderService").style.display = "none";
        document.querySelector("#orderService-list").style.display = "block";

    }


}