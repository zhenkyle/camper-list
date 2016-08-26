"use strict";function Sorter(e){var t;return"recent"===e.filter&&(t="Points in past 30 days"),"all"===e.filter&&(t="All time points"),e.active===!0?React.createElement("strong",null,t,"▼"):React.createElement("a",{href:"#",onClick:function(t){t.preventDefault(),e.onClick(e.filter)}},React.createElement("strong",null,t))}var CamperViewer=React.createClass({displayName:"CamperViewer",getInitialState:function(){return{data:{recent:[],all:[]},filter:"recent"}},componentDidMount:function(){var e={};this.serverRequest=$.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent",function(t){e.recent=t,this.serverRequest=$.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime",function(t){e.all=t,this.setState({data:e})}.bind(this))}.bind(this))},componentWillUnmount:function(){this.serverRequest.abort()},handleClick:function(e){this.setState({filter:e})},render:function(){var e=this.state.data[this.state.filter].map(function(e,t){return React.createElement("tr",{key:t},React.createElement("td",null,t+1),React.createElement("td",null,React.createElement("a",{href:"https://www.freecodecamp.com/"+e.username,target:"_blank"},React.createElement("img",{src:e.img,alt:"",className:"img-rounded"}),e.username)),React.createElement("td",{className:"text-center"},e.recent),React.createElement("td",{className:"text-center"},e.alltime))});return React.createElement("table",{className:"table table-striped table-bordered table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("td",{colSpan:"4",className:"text-center"},"Leaderboard")),React.createElement("tr",null,React.createElement("td",null,React.createElement("strong",null,"#")),React.createElement("td",null,React.createElement("strong",null,"Camper Name")),React.createElement("td",{className:"text-center"},React.createElement(Sorter,{active:"recent"===this.state.filter,filter:"recent",onClick:this.handleClick})),React.createElement("td",{className:"text-center"},React.createElement(Sorter,{active:"all"===this.state.filter,filter:"all",onClick:this.handleClick})))),React.createElement("tbody",null,e))}});ReactDOM.render(React.createElement(CamperViewer,null),document.getElementById("root"));