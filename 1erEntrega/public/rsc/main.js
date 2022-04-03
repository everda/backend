//EJEMPLO SPA PLANTILLA


const app = new AppController(
    new ProductoModel(),
    new AppView()
)

// const cartApp = new AppController(
//     new CarritoModel(),
//     new AppView()
// )

const routes = [
    { path: '/', action: 'home' },
    { path: '/products', action: 'productsView' },
    { path: '/products/edit', action: 'productsAdmin' },
    { path: '/cart', action: 'cart' }
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

    switch (action) {
        case 'home':
            app.home("#app");
            break;
        case 'productsView':
            //app.userView("#app");
            break;
        case 'productsAdmin':
            //app.adminView("#app");
            break;
        case 'cart':
            //cartApp.home("#app");
            break;
        default:
            ErrorComponent2("#app");
            break;
    }


}



window.onload = () => {
    router();
    window.addEventListener('hashchange', router);
}
