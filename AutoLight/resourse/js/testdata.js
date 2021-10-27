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
    }
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
            table.innerHTML = defTr;

            res.forEach(row => {
                load.remove();
                let pulp = document.createElement('tr');
                switch(Tab)
                {
                    case 'OUsers':
                        pulp.innerHTML = `<td>${row.login}</td>`;
                    break;
                }
            })
        })
}