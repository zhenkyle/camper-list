function Sorter(props) {
  var name;
  if (props.filter==="recent")
    name = "Points in past 30 days"
  if (props.filter==="all")
      name = "All time points"
  if (props.active===true)
    return <strong>{name}▼</strong>;
  else
    return (
    <a href="#" onClick={e => {
      e.preventDefault();
      props.onClick(props.filter);
    }} ><strong>{name}</strong></a>
    )
}
/*
Sorter.propTypes = {
  active: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
*/

var CamperViewer = React.createClass({
  getInitialState: function() {
    return { data: {
      "recent": [],
      "all": []
      },
      filter: "recent",
    };
  },

  componentDidMount: function() {
    var data={};
    this.serverRequest = $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function (result) {
      data["recent"] = result;

      this.serverRequest = $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function (result) {
        data["all"] = result;
        this.setState({
          data: data
        });
      }.bind(this));

    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  handleClick: function(filter) {
    this.setState({filter});
  },

  render: function() {
    var detailRows = this.state.data[this.state.filter].map(function(props,i) {
      return (
        <tr key={i}>
            <td>
                {i+1}
            </td>
            <td>
                <a href={"https://www.freecodecamp.com/" +props.username} target="_blank"><img src={props.img} alt="" className="img-rounded" />{props.username}</a>
            </td>
            <td className="text-center">
                {props.recent}
            </td>
            <td className="text-center">
                {props.alltime}
            </td>
        </tr>
      );
    });
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <td colSpan="4" className="text-center">
              Leaderboard
            </td>
          </tr>
          <tr>
            <td>
              <strong>#</strong>
            </td>
            <td>
              <strong>Camper Name</strong>
            </td>
            <td className="text-center">
              <Sorter active={this.state.filter === "recent"} filter="recent" onClick={this.handleClick} />
            </td>
            <td className="text-center">
              <Sorter active={this.state.filter === "all"} filter="all" onClick={this.handleClick} />
            </td>
          </tr>
        </thead>
        <tbody>
          {detailRows}
        </tbody>
      </table>

    );
  }
});


ReactDOM.render(
  <CamperViewer />,
  document.getElementById('root')
);
