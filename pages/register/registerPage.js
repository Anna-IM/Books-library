import authService from "./../../services/authService.js";
import { registerTemplate } from "./registerTemplate.js";

async function submitHandler(context, e) {
    e.preventDefault();

    try{
        let form = e.target;
        let formData = new FormData(form);
        let user = {
            email: formData.get("email"),
            password: formData.get("password"),
            repeatPass: formData.get("confirm-pass"),
        }
       
        if (user.email === "" || user.password === "" || user.repeatPass === ""){
            window.alert("All fields are required!");
        } else {
            let registerResponse = await authService.register(user);
            // console.log(registerResponse);
            context.page.redirect('/home');
        }
    } catch(err) {
        window.alert(err);
    }
}

async function getView(context) {
    //partial application to access the context and avoid nesting submitHandler
    let boundSubmitHandler = submitHandler.bind(null, context);
    let form = {
        submitHandler: boundSubmitHandler,
    }
    let templateResult = registerTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
}