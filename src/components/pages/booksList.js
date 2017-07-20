'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBooks} from '../../actions/booksActions'
import {Carousel,Grid,Row,Col,Button} from 'react-bootstrap'

import BookItem from './bookItem'
import BooksForm from './bookForm.js'
import Cart from './cart'
//allows us to connetc component to store
class BooksList extends React.Component{

	componentDidMount(){
		//Dispatch an action
		this.props.getBooks()
	}

	render(){
		console.log('Are we accessing the state??::',this.props.books)
		const booksList = this.props.books.map(function(booksArr){
			return (
				<Col xs={12} sm={6} md={4} key ={booksArr._id}>
					<BookItem 
					_id={booksArr._id}
					title={booksArr.title}
					description={booksArr.description}
					images = {booksArr.images}
					price = {booksArr.price}
					/>
				</Col>
				)
		})
		return (
				<Grid>

				<Row>
					<Carousel>
					    <Carousel.Item>
					      <img width={900} height={100}  src="/images/home3.jpg"/>
					      <Carousel.Caption>
					        <h3 style = {{color:'black'}}>Welcome to My Library</h3>
					        <p style = {{color:'black'}}>An app to track one's personal library</p>
					      </Carousel.Caption>
					    </Carousel.Item>
					    <Carousel.Item>
					      <img width={900} height={100}  src="/images/home2.png"/>
					      <Carousel.Caption>
					        <h3 style = {{color:'black'}}>Wishlist</h3>
					        <p style = {{color:'black'}} >Books on this page are on your wishlist and ready to be added to your Personal Library</p>
					      </Carousel.Caption>
					    </Carousel.Item>
					</Carousel>
				</Row>

				<Row>
					<Cart />
				</Row>

				<Row style={{marginTop:'15px'}}>
					{booksList}
				</Row>
			</Grid>
			)
	}
}

	function mapStateToProps(state){
		return{
			books: state.books.books
		}
	}

	function mapDispatchToProps(dispatch){
		return bindActionCreators({getBooks:getBooks},dispatch)
	}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);

//causes component to subscribe to store and return updated state to local component