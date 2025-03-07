import {Component} from 'react'
import './index.css'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    score: 0,
    topScore: 0,
    selectedEmojsList: [],
    gameStatus: 'running',
  }

  onEmojiSelect = id => {
    const {selectedEmojsList, score, topScore} = this.state

    if (selectedEmojsList.includes(id)) {
      let highestScore = topScore
      if (score > highestScore) {
        highestScore = score
      }
      this.setState({
        topScore: highestScore,
        gameStatus: 'lose',
      })
    } else if (score === 11 && !selectedEmojsList.includes(id)) {
      this.setState(prevState => ({
        selectedEmojsList: [...prevState.selectedEmojsList, id],
        score: prevState.score + 1,
        topScore: 12,
        gameStatus: 'won',
      }))
    } else {
      this.setState(prevState => ({
        selectedEmojsList: [...prevState.selectedEmojsList, id],
        score: prevState.score + 1,
      }))
    }
  }

  playAgain = () => {
    this.setState({
      selectedEmojsList: [],
      score: 0,
      gameStatus: 'running',
    })
  }

  renderContent = () => {
    const {gameStatus, score} = this.state
    const {emojisList} = this.props
    const shuffledEmojisList = () => emojisList.sort(() => Math.random() - 0.5)

    if (gameStatus === 'running') {
      return (
        <ul className="emojis-list-container">
          {shuffledEmojisList().map(eachEmoji => (
            <EmojiCard
              emojiObj={eachEmoji}
              key={eachEmoji.id}
              onEmojiSelect={this.onEmojiSelect}
            />
          ))}
        </ul>
      )
    }
    return (
      <WinOrLoseCard
        gameStatus={gameStatus}
        playAgain={this.playAgain}
        score={score}
      />
    )
  }

  render() {
    const {score, topScore, gameStatus} = this.state
    return (
      <div className="bg-container">
        <NavBar score={score} topScore={topScore} gameStatus={gameStatus} />
        <div className="bottom-container">
          <div className="container">{this.renderContent()}</div>
        </div>
      </div>
    )
  }
}

export default EmojiGame
