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
    let LINK = `${fLink}/${Tab}`;
    let LINK2 = `${fLink}/${Tab}/${start}/${end}`

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

