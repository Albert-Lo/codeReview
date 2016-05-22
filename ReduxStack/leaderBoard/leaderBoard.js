import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
require('./leaderBoard.css');

/*Redux*/
var UPDATE_BOARD ='UPDATE_BOARD';
var updateBoard = function(data) {
  console.log("update action called")
  return {type: UPDATE_BOARD, data};
}

function leaderBoardReducer(state = {loading: true, leaders: []}, action) {
  switch(action.type) {
    case UPDATE_BOARD:
      return {loading: false, leaders: action.data}
    default:
      return state;
  }
}

/*React Components*/
class LeaderEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, points} = this.props
    return (
      <div className="leaderEntry">
        <div className="leaderName">
          {name}
        </div>
        <div className="leaderPoints">
          {points}
        </div>
      </div>
    )
  }
};

LeaderEntry.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired
};

class LeaderList extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { leaders } = this.props;
    var leaderNodes = leaders.map(function(leader) {
      return (
        <LeaderEntry name={leader.username} key={leader.username} points={leader.alltime} />
      )
    })
    return (
      <div className="leaderList">
        Leader List 
        {leaderNodes}
      </div>
    )
  }
};

LeaderList.propTypes = {
  leaders: PropTypes.array.isRequired
};


class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }

  loadDataFromServer() {
    const { url } = this.props;
    console.log("load data from server called at" + url);
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        store.dispatch(updateBoard(data), function() {
        })
       },
       error: function(xhr, status, err) {
        console.error(url, status, err.toString());
       }
    })
  }; 

  componentDidMount() {
    this.loadDataFromServer();
    setInterval(this.loadDataFromServer, 60000);
  };

  render() {
    const { leaders } = this.props;
    if ( leaders ) {
      return (
        <div className="leaderBoard">
          <div className="leaderBoardTitle">
            Leader Board Title
          </div>
          <LeaderList leaders={leaders} />
        </div>
      )
    }
    else {
      return(
        <div className="loadingPage">
          Welcome to the loading page leaders will arrive soon
        </div>
      )
    }
  }
};

LeaderBoard.propTypes = {
  leaders: PropTypes.array.isRequired;
};

var DynamicLeaderBoard = connect(
  function mapStateToProps(state) {
    return {loading: state.loading, leaders: state.leaders};
  }
)(LeaderBoard);

//Middleware Declaration
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    throw err;
  }
}

/*App Driver*/
let store = createStore(leaderBoardReducer, applyMiddleware(logger, crashReporter));
ReactDOM.render(
  <Provider store={store}>
    <DynamicLeaderBoard url={"https://fcctop100.herokuapp.com/api/fccusers/top/recent"} />
  </Provider>,
  document.getElementById("content")
);
