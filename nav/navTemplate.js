import authService from "../services/authService.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";
import page from "./../node_modules/page/page.mjs";

async function logoutUser(user) {
    // console.log("test");
    await authService.logout(user);
    page.redirect("/home");
}

export let navTemplate = (navInfo) => html`
        <section class="navbar-dashboard">
                <a href="/home">Dashboard</a>
                ${navInfo.isLoggedIn
                ? loggedControls(navInfo)
                : guestControls()}
        </section>`;

        let guestControls = (navInfo) => html`
                <!-- Guest users -->
                    <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>`;
        let loggedControls = (navInfo) => html`
                <!-- Logged users -->
                    <div id="user">
                        <span>Welcome, ${navInfo.email}</span>
                        <a class="button" href="/my-books">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a class="button" href="javascript:void(0)" @click=${logoutUser}>Logout</a>
                    </div>`;