import React, { Component } from 'react';
import { articleMounting } from '../../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-bootstrap';
import Confetti from 'react-dom-confetti';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.confettiLimit = 8;
    this.state = {triggerConfetti: false};
  };
  componentWillMount() {
    this.props.articleMounting("thank-you");
    // Toggle confetti state every second
    this.confettiTimer = setInterval(() => {
      if (--this.confettiLimit > 0) {
        this.setState(previousState => {
          return { triggerConfetti: !previousState.triggerConfetti };
        });
      };
    },1000);
  };
  componentDidMount () {
    window.scrollTo(0, 0)
  };
  componentWillUnmount() {
    clearInterval(this.confettiTimer);
  };
  render() {
    const config = {
      angle: 90,
      spread: 60,
      startVelocity: 20,
      elementCount: 200,
      decay: 0.96
    };
    return (
      <article className="thank-you">
        <div className="thank-you-div">
          <Image 
            className='thank-you-img' 
            src="https://media.giphy.com/media/o4LHcRDeiHims/giphy.gif" 
            alt="Thank You" 
            responsive
          />
          <Confetti className='thank-you-confetti' active={ this.state.triggerConfetti } config={ config }/>
        </div>
      </article>
    );
  }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ articleMounting }, dispatch);
export default connect(null, mapDispatchToProps) (ThankYou);

