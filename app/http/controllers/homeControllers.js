const Menu = require('../../models/menu')
function homeController() {                       //create a function called homeController that returns a function 
    return{
       async index(req, res){                    //async function to get all the data from the database and render the home.ejs file
            
            const pizzas = await Menu.find();              //with await we wait for the promise to be resolved and then we can use the data in the callback function 
            return res.render('home', {pizzas: pizzas})  //frontend will have access to this variable pizzas in the home.ejs
        
            // Menu.find().then((pizzas)=>{                            //find all the data in the database and pass it to the callback function
            //     console.log(pizzas)
            //     return res.render('home', {pizzas: pizzas})
            // })
            }
    }
}

module.exports = homeController;   