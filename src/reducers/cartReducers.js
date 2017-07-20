export function cartReducers(state={cart:[]}, action){
	switch(action.type){
		case 'ADD_TO_CART':
		return {...state,cart:action.payload,totalAmount: totals(action.payload).amount}
		break;
		case 'DELETE_CART_ITEM':
		
		return {...state,cart:action.payload,totalAmount: totals(action.payload).amount}
		break;
		case 'UPDATE_CART':

		return {...state,cart:action.payload,totalAmount: totals(action.payload).amount}
		break;
		case'GET_CART':
		return{...state,
			cart:action.payload,
			totalAmount:totals(action.payload).amount
		}
	}
	return state
}

export function totals(payloadArr){
	const totalAmount = payloadArr.map(function(cartArr){
		return cartArr.price 
	}).reduce(function(a,b){
		return a + b ;
	},0)
	return {amount:totalAmount.toFixed(2)}
}

