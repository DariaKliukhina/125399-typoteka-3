"use strict";

const express = require(`express`);
const {HttpCode} = require(`../../constants`);

const searchRouter = new express.Router();

module.exports = (apiRouter, service) => {
  apiRouter.use(`/search`, searchRouter);

  searchRouter.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = service.findAll(query);

    const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus)
      .json(searchResults);
  });
};
