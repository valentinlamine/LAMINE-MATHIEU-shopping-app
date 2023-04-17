const data = require('./data.json');

exports.getSneaker = (req, res) => {
    const id = req.params.id;
    const sneakers = data.sneakers;
    const sneaker = sneakers.find(sneaker => sneaker.id == id);

    if (!sneaker) {
        res.status(404).send('Sneaker not found !');
    }
    
    res.status(200).json({
        message: "Sneaker found successfully !" ,
        sneaker
    }); 
}

exports.getSneakers = (req, res) => {
    const sneakers = data.sneakers;
    res.status(200).json({
        message: "Sneakers found successfully !" ,
        sneakers
    });
}