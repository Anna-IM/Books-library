import { allBooksTemplate } from "./allBooksTemplate.js";
import bookService from "./../../services/bookService.js";

async function getView(context) {
    let allBooks = await bookService.getAll();
    // console.log(allBooks)
    let templateResult = allBooksTemplate(allBooks);
    context.renderView(templateResult);
}

export default {
    getView
}