/*function ExProdToXml(elem)
{
    let container = document.getElementById('out_data');
    container.innerHTML = '';
    let link = `http://localhost:5000/export/${elem.id}`;
    let result = fetch(link).then(data => data.json()).then(data => {
        container.innerHTML = data;
    })
}*/