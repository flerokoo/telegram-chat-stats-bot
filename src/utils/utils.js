const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");
const { config } = require("../config");
const isProduction = () => process.env.NODE_ENV === "production";

/** @returns {dayjs.Dayjs} */
const getNow = () => dayjs().utc().tz(config.timezone);

const toTimestamp = d => d.format("YYYY-MM-DD HH:mm");

const loadAll = rootPath => {
  return fs
    .readdirSync(rootPath)
    .filter(file => file.endsWith(".js"))
    .map(file => {
      require(path.join(rootPath, file));
      return file;
    });
};

const loadAllRecursive = (rootPath, predicate) => {
  predicate ??= () => true;
  return fs
    .readdirSync(rootPath, { recursive: true })
    .filter(predicate)
    .map(file => {
      require(path.join(rootPath, file));
      return file;
    });
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const safe = async fn => {
  try {
    return await fn();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  safe,
  toTimestamp,
  getNow,
  isProduction,
  loadAll,
  loadAllRecursive,
  delay
};
