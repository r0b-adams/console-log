import React, { Component } from "react";
import API from "../utils/API";
import GameGroup from "../GameGroup";
import WalkGroup from "../WalkGroup";
import NextButton from "../NextButton";
import "./style.css";

class HomeContainer extends Component {

  _isMounted = false;

  state = {
    currentPage: "HomePage",
    games: [],
    gamesFilter: [],
    walkthroughs: [],
    next: "",
    prev: "",
    open: false,
    search: this.props.search
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadGames(global.searchable, global.filter);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  reloadGames(query, filter) {
    API.search(query, filter)
      .then((res) => {
        if (res.data.results.length) {
          this.setState({
            games: res.data.results,
            gamesFilter: res.data.results,
            next: res.data.next,
            prev: res.data.previous
          });
        } else {
          const tempGame = []
          tempGame.push(res.data.results)
          this.setState({
            games: tempGame,
          });
        }
      })
      .catch((err) => {
        global.searchable = "";
        localStorage.setItem('searchable', "");
        console.log(err, "not found, defaulting")
      });
  }

  handlePrevSubmit = (event) => {
    global.searchable = this.state.prev;
    localStorage.setItem('searchable', this.state.prev);
    this.reloadGames(global.searchable, global.filter)
  }

  handleNextSubmit = (event) => {
    global.searchable = this.state.next;
    localStorage.setItem('searchable', this.state.next);
    this.reloadGames(global.searchable, global.filter)
  }

  render() {
    return (
      <div>
        <div className="grid sm:grid-flow-col">
          <div className="col">
            <h1 id="heading" className="text-4xl">Games</h1>
            <h2 id="heading" className="my-4 bg-white inline-block p-2 rounded-full"><a href="#headingWalk">Go straight to Walkthroughs</a></h2>
            <GameGroup games={this.state.games} />
            {this.state.games && <NextButton
              handleNextSubmit={this.handleNextSubmit}
              handlePrevSubmit={this.handlePrevSubmit}
              next={this.state.next}
              prev={this.state.prev}
            />}
          </div>
          <div className="sm:col">
          <h1 id="headingWalk" className="text-4xl">Walkthroughs</h1>
          <h2 id="headingWalk" className="my-4 bg-white inline-block p-2 rounded-full"><a href="#heading">Go back up to Games</a></h2>
            <WalkGroup walkthroughs={this.state.walkthroughs} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
