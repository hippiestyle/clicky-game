import React, { Component } from 'react';
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title"; 
import Nav from "./components/Nav"; 
import Container from "./Container"; 
import Row from "./Row";
import Column from "./Column"; 
import friends from "./friends.json"; 
import './App.css';


function shuffleFriends(array) { 
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array; 
}

class App extends Component {
  state = {
    friends, 
    currentScore: 0, 
    topScore: 0,
    rightWrong: "",
    clicked: [] 
  };


  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement(); 
      this.setState = ({ clicked: this.state.clicked.concat(id) })
    } else { 
      this.handleReset(); 
    }
    }; 

    handleIncrement = () => {
      const newScore = this.state.currentScore + 1; 
      this.setState({
        currentScore: newScore, 
        rightWrong: ""
      });

      if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore}); 

      } else if (newScore === 12) {
        this.setState({ rightWrong: "You Win!" });
      }
      this.handleShuffle(); 
        }; 
      handleReset = () => {
        this.setState({
          currentScore: 0, 
          topScore: this.state.topScore,
          rightWrong: "NOT A FRIEND!", 
          clicked: []
        });
        this.handleShuffle(); 
      };
      handleShuffle = () => {
        let shuffle = shuffleFriends(friends); 
        this.setState({ friends: shuffle})
      }; 

  render() {
    return (
     <Wrapper>
       <Nav
       title="How Good of a Friend Are You?"
       score={this.state.currentScore}
       topScore={this.state.currentScore}
       rightWrong={this.state.rightWrong}
        >
         </Nav>

      <Title> How Good of a Friend Are You?
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
