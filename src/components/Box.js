import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	cards:{
		display:"inline-block",
		width:345,
		height:"150px",
		margin:"10px"
	},
	center:{
		textAlign:"left"
	},
	paper:{
		...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
		margin: 10,
	}
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);


class Box extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataList: [],
    	open: false,
		}
	}

	handleClickOpen = () => {
	  const { classes } = this.props;
		this.comments = (
			this.state.dataList.map((data) => {
				return (
					<Paper className={classes.paper} elevation={1}>
						<Typography component="p">{data.text}</Typography>
					</Paper>
				)
			})
		)
	  this.setState({
	    open: true,
	  });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

	callAPI = () => {
		let data = this.props.commentsId;
		if (data){
			let count = data.length;
			if (data.length > 20){
				count = 20
			}
			for (let i = 0; i!=count; i++){
				fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json`)
				.then(res => res.json())
				.then(data => {
					let dataList = this.state.dataList
					dataList.push(data)
					this.setState({dataList: dataList})
				})
			}
		}
	}

	componentWillMount() {
		this.callAPI()
	}

	render () {
	  const { classes } = this.props;
		return (
			<Card className="card" className={classes.cards}>
	      <CardActionArea >
	        <CardContent className={classes.center}>
	          <Typography gutterBottom  component="p">
	            {this.props.title}
	          </Typography>
	          <Typography component="p">
							- By {this.props.author}
	          </Typography>
	        </CardContent>
	      </CardActionArea>
	      <CardActions>
	        <Button variant="contained" size="small" color="primary" onClick={this.handleClickOpen}>
	          View comments
	        </Button>
					<Dialog
	          onClose={this.handleClose}
	          aria-labelledby="customized-dialog-title"
	          open={this.state.open}
      		>
	          <DialogContent>
							{this.comments}
	          </DialogContent>
	        </Dialog>
	      </CardActions>
	    </Card>
		)
	}
}

export default withStyles(styles)(Box);
