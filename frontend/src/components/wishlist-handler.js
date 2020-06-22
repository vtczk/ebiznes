function removeFromWishlist(token, productId) {
    fetch('http://localhost:9000/favourites/'+ productId, {
        mode: 'cors',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token' : token
        }
    }).catch(err => console.log("Error while deleting product " + productId))
}

function addToWishlist(token, productId) {
    fetch('http://localhost:9000/favourites/'+productId, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token' : token
        }
    }).catch(err => console.log("Error while adding to wishlist " + err))
}

export {removeFromWishlist, addToWishlist};
