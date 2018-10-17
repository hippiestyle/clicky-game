import React from 'react'; 
import './FriendCard.css';

const FriendCard = props => (
<div 
    className="card"
    onClick={() => props.handleClick(props.id)}
    value={props.id}>

    <div 
    className="img-container">
    <img alt={props.name} src={props.src}/>
    </div>

</div>
); 
export default FriendCard; 