var fs = require('fs');
var http = require('http');

var Stockfetch = function() {
  this.http = http;
  this.prices = {};
  this.errors = {};
  this.tickersCount = 0;

  this.readTickersFile = function(filename, onError) {
    var self = this;

    fs.readFile(filename, function(err, data) {
      if (err) {
        return onError('Error reading file: ' + filename);
      }

      var tickers = self.parseTickers(data.toString());

      if (tickers.length === 0) {
        return onError('File ' + filename + ' has invalid content');
      }

      self.processTickers(tickers);
    });
  };

  this.parseTickers = function(content) {
    var isInRightFormat = function(str) {
      return str.trim().length != 0 && str.indexOf(' ') < 0;
    };

    return content.split('\n').filter(isInRightFormat);
  };

  this.processTickers = function(tickers) {
    var self = this;
    self.tickersCount = tickers.length;

    tickers.forEach(function(ticker) { self.getPrice(ticker); });
  };

  this.getPrice = function(symbol) {
    var url = 'http://ichart.finance.yahoo.com/table.csv?s=' + symbol;
    http.get(url, this.processResponse.bind(this, symbol))
        .on('error', this.processHttpError.bind(this, symbol));
  };

  this.processResponse = function(symbol, response) {
    var self = this;

    if (response.statusCode === 200) {
      var data = '';
      response.on('data', function(chunk) { data += chunk; });
      response.on('end', function() { self.parsePrice(symbol, data); });
    } else {
      self.processError(symbol, response.statusCode);
    }
  };

  this.processHttpError = function(symbol, err) {
    if (err) {
      this.processError(symbol, err.code);
    }
  };

  this.processError = function(symbol, err) {
    this.errors[symbol] = err;
    this.printReport();
  };

  this.parsePrice = function(symbol, data) {
    var price = data.split('\n')[1].split(',').pop();
    this.prices[symbol] = price;
    this.printReport();
  };

  this.printReport = function() {
    if (Object.keys(this.prices).length
        + Object.keys(this.errors).length === this.tickersCount) {
      this.reportCallback(this.sortData(this.prices),
                          this.sortData(this.errors));
    }
  };

  this.sortData = function(data) {
    var toArray = function(key) { return [key, data[key]]; };
    return Object.keys(data).sort().map(toArray);
  };

  this.reportCallback = function() {};

  this.getPriceForTickers = function(fileName, displayFn, errorFn) {
    this.reportCallback = displayFn;
    this.readTickersFile(fileName, errorFn);
  };
};

module.exports = Stockfetch;
