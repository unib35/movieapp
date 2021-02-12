import React, { useEffect, useState } from 'react'
import '../FavoritePage/favorite.css';
import Axios from 'axios'
import { Button, Popover, Card } from 'antd';
import { IMAGE_BASE_URL } from '../../Config'
 

function FavoriteCastPage() {
	
 	 const gridStyle = {
 	 	width: '25%',
  	 	textAlign: 'center',
	 };
	
	
	return(
		<Card title="Card Title">
		<Card.Grid style={gridStyle}>Content</Card.Grid>
		<Card.Grid hoverable={false} style={gridStyle}>
		  Content
		</Card.Grid>
		<Card.Grid style={gridStyle}>Content</Card.Grid>
		<Card.Grid style={gridStyle}>Content</Card.Grid>
		<Card.Grid style={gridStyle}>Content</Card.Grid>
		<Card.Grid style={gridStyle}>Content</Card.Grid>
		<Card.Grid style={gridStyle}>Content</Card.Grid>
		</Card>
	)
}

export default FavoriteCastPage