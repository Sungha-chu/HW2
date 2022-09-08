function init(){
    //GET請求
    axios.get('https://localhost:7219/api/TestLog')
    .then(response => {
        ReadResponseFunc(response.data)     
        ShowAllDataInTable(response.data)   //在table顯示
    }).catch( (error) => console.log(error))
}

function ReadResponseFunc(Response){
    Response.forEach(element => {
        console.log(element);
        console.log(element.id);
        console.log(element.logMsg);
    });
}

function ShowAllDataInTable(Response){
    document.querySelector("#tbody").innerHTML = "";
    Response.forEach(element => {
        tr = document.createElement('tr');
        id = document.createElement('td');
        id.innerHTML = element.id;
        msg = document.createElement('td');
        msg.innerHTML = element.logMsg;

        edit = document.createElement('button');
        edit.innerHTML = "編輯";
        edit.onclick = function(){
            EditMsg(this);
        }

        deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "刪除";
        deleteBtn.onclick = function(){
            DeleteMsg(this);
        }
        btnTd = document.createElement('td');
        btnTd.style = "width:15%";
        btnTd.appendChild(edit);
        btnTd.appendChild(deleteBtn);

        tr.appendChild(id);
        tr.appendChild(msg);
        tr.appendChild(btnTd);
        document.querySelector("#tbody").appendChild(tr);
    });
}

function EditMsg(btn){
    var id = btn.parentNode.previousSibling.previousSibling.innerHTML;
    var msg = btn.parentNode.previousSibling.innerHTML;
    document.querySelector("#IdToEdit").value = id.trim();
    document.querySelector("#MsgToEdit").value = msg.trim();

    document.querySelector('#EditMsgDialog').showModal();
}

function DeleteMsg(btn){
    var id = btn.parentNode.previousSibling.previousSibling.innerHTML;
    var msg = btn.parentNode.previousSibling.innerHTML;
    document.querySelector("#IdToDelete").value = id.trim();
    document.querySelector("#MsgToDelete").value = msg.trim();

    document.querySelector('#DeleteMsgDialog').showModal();
}

function CreateNewMsgDialogBtns(action){
    switch(action){
        case "CreateNewMsgDialogSave":
            var data = {
                "LogMsg":document.querySelector("#NewMsgToCreate").value
            }
            axios.post('https://localhost:7219/api/TestLog',data)
            .then(function (response) {
                console.log(response);
                location=location;
            })
            .catch(function (error) {
                console.log(error);
            });
            break;
        default:
            document.querySelector('#CreateNewMsgDialog').close();
            break;
    }
}

function UdpateMsg(action){
    switch(action){
        case "EditMsgDialogSave":
            var data = {
                "id": document.querySelector("#IdToEdit").value,
                "LogMsg": document.querySelector("#MsgToEdit").value
            }
            axios.put('https://localhost:7219/api/TestLog/'+document.querySelector("#IdToEdit").value, data)
            .then(function (response) {
                console.log(response);
                location = location;
            })
            .catch(function (error) {
                console.log(error);
            });
            break;
        default:
            document.querySelector('#EditMsgDialog').close();
            break;
    }
}

function DeleteMsgBtns(action){
    switch(action){
        case "DeleteMsgDialogSave":
            axios.delete('https://localhost:7219/api/TestLog/'+document.querySelector("#IdToDelete").value)
            .then(function (response) {
                console.log(response);
                location = location;
            })
            .catch(function (error) {
                console.log(error);
            });
            break;
        default:
            document.querySelector('#DeleteMsgDialog').close();
            break;
    }
}