import page from "./../node_modules/page/page.mjs";
import nav from "./nav/nav.js";
import allBooksPage from "./pages/allBooks/allBooksPage.js";
import createPage from "./pages/create/createPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";
import loginPage from "./pages/login/loginPage.js";
import myBooksPage from "./pages/myBooks/myBooksPage.js";
import registerPage from "./pages/register/registerPage.js";
import renderingMiddleware from "./rendering/renderingMiddleware.js";

let appContainer = document.getElementById("site-content");
let navContainer = document.getElementById("navigation");
renderingMiddleware.initialize(appContainer, navContainer);

page("/index.html", "/home");
page("/", "/home");

page("/home", renderingMiddleware.decorateContext, nav.getView, allBooksPage.getView);
page("/login", renderingMiddleware.decorateContext, nav.getView, loginPage.getView);
page("/register", renderingMiddleware.decorateContext, nav.getView, registerPage.getView);
page("/create", renderingMiddleware.decorateContext, nav.getView, createPage.getView);
page("/details/:id", renderingMiddleware.decorateContext, nav.getView, detailsPage.getView);
page("/edit/:id", renderingMiddleware.decorateContext, nav.getView, editPage.getView);
page("/my-books", renderingMiddleware.decorateContext, nav.getView, myBooksPage.getView);

page.start();