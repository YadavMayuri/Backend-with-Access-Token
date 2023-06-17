import Users from "../modals/UsersModal.js";



export const registrationCheck= async (req, res, next) => {   
    try {
        const { name, email, password } = req.body;

        if (!name) return res.send("Name is required - middleware");
        if (!email) return res.send("Email is requierd - middleware");
        if (!password) return res.send("Password is requierd - middleware");

        if (password.length < 8) {
            return res.send("Password length is less than 8 !")
        }
        
        const response = await Users.find({ email: email }).exec();
        console.log(response, "response")
        if (response.length) {
            return res.send("Email already exist or You are already resgistered!");
        }
        next();

    } catch (error) {
        return res.send(error)
    }
}