import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addToCart,updateCart} from '../../actions/cartActions'
//import actions

import {Row,Col,Well,Button,Image} from 'react-bootstrap'

class BookItem extends React.Component{
	constructor(){
		super();
		this.state = {isClicked:false}
	}
	onReadMore(){
		this.setState({isClicked:true})
	}
	handleCart(){
		const book = [...this.props.cart,{
			_id:this.props._id,
			title:this.props.title,
			description:this.props.description,
			images:this.props.image,
			price:this.props.price
		}]
			
		// CHECK IF CART IS EMPTY
		if(this.props.cart.length > 0) {
			// CART IS NOT EMPTY
			let _id = this.props._id;
			let cartIndex =
			this.props.cart.findIndex(function(cart){
				return cart._id === _id;
				})
				// // IF RETURNS -1 THERE ARE NO ITEMS
				// WITH SAME ID
				if (cartIndex === -1){
					this.props.addToCart(book);
					} 
				else {
				// WE NEED TO UPDATE QUANTITY
				this.props.updateCart(_id, this.props.cart)
					}
				} 

				else {
				// CART IS EMPTY
				this.props.addToCart(book);
				}





	}
	render(){
		return(
			<Well>
				<Row>
					<Col xs={12} sm = {4}>
						<Image src = {this.props.images} responsive />
					</Col>
					<Col xs={12}>
						<h6>{this.props.title}</h6>
						<p>{(this.props.description.length>50 && this.state.isClicked === false )?(this.props.description.substring(0,50)):(this.props.description)}</p>
							<button className = 'link' onClick={this.onReadMore.bind(this)}> {(this.state.isClicked === false && this.props.description !== null && this.props.description.length>50)?('...read more'):('')} </button>
						<h6>usd. {this.props.price}</h6>
						<Button bsStyle='primary' onClick = {this.handleCart.bind(this)}> Add to Personal Library </Button>
					</Col>
				</Row>
			</Well>
			)
	}
}

function mapStateToProps(state){
	return{
		cart:state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToCart:addToCart,updateCart:updateCart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem);