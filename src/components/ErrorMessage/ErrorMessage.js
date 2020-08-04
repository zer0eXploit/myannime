import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import toZg from "../../util/convertToZg";

export default function ErrorDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.isZawgyi
            ? toZg("တစ်ခုခုမှားယွင်းသွားပါသည်။")
            : "တစ်ခုခုမှားယွင်းသွားပါသည်။"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.isZawgyi
              ? toZg(
                  "တောင်းပန်ပါသည်။ တစ်ခုခုမှား ယွင်းပါသွားပါသည်။ Page ကို refresh လုပ်ကြည့်ဖို့ အကြံပြုလိုပါသည်။ အဆင်မပြေမှုအတွက် သည်းခံပေးပါ။"
                )
              : "တောင်းပန်ပါသည်။ တစ်ခုခုမှား ယွင်းပါသွားပါသည်။ Page ကို refresh လုပ်ကြည့်ဖို့ အကြံပြုလိုပါသည်။ အဆင်မပြေမှုအတွက် သည်းခံပေးပါ။"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ကောင်းပြီ။
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
