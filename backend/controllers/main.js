const data = require('./data.json');

function GetAllItems() {
    var iphone = data.iphone;
    var ipad = data.ipad;
    var mac = data.mac;
    return iphone.concat(ipad, mac);
}

exports.getItem = (req, res) => {
    const id = req.params.id;
    var items = GetAllItems();

    const item = items.find(item => item.id === id);
    
    if (!item) {
        res.status(404).send('Item not found');
    }
    
    res.status(200).json({
        message: "Item found successfully !" ,
        item
    }); 
}

exports.getItems = (req, res) => {
    var items = GetAllItems();
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}

exports.GetIphone = (req, res) => {
    var items = data.iphone;
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}

exports.GetIpad = (req, res) => {
    var items = data.ipad;
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}

exports.GetMac = (req, res) => {
    var items = data.mac;
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}