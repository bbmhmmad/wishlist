import React from 'react'
import Menu from './components/pages/menu'
import Footer from './components/pages/footer'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCart} from '../src/actions/cartActions'

class Main extends React.Component{
	componentDidMount(){
		this.props.getCart()
	}
	render(){
		return(
			<div>
				<Menu />
					{this.props.children}
				<Footer />
			</div>
			)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getCart:getCart},dispatch)
}

export default connect(null,mapDispatchToProps)(Main)