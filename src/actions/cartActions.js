import axios from 'axios'

export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
		.then(function(response){
			dispatch({type:'GET_CART',payload:response.data})
		})
		.catch(function(err){
			dispatch({type:'GET_CART_REJECTED',msg:'ERROR RETRIEVING CART'})
		})
	}
}

export function addToCart(cart){
	return function(dispatch){
		axios.post('/api/cart',cart)
		.then(function(response){
			dispatch({type:'ADD_TO_CART',payload:response.data})
		})
		.catch(function(err){
			dispatch({type:'ADD_TO_CART_REJECTED',msg:'error when adding to cart'})
		})
	}
	// return {
	// type:'ADD_TO_CART',
	// payload:book
	// }
}

export function deleteCartItem(cart){
	return function(dispatch){
		axios.post('/api/cart',cart)
		.then(function(response){
			dispatch({type:'DELETE_CART_ITEM',payload:response.data})
		})
		.catch(function(err){
			dispatch({type:'DELETE_CART_ITEM_REJECTED',msg:'error when deleting to cart'})
		})
	}
}

export function updateCart(_id,cart){
	const currentBookToUpdate = cart

	const indexToUpdate = currentBookToUpdate.findIndex(
		function(book){
			return book._id === _id
			}
		)

	const newBookToUpdate =currentBookToUpdate[indexToUpdate]
	

	let cartUpdate = [...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)]

	return function(dispatch){
		axios.post('/api/cart',cartUpdate)
		.then(function(response){
			dispatch({type:'UPDATE_CART',payload:response.data})
		})
		.catch(function(err){
			dispatch({type:'UPDATE_CART_REJECTED',msg:'error when adding to cart'})
		})
	}
	// return {
	// type:'UPDATE_CART',
	// payload:cartUpdate
	// }
}