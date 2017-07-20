export const booksReducers = function(state = {books:[]},action){
	switch(action.type){
		case'GET_BOOKS':

		return {...state, books:[...action.payload]}
		break;

		case'POST_BOOK':
		// let books = state.books.concat(action.payload)
		// return {books}
		return {...state,books:[...action.payload],msg:'Saved! click to continue', style:'success',validation:'success'}
		break;
		case'POST_BOOK_REJECTED':
		// let books = state.books.concat(action.payload)
		// return {books}
		return {...state,msg:'Please, try again', style:'danger',validation:'error'}
		break;
		case'RESET_BUTTON':
		return{...state,msg:'', style:'primary',validation:'null'}
		
		case "DELETE_BOOK":
		// Create a copy of the current array of books
		
		const currentBookToDelete =[...state.books]
		console.log('WHAT THIS',currentBookToDelete)
		// // Determine at which index in books
		// array is the book to be deleted
		const indexToDelete = currentBookToDelete.findIndex(function(book){
		return book._id == action.payload;
			}
		)
		// //use slice to remove the book at the
		// specified index
		return {books:
		[...currentBookToDelete.slice(0,
		indexToDelete),
		...currentBookToDelete.slice(indexToDelete +
		1)]}
		break;
	}
	return state
}