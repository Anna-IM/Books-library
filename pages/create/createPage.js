import { createTemplate } from "./createTemplate.js";
import bookService from "./../../services/bookService.js";

async function submitHandler(context, e) {
    e.preventDefault();
    try{
    let formData = new FormData(e.target);
    let invalidFields = "All fields are required!";
    let isInvalid = false;

    let title = formData.get("title");
    let description = formData.get("description");
    let imageUrl = formData.get("imageUrl");
    let type = formData.get("type");

    if (title === "" || description === "" || imageUrl === "" || type === "") {
        window.alert(invalidFields);
        isInvalid = true;
    }

    if (isInvalid === false) {
        let newBook = {
            title,
            description,
            imageUrl,
            type
        }
        let result = await bookService.create(newBook);
        context.page.redirect('/home');
    }
    }catch (err) {
        window.alert(err);
    }
}

async function getView(context) {
    //partial application to access the context and avoid nesting submitHandler
    let boundSubmitHandler = submitHandler.bind(null, context);
    let form = {
        submitHandler: boundSubmitHandler
    }

    let templateResult = createTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}