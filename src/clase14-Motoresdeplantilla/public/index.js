console.log("hola desde el front")

const template = Handlebars.compile( `
<ul>
    <li>{{first_name}}</li>
    <li>{{last_name}}</li>
    <li>{{age}}</li>
    <li>{{email}}</li>
    <li>{{phone}}</li>
</ul>`);

const html =    template({
    first_name: "Juan",
    last_name: "Perez",
    age: "23",
    email: "everda",
    phone: "123456789"

});

document.getElementById("data").innerHTML = html;

    