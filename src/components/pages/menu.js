import React from 'react'
import {Nav,NavItem,Navbar,Badge} from 'react-bootstrap'
import {connect} from 'react-redux'

class Menu extends React.Component{
	render(){
		
		return(
			<Navbar inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">My Library</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/about">About</NavItem>
        <NavItem eventKey={2} href="/contacts">Contact Me</NavItem>
        
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="/admin">Admin</NavItem>
        <NavItem eventKey={2} href="/cart">YourLibrary<Badge className='badge'> {Object.keys(this.props.cart).length} </Badge></NavItem>

      </Nav>
    </Navbar.Collapse>
  </Navbar>
			)
	}
}

function mapStateToProps(state){
	return {cart:state.cart.cart}
}

export default connect(mapStateToProps)(Menu)
