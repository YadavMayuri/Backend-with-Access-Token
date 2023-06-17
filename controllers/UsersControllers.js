import Users from "../modals/UsersModal.js";
import encrypt from 'encryptjs';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        var secretkey = 'ios';
        var plaintext = password;
        var cipherText = encrypt.encrypt(plaintext, secretkey, 256);

        
        const user = new Users({ name, email, password: cipherText })
        await user.save();
        return res.send("Resgistration Succesfull.")

    } catch (error) {
        return res.send(error)
    }
}