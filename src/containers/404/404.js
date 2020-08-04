import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import toZawgyi from "../../util/convertToZg";
import styles from "./FourOFour.module.css";

class FourOFour extends Component {
  render() {
    return (
      <div className={styles.ErrorPage}>
        <h3>
          {this.props.isZawgyi
            ? toZawgyi("တောင်းပန်ပါသည်။")
            : "တောင်းပန်ပါသည်။"}
          <br />
          {this.props.isZawgyi
            ? toZawgyi("သင်ရှာဖွေနေသောအရာ ကျွန်ုပ်တို့ ဆီမှာ မရှိပါ။")
            : "သင်ရှာဖွေနေသောအရာ ကျွန်ုပ်တို့ ဆီမှာ မရှိပါ။"}

          <br />
          {this.props.isZawgyi
            ? toZawgyi("Link URL ကို သေချာ ပြန်စစ်ကြည့်စေလိုပါသည်။")
            : "Link URL ကို သေချာ ပြန်စစ်ကြည့်စေလိုပါသည်။"}

          <br />
          {this.props.isZawgyi ? toZawgyi("သို့မဟုတ်") : "သို့မဟုတ်"}

          <br />
          <Link to="/">
            {this.props.isZawgyi
              ? toZawgyi("ပင်မစာမျက်နှာသို့")
              : "ပင်မစာမျက်နှာသို့"}
          </Link>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isZawgyi: state.mmfont.isZawgyi,
  };
};

export default connect(mapStateToProps)(FourOFour);
