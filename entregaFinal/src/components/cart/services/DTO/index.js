class cartDTO {
    sendCart(obj) {
        let res = [];
        
        if (obj !== null) {

            if (obj.length > 0) {
                obj.forEach(e => {
                    res.push({
                        id: e.id,
                        timestamp: e.timestamp,
                        products: e.products
                    })
                });
            } else {
                res.push({
                    id: obj.id,
                    timestamp: obj.timestamp,
                    products: obj.products
                })
            }
        }

        return res;
    }
}



module.exports = new cartDTO();