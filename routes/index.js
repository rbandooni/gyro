exports.index = (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress ;

    res.setHeader('Access-Control-Allow-Origin', '*') ;

    res.sendFile(path.resolve('../views/index.html'));

};

// exports.control = (req,res) => {
//     res.setHeader()
// }