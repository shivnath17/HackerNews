import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Box from './Box'

class App extends React.Component {
	constructor(props) {
    super(props)
		this.state = {
			dataList: []}

	}

	callAPI = () => {
		fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
		.then(res => res.json())
		.then(data => {
				for (let i = 0; i!=10; i++){
					fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json`)
					.then(res => res.json())
					.then(data => {
						let dataList = this.state.dataList
						dataList.push(data)
						this.setState({dataList: dataList})
					})
				}
		})
	}

	render () {
		if (this.state.dataList.length === 0){
			this.callAPI()
		}
		return (
			<div className="App">
				{this.state.dataList.map( (data) => {
					return <Box title ={data.title} author={data.by}/>
				})}
			</div>
		)
	}
}

export default App;
