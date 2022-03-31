//EJEMPLO SPA PLANTILLA


const app = new ProductoController(
    new ProductoModel(),
    new ProductoView()
)

const routes = [
    {path: '/', action: 'agregar'},
    {path: '/users', action: 'users'},
    {path: '/admin', action: 'admin'}
];

const ErrorComponent2 = (padre) => {
    $(padre).html("<h2>Error 404</h2>");
}

const parseLocation = () => 
    location.hash.slice(1).toLowerCase() || '/';


const findActionByPath = (path, routes) =>
    routes.find(r => r.path == path || undefined);

const router = () => {
    const path = parseLocation();
    const { action = 'error' } = 
        findActionByPath(path, routes) || {};

    switch(action) {
        case 'user':
            app.agregar("#app");
            break;
        case 'admin':
            app.listar("#app");
            break;
        case 'buscar':
            app.buscar("#app");
            break;
        default:
            ErrorComponent2("#app");
            break;
    }


}

$( window ).on('load', function() {
    router();
});

$( window ).on('hashchange', function() {
    router();
});