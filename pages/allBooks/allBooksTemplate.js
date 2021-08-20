import { html } from "./../../node_modules/lit-html/lit-html.js";

export let bookTemplate = (book) => html`
                <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>${book.type}</p>
                    <p class="img"><img src="${book.imageUrl}"></p>
                    <a class="button" href="/details/${book._id}">Details</a>
                </li>`;

export let allBooksTemplate = (allBooks) => html`
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
                ${allBooks.length > 0
                ? allBooks.map(f => bookTemplate(f))
                : `<p class="no-books">No books in database!</p>`}
			</ul>
        </section>`;