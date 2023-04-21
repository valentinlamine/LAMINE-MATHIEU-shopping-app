const data = require('./data.json'); // import the data

// function that returns all items into a table
function GetAllItems() { 
    var iphone = data.iphone;
    var ipad = data.ipad;
    var mac = data.mac;
    return iphone.concat(ipad, mac);
}

// function that returns a single item by id
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

// function that returns all items
exports.getItems = (req, res) => {
    var items = GetAllItems();
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}

// function that returns all iphone
exports.GetIphone = (req, res) => {
    var items = data.iphone;
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}

// function that returns all ipad
exports.GetIpad = (req, res) => {
    var items = data.ipad;
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}

// function that returns all mac
exports.GetMac = (req, res) => {
    var items = data.mac;
    res.status(200).json({
        message: "Items found successfully !" ,
        items
    });
}