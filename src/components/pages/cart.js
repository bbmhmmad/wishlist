import React from 'react'
import {connect} from 'react-redux'
import{Modal,Panel,Col,Row,Well,Button, ButtonGroup, Label} from 'react-bootstrap'

import {bindActionCreators} from 'redux'
import {deleteCartItem,getCart} from '../../actions/cartActions'

class Cart extends React.Component{

	constructor(){
		super();
		this.state={showModal:false}
	}

	componentDidMount(){
		this.props.getCart()
	}

	open(){
		this.setState({showModal:true})
	}
	close(){
		this.setState({showModal:false})
	}
	onDelete(_id){
		const currentBookToDelete =this.props.cart;
		
		// // Determine at which index in books
		// array is the book to be deleted
		const indexToDelete = currentBookToDelete.findIndex(function(cart){
				return cart._id === _id;
			}
		)
		// //use slice to remove the book at the
		// specified index
		let cartAfterDelete = [...currentBookToDelete.slice(0,
		indexToDelete),
		...currentBookToDelete.slice(indexToDelete +
		1)]

		
		this.props.deleteCartItem(cartAfterDelete)
	}

	render(){
		if(this.props.cart[0]){
			return this.renderCart()
		}
		else{
			return this.renderEmpty()
		}
	}

	renderEmpty(){
		return (<div></div>)
	}

	renderCart(){
		const cartItemsList = this.props.cart.map(function(cartArr){
			return (
				<Panel key = {cartArr._id} >
					<Row>
						<Col xs = {12} sm = {4}>
							<h6> {cartArr.title} </h6>
							<span> </span>
						</Col>

						<Col xs = {12} sm = {2}>
							<h6> {cartArr.description} </h6>
						</Col>

						<Col xs = {12} sm = {4}>
							<h6>usd. {cartArr.price} </h6>
						</Col>

						<Col xs = {12} sm = {2}>
							<h6>qty. 1  <Label bsStyle = 'success'> </Label> </h6>
						</Col>

						<Col xs = {6} sm = {4}>
							<ButtonGroup style = {{minWidth:'300px'}}> 

								<span>     </span>
								<Button bsStyle ='danger' bsSize = 'small' onClick = {this.onDelete.bind(this, cartArr._id)} > Delete </Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
				)
		}, this)
		return(
			<Panel header = 'Proceed To Add to Library' bsStyle='primary'>
				{cartItemsList}
			<Row>
				<Col xs = {12}>
					<h6> Total Amount:{this.props.totalAmount} </h6>
					<Button bsStyle='success' bsSize = 'small' onClick = {this.open.bind(this)}>
						Proceed To Add
					</Button>
				</Col>
			</Row>
			<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
	          <Modal.Header closeButton>
	            <Modal.Title>Thank You</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	            Additions have been made
	          </Modal.Body>
	          <Modal.Footer>
	          	<Col xs = {6}>
	          		<h6> Total $: {this.props.totalAmount}</h6>
	          	</Col>
	            <Button onClick={this.close.bind(this)}>Close</Button>
	          </Modal.Footer>
	        </Modal>
			</Panel>
			)
	}
}

function mapStateToProps(state){
	return {
		cart:state.cart.cart,
		totalAmount:state.cart.totalAmount
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteCartItem:deleteCartItem,getCart:getCart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)