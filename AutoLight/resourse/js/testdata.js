let Tab = '';
let defTr;

function TagTab(element)
{
    document.getElementById('out_data').innerHTML='';
    defTr;
    Tab = element.id;
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

    fetch(LINK).then(res => res.json()).then(res => 
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
                }
                table.append(pulp);
            })
            container.append(table);
        })
}