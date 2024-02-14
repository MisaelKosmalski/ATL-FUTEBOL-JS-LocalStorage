class Client {

    constructor(name, cpf, number){

        this._id;
        this._name = name;
        this._cpf = cpf;
        this._number = number;

    }

    get id(){
        return this._id;
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

    loadFromJSON(json){

        for (let name in json){

            this[name] = json[name];

        }

    }

    static getClientsStorage(){

        let clients = [];

        if(localStorage.getItem("clients")){

            clients = JSON.parse(localStorage.getItem("clients"));

        }

        return clients;

    }

    getNewId(){

        let clientsId = parseInt(localStorage.getItem("clientId"));

        if(!clientsId > 0) clientsId = 0;

        clientsId++;

        localStorage.setItem("clientId", clientsId);

        return clientsId;

    }

    save(){

        let clients = Client.getClientsStorage();

        if(this.id) {

            clients.map(c => {
                
                if(c._id == this.id){

                    Object.assign(c, this);

                }

                return c;

            });

        } else {

            this._id = this.getNewId();

            clients.push(this);

        }

        localStorage.setItem("clients", JSON.stringify(clients));

    }

    remove(){

        let clients = Client.getClientsStorage();

        clients.forEach((clientData, index) => {

            if(this._id == clientData._id) {

                clients.splice(index, 1);

            }

        });

        localStorage.setItem("clients", JSON.stringify(clients));
    }

}