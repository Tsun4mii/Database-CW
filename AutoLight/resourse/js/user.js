let Tab = '';
let defTr;
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
            <td id="ProdCode">id</td>
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
            <td id="ProdCode">id</td>
            <td id="ProdCode">Code</td>
            <td id="ProdName">Name</td>
            <td id="ProdPrice">Price</td>
            <td id="ProdStock">Stock</td>
            <td id="ProdType">Type</td>
            </tr>`
            break;
        case 'OBucket':
            defTr = `<tr>
            <td id="ProdCode">id</td>
            <td id="ProdCode">Code</td>
            <td id="ProdName">Name</td>
            <td id="ProdPrice">Price</td>
            <td id="ProdStock">Amount</td>
            <td id="ProdType">Total Price</td>
            </tr>`
            break;
        case 'OProdStores':
            defTr = `<tr>
            <td id="ProdCode">Code</td>
            <td id="ProdName">Name</td>
            <td id="ProdPrice">Store name</td>
            <td id="ProdStock">Store address</td>
            <td id="ProdType">Stock</td>
            </tr>`
            break;
    }
    get_tab();
}


const fLink = 'http://localhost:5000/api';
async function get_tab()
{
    let container = document.getElementById('out_data');
    container.innerHTML='';
    let load = document.createElement('div');
    load.innerHTML = '<span> LOADING... </span>';
    container.append(load, document.createElement('br'));
    let LINK = `${fLink}/search`;
    let LINK2 = `${fLink}/${Tab}/${start}/${end}`
    let LINK3 = `${fLink}/OBucket`;
    if(Tab === 'OBucket')
    {
        fetch(LINK3, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    start: start,
                    end: end   
                }
            )
        }).then(res => res.json()).then(res => 
        {
            let container = document.getElementById('out_data');
            container.innerHTML = '';
            let rowId = 0;
            let table = document.createElement('table');
            table.setAttribute('border', 1);
            table.setAttribute('class', 'centerTable');
            table.innerHTML = defTr;

            res.forEach(row =>{
                load.remove();
                let pulp = document.createElement('tr');
                pulp.setAttribute('id', `${rowId}`);
                rowId = rowId + 1;
                pulp.innerHTML = `<td class="id">${row.id}</td><td>${row.prodCode}</td><td>${row.prodName}</td><td>${row.prodPrice}</td><td>${row.amount}</td><td>${row.prodPrice * row.amount}</td><td><button onclick="deleteFromBucket()">delete</button></td>`

                table.append(pulp);
            })
            container.append(table);
        })
    }
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
            let rowId = 0;
            let table = document.createElement('table');
            table.setAttribute('border', 1);
            table.setAttribute('class', 'centerTable');
            table.innerHTML = defTr;

            res.forEach(row =>{
                load.remove();
                let pulp = document.createElement('tr');
                pulp.setAttribute('id', `${rowId}`);
                rowId = rowId + 1;
                pulp.innerHTML = `<td id="id">${row.id}</td><td>${row.prodCode}</td><td>${row.prodName}</td><td>${row.prodPrice}</td><td>${row.prodStock}</td><td>${row.prodType}</td><td><button onclick=checkStock() class="bn33">check stock</button></button></td>`

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
                let rowId = 0;
                let table = document.createElement('table');
                table.setAttribute('border', 1);
                table.setAttribute('class', 'centerTable');
                table.innerHTML = defTr;
    
                res.forEach(row => {
                    load.remove();
                    let pulp = document.createElement('tr');
                    pulp.setAttribute('id', `${rowId}`);
                    rowId = rowId + 1;
                    switch(Tab)
                    {
                        case 'OUsers':
                            pulp.innerHTML = `<td>${row.login}</td><td>${row.password}</td><td>${row.email}</td><td>${row.firstName}</td><td>${row.secondName}</td><td>${row.sex}</td><td>${row.age}</td>`;
                        break;
                        case 'OProdTypes':
                            pulp.innerHTML = `<td>${row.id}</td><td>${row.prodType}</td><td>${row.depart}</td>`;
                        break;
                        case 'OProducts':
                            pulp.innerHTML = `<td id="id">${row.id}</td><td id="data">${row.prodCode}</td><td>${row.prodName}</td><td>${row.prodPrice}</td><td id="data">${row.prodStock}</td><td>${row.prodType}</td><td class='tdi'><input type="number" name="amount"/><button onclick="addToBucket()" class="bn33">Add to card</button><button onclick=checkStock() class="bn33">check stock</button></button></td>`
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
    Select_control_buttons()
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

function addToBucket()
{

    let rowId = event.target.parentNode.parentNode.id;
    let data = document.getElementById(rowId).querySelectorAll('#data');
    let amount = document.getElementById(rowId).querySelector('td.tdi > input[name=amount]');
    console.log(amount.value);
    if(amount.value === '')
    {
        alert('Input amount of product')
    }
    else{
    let link = `${fLink}/AddToBucket`
    fetch(link, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            code:data[0].innerHTML,
            amount: amount.value
        })
    })
    }
}
function checkStock()
{
    let LINK4 = `${fLink}/ProdStores`;
    let rowId = event.target.parentNode.parentNode.id;
    let data = document.getElementById(rowId).querySelectorAll('#id');
    console.log(data[0].innerHTML);

    let container = document.getElementById('out_data');
    container.innerHTML='';
    let load = document.createElement('div');
    load.innerHTML = '<span> LOADING... </span>';
    container.append(load, document.createElement('br'));
    fetch(LINK4, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                code: data[0].innerHTML
            }
        )
    }).then(res => res.json()).then(res => 
    {
        let container = document.getElementById('out_data');
        container.innerHTML = '';
        defTr = `<tr>
        <td id="ProdCode">Code</td>
        <td id="ProdName">Name</td>
        <td id="ProdPrice">Store name</td>
        <td id="ProdStock">Store address</td>
        <td id="ProdType">Stock</td>
        </tr>`;
        let table = document.createElement('table');
        table.setAttribute('border', 1);
        table.setAttribute('class', 'centerTable');
        table.innerHTML = defTr;

        res.forEach(row =>{
            load.remove();
            let pulp = document.createElement('tr');
            pulp.innerHTML = `<td>${row.prodCode}</td><td>${row.prodName}</td><td>${row.storeName}</td><td>${row.adress}</td><td>${row.prodStock}</td>`

            table.append(pulp);
        })
        container.append(table);
    })

}

function deleteFromBucket()
{
    let rowId = event.target.parentNode.parentNode.id;
    let data = document.getElementById(rowId).querySelectorAll('.id');
    let LINK5 = `${fLink}/deleteFromBucket`;
    fetch(LINK5, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            prodId:data[0].innerHTML
        })
    }).then(data => {
        console.log(data);
        if(data.status == 200)
        {
            alert('Item deleted from bucket')
        }
        else{
            alert('error occured')
        }
    });
}

