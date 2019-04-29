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

const styles = {
	cards:{
	display:"inline-block",
	width:345,
	height:"150px",
	margin:"10px"
},
center:{
	textAlign:"left"
}
};
class Box extends React.Component {

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
	        <Button variant="contained" size="small" color="primary">
	          View comments
	        </Button>
	      </CardActions>
	    </Card>
		)
	}
}

export default withStyles(styles)(Box);
