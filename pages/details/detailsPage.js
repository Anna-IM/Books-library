import { detailsTemplate } from "./detailsTemplate.js";
import bookService from "./../../services/bookService.js";
import authService from "./../../services/authService.js";

async function getView(context) {
    let id = context.params.id;
    let detailsBook = await bookService.get(id);
    let totalLikes = await bookService.getLikes(id);
    let user = {
        isLoggedIn: authService.isLoggedIn()
    }
    let boundDeleteHandler = deleteBook.bind(null, context, id);
    let boundLikesHandler = handleLikes.bind(null, context, id);
    let isOwner = authService.getUserId() === detailsBook._ownerId;
    let userId = authService.getUserId();
    // let getALike;
    // if (user) {
    //     getALike = await bookService.getALike(id, userId);
    // }
    let getALike = await bookService.getALike(id, userId);
    
    let templateResult = detailsTemplate(detailsBook, isOwner, boundDeleteHandler, user, boundLikesHandler, totalLikes, getALike);
    context.renderView(templateResult);
}

async function deleteBook(context, id) {
    let confirmed = confirm("Are you sure you want to delete this book?")
    if (confirmed) {
        await bookService.deleteItem(id);
        context.page.redirect("/home");
    }
}

async function handleLikes(context, id) {
    let item = {
        bookId: id
    }
    let counterLikes = await bookService.like(item);
    context.page.redirect(`/details/${id}`);
}

export default {
    getView
}