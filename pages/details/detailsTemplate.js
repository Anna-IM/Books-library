import { html } from "./../../../node_modules/lit-html/lit-html.js";

export let detailsTemplate = (detailsBook, isOwner, deleteBook, user, handleLikes, totalLikes, getALike) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${detailsBook.title}</h3>
                <p class="type">Type: ${detailsBook.type}</p>
                <p class="img"><img src=${detailsBook.imageUrl}></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${isOwner 
                ? html `
                    <a class="button" href="/edit/${detailsBook._id}">Edit</a>
                    <a class="button" href="javascript:void(0);" @click=${deleteBook}>Delete</a>`
                : ""}

                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                  <!-- <a class="button" href="#">Like</a> -->
                ${user.isLoggedIn && !isOwner && !getALike
                ? loggedControls(handleLikes)
                : ""}
                <!-- ( for Guests and Users )  -->
                  <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${totalLikes}</span>
                  </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${detailsBook.description}</p>
            </div>
        </section>`;

let loggedControls = (handleLikes) => html`<a class="button" href="javascript:void(0)" @click=${handleLikes}>Like</a>`;