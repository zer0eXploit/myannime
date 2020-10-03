import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toZawgyi from "../../util/convertToZg";
import styles from "./FourOFour.module.css";

class FourOFour extends Component {
  SORRY_TEXT = "တောင်းပန်ပါသည်။";
  NOT_FOUND_TEXT = "သင်ရှာဖွေနေသောအရာ ကျွန်ုပ်တို့ဆီမှာ မရှိပါ။";
  CHECK_LINK_TEXT = "Link URL ကို သေချာ ပြန်စစ်ကြည့်စေလိုပါသည်။";
  OR_TEXT = "သို့မဟုတ်";
  BACK_TO_HOME_TEXT = "ပင်မစာမျက်နှာသို့";

  render() {
    return (
      <div className={styles.ErrorPage}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>404 | MYAN-nime</title>
        </Helmet>
        <h3>
          {this.props.isZawgyi ? toZawgyi(this.SORRY_TEXT) : this.SORRY_TEXT}
          <br />
          {this.props.isZawgyi
            ? toZawgyi(this.NOT_FOUND_TEXT)
            : this.NOT_FOUND_TEXT}

          <br />
          {this.props.isZawgyi
            ? toZawgyi(this.CHECK_LINK_TEXT)
            : this.CHECK_LINK_TEXT}

          <br />
          {this.props.isZawgyi ? toZawgyi(this.OR_TEXT) : this.OR_TEXT}

          <br />
          <Link to="/">
            {this.props.isZawgyi
              ? toZawgyi(this.BACK_TO_HOME_TEXT)
              : this.BACK_TO_HOME_TEXT}
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
