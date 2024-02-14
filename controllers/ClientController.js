class ClientController {

    constructor(formIdCreate, formIdUpdate, tableId){

        this.formEl = document.getElementById(formIdCreate);
        this.formElUpdate = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll();

    }

    onEdit() {

        document.querySelector("#form-update-client .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        });

        this.formElUpdate.addEventListener("submit", e => {

            e.preventDefault();

            let btn = this.formElUpdate.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formElUpdate);

            let index = this.formElUpdate.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let client0 = JSON.parse(tr.dataset.client);

            let result = Object.assign({}, client0, values);

            let client = new Client();

            client.loadFromJSON(result);

            client.save();

            this.getTr(client, tr);

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

        let client = {};

        let isValid = true;

        [...formEl.elements].forEach(function (field, index) {

            if(["name", "cpf", "number"].indexOf(field.name) >  -1 && !field.value) {

                field.parentElement.classList.add("has-error");
                isValid = false;

            }

            client[field.name] = field.value;

        });

        if(!isValid) {

            return false;

        }

        return new Client(

            client.name,
            client.cpf,
            client.number

        );

    }

    selectAll() {

        let clients = Client.getClientsStorage();

        clients.forEach(dataClient => {

            let client = new Client();

            client.loadFromJSON(dataClient);

            this.addLine(client);

        });

    }

    addLine(dataUser, tr = null){

        tr = this.getTr(dataUser);

        this.tableEl.appendChild(tr);

    }

    getTr(dataUser, tr = null){

        if (tr === null) tr = document.createElement("tr");

        tr.dataset.client = JSON.stringify(dataUser);

        tr.innerHTML = `

            <td class="name-client">${dataUser.name}</td>
            <td class="cpf-client">${dataUser.cpf}</td>
            <td class="number-client">${dataUser.number}</td>
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

                let client = new Client();

                client.loadFromJSON(JSON.parse(tr.dataset.client));

                client.remove();

                tr.remove();

            }

        });
        
        tr.querySelector(".btn-list-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.client);

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

        document.querySelector("#form-new-client").style.display = "block";
        document.querySelector("#form-update-client").style.display = "none";

    }

    showPanelUpdate() {

        document.querySelector("#form-new-client").style.display = "none";
        document.querySelector("#form-update-client").style.display = "block";

    }


}