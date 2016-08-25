function Sorter(props) {
  var name;
  if (props.type==="recent")
    name = "Points in past 30 days"
  if (props.type==="all")
      name = "All time points"
  if (props.active==="true")
    return <strong>{name}▼</strong>;
  else
    return <a href="#"><strong>{name}</strong></a>;
}

var CamperViewer = React.createClass({
  getInitialState: function() {
    return { data: [{"username":"ndburrus","img":"https://avatars.githubusercontent.com/u/15148847?v=3","alltime":1598,"recent":742,"lastUpdate":"2016-08-25T03:30:58.472Z"},{"username":"sjames1958gm","img":"https://avatars.githubusercontent.com/u/4639625?v=3","alltime":2515,"recent":693,"lastUpdate":"2016-08-25T03:30:53.262Z"},{"username":"coffeebeanzz","img":"https://avatars.githubusercontent.com/u/19631203?v=3","alltime":725,"recent":289,"lastUpdate":"2016-08-25T03:23:10.786Z"}] };
  },

  render: function() {
    var detailRows = this.state.data.map(function(props,i) {
      return (
        <tr>
            <td>
                {i+1}
            </td>
            <td>
                <a href={"https://www.freecodecamp.com/" +props.username}><img src={props.img} alt="" className="img-rounded" />{props.username}</a>
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
              <Sorter active="true" type="recent"/>
            </td>
            <td className="text-center">
              <a href="#"><strong>All time points</strong></a>
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
