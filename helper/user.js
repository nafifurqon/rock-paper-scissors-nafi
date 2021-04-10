const validateUser = (email, password, res) => {
    if((!email || email === '')){
        res.status(400).json({
            message: "Email are required"
        });
        return;
    }

    if((!password || password === '')){
        res.status(400).json({
            message: "Password are required"
        })
        return;
    }
}

const generateId = (database) => {
    let id = 0;
    if(database.length > 0){
        id = database[database.length - 1].id + 1
    }

    return id;
}

module.exports = { validateUser, generateId }