let Tab = '';
let defTr;
let db_c;
let db_cp;
let start = 0, end = 20;
function TagTab(element)
{
    document.getElementById('out_data').innerHTML='';
    defTr;
    Tab = element.id;
    start = 0;
    end = 20;
    switch(Tab)
    {
        case 'OUsers':
            defTr = `<tr>
            <td id="ULogin">Login</td>
            <td id="UPass">Password</td>
            <td id="UMail">Email</td>
            <td id="UFirst">First Name</td>
            <td id="ULast">Secong Name</td>
            <td id="USex">Sex</td>
            <td id="UAge">Age</td>
            </tr>`
            break;
        case 'OProdTypes':
            defTr = `<tr>
            <td id="ProdId">ID</td>
            <td id="ProdType">Type</td>
            <td id="ProdDepart">Department</td>
            </tr>`
            break;
        case 'OProducts':
            defTr = `<tr>
            <td id="ProdCode">Code</td>
            <td id="ProdName">Name</td>
            <td id="ProdPrice">Price</td>
            <td id="ProdStock">Stock</td>
            <td id="ProdType">Type</td>
            </tr>`
            break;
        case 'OPosts': 
            defTr = `<tr>
            <td id="PostId">Id</td>
            <td id="PostName">Post</td>
            </tr>`
            break;
        case 'OStores':
            defTr=`<tr>
            <td id="StoreId">Id</td>
            <td id="StoreName">Name</td>
            <td id="StoreAddress">Address</td>
            </tr>`
            break;
        case 'OSuppliers':
            defTr=`<tr>
            <td id="SupID">Id</td>
            <td id="SupName">Name</td>
            <td id="SupAddr">Address</td>
            </tr>`
            break;
        case 'SearchProd':
            defTr = `<tr>
            <td id="ProdCode">Code</td>
            <td id="ProdName">Name</td>
            <td id="ProdPrice">Price</td>
            <td id="ProdStock">Stock</td>
            <td id="ProdType">Type</td>
            </tr>`
            break;
    }
    get_tab();
}


const fLink = 'http://localhost:5000/api';
async function get_tab()
{
    db_cp = document.getElementById('db_control_panel');
    db_cp.innerHTML = '';
    db_c = document.getElementById('db_control');
    db_c.innerHTML = '';
    let container = document.getElementById('out_data');
    container.innerHTML='';
    let load = document.createElement('div');
    load.innerHTML = '<span> LOADING... </span>';
    container.append(load, document.createElement('br'));
    let LINK = `${fLink}/search`;
    let LINK2 = `${fLink}/${Tab}/${start}/${end}`
    if(Tab === 'SearchProd')
    {
        let code = document.getElementById('code');
        fetch(LINK, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    code: code.value
                }
            )
        }).then(res => res.json()).then(res => 
        {
            let container = document.getElementById('out_data');
            container.innerHTML = '';

            let table = document.createElement('table');
            table.setAttribute('border', 1);
            table.setAttribute('class', 'centerTable');
            table.innerHTML = defTr;

            res.forEach(row =>{
                load.remove();
                let pulp = document.createElement('tr');
                pulp.innerHTML = `<td>${row.prodCode}</td><td>${row.prodName}</td><td>${row.prodPrice}</td><td>${row.prodStock}</td><td>${row.prodType}</td>`

                table.append(pulp);
            })
            container.append(table);
        })

    }
    else{
    fetch(LINK2).then(res => res.json()).then(res => 
        {
            let container = document.getElementById('out_data');
            container.innerHTML = '';

            let table = document.createElement('table');
            table.setAttribute('border', 1);
            table.setAttribute('class', 'centerTable');
            table.innerHTML = defTr;

            res.forEach(row => {
                load.remove();
                let pulp = document.createElement('tr');
                switch(Tab)
                {
                    case 'OUsers':
                        pulp.innerHTML = `<td>${row.login}</td><td>${row.password}</td><td>${row.email}</td><td>${row.firstName}</td><td>${row.secondName}</td><td>${row.sex}</td><td>${row.age}</td>`;
                    break;
                    case 'OProdTypes':
                        pulp.innerHTML = `<td>${row.id}</td><td>${row.prodType}</td><td>${row.depart}</td>`;
                    break;
                    case 'OProducts':
                        pulp.innerHTML = `<td>${row.prodCode}</td><td>${row.prodName}</td><td>${row.prodPrice}</td><td>${row.prodStock}</td><td>${row.prodType}</td>`
                    break;
                    case 'OPosts':
                        pulp.innerHTML = `<td>${row.id}</td><td>${row.post}</id>`
                    break;
                    case 'OStores':
                        pulp.innerHTML = `<td>${row.id}</td><td>${row.storeName}</td><td>${row.adress}</td>`
                    break;
                    case 'OSuppliers':
                        pulp.innerHTML = `<td>${row.id}</td><td>${row.supName}</td><td>${row.supAddress}</td>`
                    break;
                }
                table.append(pulp);
            })
            container.append(table);
        })
    }
    DB_control_panel(Tab);
    Select_control_buttons()
}

const controlLINK = 'http://localhost:3000/control';
function DB_Controll(elem)
{
    let fun = elem.id;
    db_c = document.getElementById('db_control');
    let sender = document.createElement('center');
    db_c.innerHTML = '';
    let LINK = `${controlLINK}/${fun}/${Tab}`;
    let form = `<form id=${LINK}>`;
    if(Tab == 'OProducts')
    {
        if(fun === 'Add'){
        sender.innerHTML = `
        ${form}
            <input class="TSearch" type="text" name="BarCode" placeholder="BarCode" required></br>
            <input class="TSearch" type="text" name="Name" placeholder="Name"  required>
            <input type="text" placeholder="Product Type Id" name="ProdTypeID" required>
            <input type="text" placeholder="Price" name="Price" required>
            <input type="text" placeholder="Stock" name="Stock" required>
            <input type="submit" value="Input" formmethod="post" formaction="/control/${fun}/${Tab}"/>
        </form>`
        }
        if(fun === 'Delete')
        {
            sender.innerHTML=`
            ${form}
                <input type="text" name="BarCode" placeholder="BarCode" required>
                <input type="submit" value="delete" formmethod="post" formaction="/control/${fun}/${Tab}">
            </form>`
        }
        if(fun === 'Update')
        {
            sender.innerHTML = `
            ${form}
            <input class="TSearch" type="text" name="id" placeholder="id" required></br>
                <input class="TSearch" type="text" name="BarCode" placeholder="BarCode" required></br>
                <input class="TSearch" type="text" name="Name" placeholder="Name"  required>
                <input type="text" placeholder="Product Type Id" name="ProdTypeID" required>
                <input type="text" placeholder="Price" name="Price" required>
                <input type="text" placeholder="Stock" name="Stock" required>
                <input type="text" placeholder="SupId" name="SupId" required>
                <input type="submit" value="Input" formmethod="post" formaction="/control/${fun}/${Tab}"/>
            </form>`   
        }
    }
    if(Tab === 'OStores')
    {
        if(fun === 'Add')
        {
            sender.innerHTML=`
            ${form}
            <input type="text" name="StoreName" placeholder="Store Name" required>
            <input type="text" name="Address" placeholder="Address" required>
            <input type="submit" value="Add" formmethod="post" formaction="/control/${fun}/${Tab}">
            </form>
            `
        }
        if(fun === 'Delete')
        {
            sender.innerHTML =`
            ${form}
            <input type="text" name="StoreId" placeholder="Store Id" required>
            <input type="submit" value="Add" formmethod="post" formaction="/control/${fun}/${Tab}" formtarget="output">
            </form>
            `
        }
        if(fun === 'Update')
        {
            sender.innerHTML=`
            ${form}
            <input type="text" name="StoreId" placeholder="Store Id" required>
            <input type="text" name="StoreName" placeholder="Store Name" required>
            <input type="text" name="Address" placeholder="Address" required>
            <input type="submit" value="Add" formmethod="post" formaction="/control/${fun}/${Tab}">
            </form>`
        }
    }
    if(Tab === 'OPosts')
    {
        if(fun === 'Update')
        {
            sender.innerHTML=`
            ${form}
            <input type="text" name="PostId" placeholder="Post Id" required>
            <input type="text" name="Post" placeholder="Post Name" required>
            <input type="submit" value="Add" formmethod="post" formaction="/control/${fun}/${Tab}">
            </form>` 
        }
        if(fun === 'Add')
        {
            sender.innerHTML=`
            ${form}
            <input type="text" name="Post" placeholder="Post Name" required>
            <input type="submit" value="Add" formmethod="post" formaction="/control/${fun}/${Tab}">
            </form>` 
        }
        if(fun === 'Delete')
        {
            sender.innerHTML=`
            ${form}
            <input type="text" name="PostId" placeholder="Post Id" required>
            <input type="submit" value="Add" formmethod="post" formaction="/control/${fun}/${Tab}">
            </form>` 
        }
    }
    db_c.append(sender);
}


function DB_control_panel(Tab)
{
    db_cp = document.getElementById('db_control_panel')
    if(Tab === 'OProducts')
    {
        db_cp.innerHTML=`
        <button onclick="DB_Controll(this)" id="Add" class="add">Add Product</button>
        <button onclick="DB_Controll(this)" id="Delete" class="delete">Delete Product</button>
        <button onclick="DB_Controll(this)" id="Update" class="update">Update Product</button>
        `
    }
    if(Tab === 'OStores')
    {
        db_cp.innerHTML = `
        <button onclick="DB_Controll(this)" id="Add" class="add">Add Store</button>
        <button onclick="DB_Controll(this)" id="Delete" class="delete">Delete Store</button>
        <button onclick="DB_Controll(this)" id="Update" class="update">Update Stor</button>
        `
    }
    if(Tab === 'OPosts')
    {
        db_cp.innerHTML = `
        <button onclick="DB_Controll(this)" id="Add" class="add">Add Post</button>
        <button onclick="DB_Controll(this)" id="Delete" class="delete">Delete Post</button>
        <button onclick="DB_Controll(this)" id="Update" class="update">Update Post</button>
        `
    }
}

function SelectForward()
{
    start += 20;
    end += 20;
    get_tab();
}
function SelectBack()
{
    if(start == 0 && end == 20)
    {
        start = 0;
        end = 20;
    }
    else
    {
    start -= 20;
    end -= 20;
    }
    get_tab();
}
function Select_control_buttons()
{
    let buttons = document.getElementById('list_control_buttons');
    buttons.innerHTML = `
    <button onclick="SelectBack()">"<"</button>
    <p>${start} - ${end}</p>
    <button onclick="SelectForward()">">"</button>
    `
}

function RestoreToNewInstance()
{
    let div = document.getElementById('restore_new_in');
    div.innerHTML=
    `
    <form method="post" action="/api/resireNewIn">
    <input type="text" name="newDbName" placeholder="Name of new instance" required>
    <input type="submit" value="create">
    </form>
    `
}
function Reconnect(){
    let div =document.getElementById('connectRes');
    div.innerHTML=`
    <form method="post" action="/api/changeDb">
    <input type="text" name="name" placeholder="Name reserve db" required>
    <input type="submit" value="connect">
    </form>
    `
}

const OptLINK = 'http://localhost:3000/api/opt';
