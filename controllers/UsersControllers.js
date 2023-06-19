import Users from "../modals/UsersModal.js";
import encrypt from 'encryptjs';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        var secretkey = 'ios';
        var plaintext = password;
        var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
        let random = "";
        const characters = 'ABCDEFGHIJKJLMNOPQRSTUVWXYZabcdeghijklmnopqrstuvwxyz1234567890';
        const charLength = characters.length;
        let length = 100;
        for (var i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * charLength));
        }
        const accessToken = random

        const user = new Users({
            name: name,
            email: email,
            password: cipherText,
            access_token: accessToken
        });


       
        setTimeout(async () => {
            await Users.updateOne({ _id: user._id }, { $unset: { access_token: 1 } });
        }, 60 * 1000);


        // res.json({ access_token: accessToken });
        await user.save();
        return res.send("Resgistration Succesfull.")

    } catch (error) {
        return res.send(error)
    }
}





export const RegenerateToken = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.send("email is requierd! in middleware");
        if (!password) return res.send("password is requierd! in middleware");
        const user = await Users.find({ email }).exec();
        var secretkey = 'ios';
        // var plaintext = password;
        // var cipherText = encrypt.encrypt(user[0].password, secretkey, 256);
        var decipherPin = encrypt.decrypt(user[0].password, secretkey, 256);
        let random = "";
        const characters = 'ABCDEFGHIJKJLMNOPQRSTUVWXYZabcdeghijklmnopqrstuvwxyz1234567890';
        const charLength = characters.length;
        let length = 100;
        for (var i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * charLength));
        }
        const accessToken = random
        
        if (decipherPin == password) {

            if (user[0].access_token) {
                return res.send("Tocken is already generated.")
            } else {
                await Users.findOneAndUpdate({ email }, { access_token: accessToken });
                setTimeout(async () => {
                    await Users.updateOne({ email }, { $unset: { access_token: 1 } });
                }, 60 * 1000);
                return res.send("Key is generated.")
            }
        } else {
            return res.send("Credentials not matched.")
        }

    } catch (error) {
        return res.send(error)
    }
}