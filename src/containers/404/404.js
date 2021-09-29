import React from "react";
import Helmet from "react-helmet";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import toZawgyi from "../../util/convertToZg";

import styles from "./FourOFour.module.css";

function NotFound(props) {
  const isZawgyi = useSelector((state) => state.mmfont.isZawgyi);

  const SORRY_TEXT = "တောင်းပန်ပါသည်။";
  const NOT_FOUND_TEXT = "သင်ရှာဖွေနေသောအရာ ကျွန်ုပ်တို့ဆီမှာ မရှိပါ။";
  const CHECK_LINK_TEXT = "Link URL ကို သေချာ ပြန်စစ်ကြည့်စေလိုပါသည်။";
  const OR_TEXT = "သို့မဟုတ်";
  const BACK_TO_HOME_TEXT = "ပင်မစာမျက်နှာသို့";

  return (
    <div className={styles.ErrorPage}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 | MYAN-nime</title>
      </Helmet>
      <h3>
        {isZawgyi ? toZawgyi(SORRY_TEXT) : SORRY_TEXT}
        <br />
        {isZawgyi ? toZawgyi(NOT_FOUND_TEXT) : NOT_FOUND_TEXT}
        <br />
        {isZawgyi ? toZawgyi(CHECK_LINK_TEXT) : CHECK_LINK_TEXT}
        <br />
        {isZawgyi ? toZawgyi(OR_TEXT) : OR_TEXT}
        <br />
        <Link to="/">
          {isZawgyi ? toZawgyi(BACK_TO_HOME_TEXT) : BACK_TO_HOME_TEXT}
        </Link>
      </h3>
    </div>
  );
}

export default NotFound;
