import React from "react";
import './Loader.scss';
import { HashLoader } from "react-spinners";

export class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <HashLoader size={130} color={"#005baa"} loading={this.state.loading} speedMultiplier={1.2} />
      </div>
    );
  }
}