import React from "react";

import { Helmet } from "react-helmet";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/Card/Card";
import Radio from "../../components/Radio/Radio";
import Loader from "../../components/Loader/Loader";
import Pagnation from "../../components/Pagination/Pagination";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import * as actions from "../../store/actions/index";

function MyanNimeHome(props) {
  const dispatch = useDispatch();

  const isZawgyi = useSelector((state) => state.mmfont.isZawgyi);

  const { error, loading, animeData, sortMethod } = useSelector(
    (state) => state.home,
  );

  const { t } = useTranslation();

  const handlePaginate = useCallback(
    (page, sortBy) => {
      dispatch(actions.fetchAnimeData(page, sortBy));
    },
    [dispatch],
  );

  useEffect(() => {
    if (animeData) return;

    handlePaginate();
  }, [dispatch, animeData, handlePaginate]);

  let dynamicContent = null;
  let pagination = null;
  let sortingMethod = null;

  if (loading) {
    dynamicContent = <Loader />;
  }

  if (!loading && animeData) {
    dynamicContent = animeData.animes.map((anime) => {
      return (
        <Grid
          item
          container
          justify="center"
          key={anime.anime_id}
          xs={6}
          sm={4}
          md={3}
          lg={2}
        >
          <Card {...anime} isZawgyi={isZawgyi} />
        </Grid>
      );
    });

    pagination = (
      <Grid item container justify={"center"}>
        <Pagnation
          totalPages={animeData.total_pages}
          currentPage={animeData.current_page}
          handlePaginate={handlePaginate}
          sortMethod={sortMethod}
        />
      </Grid>
    );

    sortingMethod = (
      <Grid style={{ marginTop: "2%" }} item container justify="center">
        <Radio
          currentPage={animeData.current_page}
          handlePaginate={handlePaginate}
          sortMethod={sortMethod}
        />
      </Grid>
    );
  }

  if (error) {
    dynamicContent = <ErrorMessage isZawgyi={isZawgyi} />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("home.pageTitle")} | MYAN-nime</title>
      </Helmet>
      <Grid item container xs={12} sm={10} style={{ maxWidth: "1500px" }}>
        <Grid container spacing={1} justify="flex-start" style={{ margin: 0 }}>
          {dynamicContent}
        </Grid>
        {sortingMethod}
        {pagination}
      </Grid>
    </div>
  );
}

export default MyanNimeHome;
