import React, { Component } from 'react';
import logo from './logo.svg';
import Title from "./components/Title"; 
import Nav from "./components/Nav"; 
import Wrapper from "./components/Wrapper";
import FriendCard from "./components/FriendCard";
import Container from "./Container"; 
import Row from "./Row";
import Column from "./Column"; 
import friends from "./friends.json"; 
import './App.css';


function shufflePictures(array) { 
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array; 
}

class App extends Component {
  state = {
    friends, 
    yourScore: 0, 
    highScore: 0,
    rightWrong: "",
    clicked: [] 
  };


  handleClick = key => {
    if (this.state.clicked.indexOf(key) === -1) {
      this.handleIncrement(); 
      this.setState = ({ clicked: this.state.clicked.concat(key) })
    } else { 
      this.handleReset(); 
    }
    }; 

    handleIncrement = () => {
      const newScore = this.state.yourScore + 1; 
      this.setState({
        yourScore: newScore, 
        rightWrong: ""
      });

      if (newScore >= this.state.highScore) {
        this.setState({ highScore: newScore}); 

      } else if (newScore === 12) {
        this.setState({rightWrong: "You Win!"});
      }
      this.handleShuffle(); 
        }; 
      handleReset = () => {
        this.setState({
          yourScore: 0, 
          highScore: this.state.highScore,
          rightWrong: "NOT A FRIEND!", 
          clicked: []
        });
        this.handleShuffle(); 
      };
      handleShuffle = () => {
        let shuffle = shufflePictures(friends); 
        this.setState({ friends: shuffle})
      }; 

  render() {
    return (
     <Wrapper>
       <Nav
       title="How Good of a Friend Are You?"
       score={this.state.yourScore}
       highScore={this.state.highScore}
       rightWrong={this.state.rightWrong}
        >
         </Nav>

      <Title> This is the title!
        </Title>

        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
              <FriendCard
                key={friend.id}
                id={friend.id}
                image={friend.image}
                handleClick={this.handleClick}
                handleIncrement={this.handleIncrement}
                handleReset={this.handleReset}
                handleShuffle={this.handleShuffle}
                />
              </Column>
            ))}
          </Row>
          </Container>      
       </Wrapper>

    );
  }
}

export default App;
