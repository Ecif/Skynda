import React from "react";
import "./Home.scss";
import Hero from "./Hero/Home.hero";
import Search from "../../../components/skynda.Search"
import Subscribe from "../components/Subscribe";

class Home extends React.Component {
  componentDidMount() {
    try {
      this.props.searchCarAsync();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <Hero/>
        <br/>
        <div className='container'>
          <Search />
          <Subscribe/>
          <br/>
        </div>
      </div>
    );
  }
}

export default Home;
