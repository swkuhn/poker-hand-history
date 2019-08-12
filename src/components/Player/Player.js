import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Cards, Positions } from '../../mapping';
import ModalCardImage from '../ModalCardImage/ModalCardImage';
import './Player.scss';
import PropTypes from 'prop-types';

class Player extends Component {
  state = {
    holdings: ["back1.png", "back1.png"],
    position: "?",
    stack_size: 0,
    holdingsIdx: 0,
    modal: false,
    playerModal: false,
    player_type: null
  }

  toggle(event) {
    let holdingsIdx = event.target.getAttribute('data-card');

    this.setState({
      modal: !this.state.modal,
      holdingsIdx
    });
  }

  togglePlayerDetails() {
    this.setState({
      playerModal: !this.state.playerModal
    })
  }

  setStackSize(event) {
    this.setState({
      stack_size: event.target.value
    })
  }

  setPosition(event) {
    let position = event.target.value;
    this.setState({ position });
    this.props.addPosition(position);
  }

  setCard(card) {
    let nextHoldings = [...this.state.holdings];
    nextHoldings[this.state.holdingsIdx] = card

    this.setState({
      holdings: nextHoldings,
      modal: !this.state.modal
    });
  }

  render() {
    let { positionsTaken } = this.props;
    let remainingPositions = Positions.filter(pos => !positionsTaken.has(pos));

    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle.bind(this)}
          className={this.props.className}
        >
          <ModalBody>
            <div className="row">
              <div className="col-12">
                {Cards.map((card,i) => {
                  return (
                    <ModalCardImage
                      src={card}
                      setCard={this.setCard.bind(this, card)}
                      key={`${card}${i}`}
                    />
                  )
                })}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.playerModal}
          toggle={this.togglePlayerDetails.bind(this)}
          className={this.props.className}
        >
          <ModalBody>
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-12 text-center">
                  <h4 className="form-label">Stack Size</h4>
                </div>
              </div>
              <Input
                type="number"
                onChange={this.setStackSize.bind(this)}
              />
              <div className="row">
                <div className="col-12 text-center">
                  <h4 className="form-label">Position</h4>
                </div>
              </div>
              <Input
                type="select"
                onChange={this.setPosition.bind(this)}
               >
                <option value="unknown">unknown</option>
                {remainingPositions.map((pos,i) => {
                  return (
                    <option key={`pos${i}`} value={pos}>{pos}</option>
                  );
                })}
               </Input>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.togglePlayerDetails.bind(this)}>Save</Button>
          </ModalFooter>
        </Modal>
        <p className="player-pos-stack">
          {this.state.position + " / $" + this.state.stack_size}
        </p>
        <img
          data-card="0"
          className="board-card"
          src={`../img/${this.state.holdings[0]}`}
          onClick={this.toggle.bind(this)}
          alt="holding1"
        />
        <img
          data-card="1"
          className="board-card"
          src={`../img/${this.state.holdings[1]}`}
          onClick={this.toggle.bind(this)}
          alt="holding2"
        />
        <p
          className="position-stack-edit mb-2"
          onClick={this.togglePlayerDetails.bind(this)}
        >
          pos/$ &#x270E;
        </p>
      </div>
    );
  }
}

Player.propTypes = {
  player_type: PropTypes.string,
  addPosition: PropTypes.func,
  positionTaken: PropTypes.object
}

export default Player;
