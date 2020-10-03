import React from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Helmet } from "react-helmet";
import toZawgyi from "../../util/convertToZg";

import classes from "./About.module.css";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>About | MYAN-nime</title>
        </Helmet>
        <CssBaseline />
        <Container maxWidth="md" className={classes.About}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">
                {this.props.isZawgyi
                  ? toZawgyi("ကျွန်ုပ်တို့ အကြောင်း")
                  : "ကျွန်ုပ်တို့ အကြောင်း"}
              </Typography>
              <Typography variant="subtitle1">
                {this.props.isZawgyi
                  ? toZawgyi(
                      "ကျွန်တော်တို့ဟာ မြန်မာစာတန်းထိုး anime တွေကို လွယ်လွယ်ကူကူနဲ့တိုက်ရိုက်ကြည့်လို့ရနိုင်အောင် ကြိုးစားလုပ်ဆောင်နေတဲ့"
                    )
                  : "ကျွန်တော်တို့ဟာ မြန်မာစာတန်းထိုး anime တွေကို လွယ်လွယ်ကူကူနဲ့တိုက်ရိုက်ကြည့်လို့ရနိုင်အောင် ကြိုးစားလုပ်ဆောင်နေတဲ့"}
                <em>
                  <strong>
                    {" "}
                    {this.props.isZawgyi ? toZawgyi("အိုသာခု") : "အိုသာခု"}{" "}
                  </strong>
                </em>
                {this.props.isZawgyi
                  ? toZawgyi("တစ်သိုက်ဖြစ်ပါတယ်။")
                  : "တစ်သိုက်ဖြစ်ပါတယ်။"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {this.props.isZawgyi
                  ? toZawgyi("ကျွန်ုပ်တို့ရဲ့")
                  : "ကျွန်ုပ်တို့ ရဲ့ "}
                Mission
              </Typography>
              <Typography variant="subtitle1">
                {this.props.isZawgyi
                  ? toZawgyi(
                      "အကောင်းဆုံး anime တိုက်ရိုက်ကြည့်လို့ရတဲ့ website တစ်ခုဖြစ်အောင်လုပ်ဆောင်ဖို့ဖြစ်ပါတယ်။ ပြီးတော့ anime တွေကို စုံစုံလင်လင်တင်နိုင်ဖို့ဖြစ်ပါတယ်။"
                    )
                  : "အကောင်းဆုံး anime တိုက်ရိုက်ကြည့်လို့ရတဲ့ website တစ်ခုဖြစ်အောင်လုပ်ဆောင်ဖို့ဖြစ်ပါတယ်။ ပြီးတော့ anime တွေကို စုံစုံလင်လင်တင်နိုင်ဖို့ဖြစ်ပါတယ်။"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                Website{" "}
                {this.props.isZawgyi ? toZawgyi("အကြောင်း") : "အကြောင်း"}
              </Typography>
              <Typography variant="subtitle1">
                {this.props.isZawgyi ? toZawgyi("နာမည်ကို ") : "နာမည်ကို "}
                <em>
                  <strong>
                    MYANnime
                    {this.props.isZawgyi
                      ? toZawgyi("(မြန်နီမေး)")
                      : "(မြန်နီမေး)"}
                  </strong>
                </em>{" "}
                {this.props.isZawgyi
                  ? toZawgyi(
                      "ဆိုပြီးပေးလိုက်ခြင်းရဲ့ ရည်ရွယ်ချက်ကတော့ ရည်ရွယ်ချက် ဘာမှမရှိပါဘူး။ ဒီအတိုင်း Myanmar + Anime ကို remix လုပ်လိုက်ခြင်းပဲဖြစ်ပါတယ်။"
                    )
                  : "ဆိုပြီးပေးလိုက်ခြင်းရဲ့ ရည်ရွယ်ချက်ကတော့ ရည်ရွယ်ချက် ဘာမှမရှိပါဘူး။ ဒီအတိုင်း Myanmar + Anime ကို remix လုပ်လိုက်ခြင်းပဲဖြစ်ပါတယ်။"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {this.props.isZawgyi ? toZawgyi("အသိပေးချက်") : "အသိပေးချက်"}
              </Typography>
              <Typography variant="subtitle1">
                {this.props.isZawgyi
                  ? toZawgyi(
                      "ကျွန်တော်တို့ ကိုယ်တိုင် translate မလုပ်ထားတဲ့ video တွေအားလုံးကို သက်ဆိုင်သူတွေဆီမှ ခွင့်ပြုချက်တောင်းပြီးတင်ခြင်းဖြစ်ပါတယ်။"
                    )
                  : "ကျွန်တော်တို့ ကိုယ်တိုင် translate မလုပ်ထားတဲ့ video တွေအားလုံးကို သက်ဆိုင်သူတွေဆီမှ ခွင့်ပြုချက်တောင်းပြီးတင်ခြင်းဖြစ်ပါတယ်။"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {this.props.isZawgyi
                  ? toZawgyi("ယခုစာဖတ်နေသူဆီသို့ ")
                  : "ယခုစာဖတ်နေသူဆီသို့ "}
                Message
              </Typography>
              <Typography variant="subtitle1">
                {this.props.isZawgyi
                  ? toZawgyi(
                      "Website ကိုအသုံးပြုပေးတဲ့ အတွက် ကျေးဇူးအထူးတင်ရှိပါတယ်။ စာတွေကိုအဆုံးထိဖတ်ရှုပေးလို့လည်း ကျေးဇူးတင်ပါတယ်။"
                    )
                  : "Website ကိုအသုံးပြုပေးတဲ့ အတွက် ကျေးဇူးအထူးတင်ရှိပါတယ်။ စာတွေကိုအဆုံးထိဖတ်ရှုပေးလို့လည်း ကျေးဇူးတင်ပါတယ်။"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isZawgyi: state.mmfont.isZawgyi,
  };
};

export default connect(mapStateToProps)(About);
