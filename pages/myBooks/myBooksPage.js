import { allMyBooksTemplate } from "./myBooksTemplate.js";
import authService from "../../services/authService.js";
import bookService from "./../../services/bookService.js";

async function getView(context) {
    let id = authService.getUserId();
    let myBooks= await bookService.getMyBooks(id);
    let templateResult = allMyBooksTemplate(myBooks);
    context.renderView(templateResult);
}

export default {
    getView
}