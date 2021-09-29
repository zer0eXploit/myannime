const themer = (theme) => {
  return {
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightRegular,
    },
    margin: {
      margin: "5px",
    },
    genres: { display: "flex", justifyContent: "center", width: "100%" },
    genresContainer: {
      maxWidth: "1000px",
      display: "flex",
      justifyContent: "center",
    },
    accordion: { borderRadius: "0 !important" },
  };
};

export default themer;
