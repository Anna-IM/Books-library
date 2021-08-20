import { editPageTemplate } from "./editPageTemplate.js";
import bookService from "./../../services/bookService.js";

let form = undefined;
async function submitHandler(context, id, e) {
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
            let result = await bookService.update(newBook, id);
            context.page.redirect(`/details/${id}`);
        }
        }catch (err) {
            window.alert(err);
        }
}

async function getView(context) {
    let id = context.params.id;
    let detailsBook = await bookService.get(id);
    //partial application to access the context and avoid nesting submitHandler
    let boundSubmitHandler = submitHandler.bind(null, context, id);
    form = {
        submitHandler: boundSubmitHandler,
        values: {
            title: detailsBook.title,
            description: detailsBook.description,
            imageUrl: detailsBook.imageUrl,
            type: detailsBook.type
        }
    }

    let templateResult = editPageTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}