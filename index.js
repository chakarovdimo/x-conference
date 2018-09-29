function ActiveFriends(props) {
  return (
    <div>
      <h2>Active Friends</h2>
      <ul>
        {props.list.map((friend) => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
            <button onClick={() => props.onToggleFriend(friend.name)}>Deactivate</button>
          </li>
        ))}
      </ul></div>
  )
}//needs to be rendered 
function InactiveFriends(props) {
  return (
    <div>
      <h2>Inactive Friends</h2>
      <ul>
        {props.list.map((friend) => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
            <button onClick={() => props.onToggleFriend(friend.name)}>Activate</button>
          </li>
        ))}
      </ul></div>
  )
}
/* list with names that can be removed same for inactive active friends
function FriendsList(props) {
  return (
    <ul>
      {props.list.map((friend) => (
        <li key={friend.name}>
          <span>{friend.name}</span>
          <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [
        {
          name: "Name1",
          active: true
        },
        {
          name: "Name2",
          active: true
        },
        {
          name: "Name3",
          active: false
        },
        {
          name: "Name4",
          active: false
        },
        {
          name: "Name5",
          active: true
        },
      ],
      input: '',
    }
    // dont forget to bind inside the constructor
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
    this.handleToggleFriend = this.handleToggleFriend.bind(this)
    console.log("constructor");
  }
  componentDidMount = () => {
    console.log("component did mount")
  }
  componentDidUpdate() {
    console.log("  component Did Update  ")
  }
  componentWillUnmount = () => {
    console.log("  component Will Unmount  ")
  }
static getDerivedStateFromProps() {
  
}



  handleAddFriend(params) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.concat([{
          name: currentState.input,
          active: true,
        }
        ]),
        input: '',
      }
    })
  }

  handleRemoveFriend(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.filter((friend) => {
          friend.name === name
        })
      }
    })
  }
  // toggle active property
  handleToggleFriend(name) {
    this.setState((currentState) => {
      const friend = currentState.friends.find((friend) => {
        friend.name === name
      })
      return {
        friends: currentState.friends.filter((friend) => {
          friend.name === name
        }).concat([{ name, active: !friend.active, }
        ])
      }
    })
  }
  updateInput(e) {
    const value = e.target.value
    //method in class component that is responsible for Clear All
    this.setState({
      input: value
    })
  } // or reset with onClick=() => this.setState({friends: []})
  render() {
    console.log("render")
    return (
      <div>
        <input type="text"
          placeholder='new friend'
          value={this.state.input}
          onChange={this.updateInput}
        />

        <button onClick={this.handleAddFriend}>Submit</button>
        <div>
          <button onClick={() => this.setState({
            friends: []
          })}>
            Clear All
         </button>
        </div>

        <ActiveFriends
          onRemoveFriend={this.handleRemoveFriend}
          list={this.state.friends.filter((friend) => friend.active === true)}
          onToggleFriend={this.handleToggleFriend}
        />
        <InactiveFriends
          onRemoveFriend={this.handleRemoveFriend}
          list={this.state.friends.filter((friend) => friend.active === false)}
          onToggleFriend={this.handleToggleFriend}
        />
      </div>
    )
  }
}
//redner both friends 

ReactDOM.render(<App />,
  document.getElementById('app')
)
 