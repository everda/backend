class productDTO {
    sendProducts(obj) {
        let res = [];
        
        if (obj !== null) {

            if (obj.length > 0) {
                obj.forEach(e => {
                    res.push({
                        id: e.id,
                        title: e.title,
                        description: e.description,
                        code: e.code,
                        thumbnail: e.thumbnail,
                        price: e.price,
                        stock: e.stock

                    })
                });
            } else {
                res.push({
                    id: obj.id,
                    title: obj.title,
                    description: obj.description,
                    code: obj.code,
                    thumbnail: obj.thumbnail,
                    price: obj.price,
                    stock: obj.stock
                })
            }
        }

        return res;
    }
}



module.exports = new productDTO();