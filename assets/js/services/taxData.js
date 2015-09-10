'use strict';

/* @ngInject */
function taxData($http, $q, $filter, TAX_API) {
  var service = {},
      splitCamelCase = $filter('splitCamelCase');

  service.states = [];
  service.filingStatuses = [];
  service.deductions = [];
  service.years = [];
  service.taxTypes = ['effective', 'marginal'];
  service.year = '2015';

  service.stateNames = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'Washington, D.C.',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
  };

  service.get = function() {
    var deferred = $q.defer();

    if (!service.data) {
      service.fetch(TAX_API, deferred);
    } else {
      deferred.resolve(service.data[service.year]);
    }

    return deferred.promise;
  };

  service.fetch = function(url, deferred) {
    $http.get(url).then(function(resp) {
      service.data = resp.data;
      service.fillMetadata(service.data);
      deferred.resolve(service.data[service.year]);
    });
  };

  service.fillMetadata = function(data) {
    for (var year in data) {
      service.years.push(year);
    }

    data = data[service.year];

    for (var state in data.state) {
      service.states.push(state);
    }

    for (var filingStatus in data.federal.taxes.federalIncome.rate) {
      service.filingStatuses.push(filingStatus);
    }

    for (var deduction in data.federal.deductions) {
      service.deductions.push(deduction);
    }
  };

  service.getTaxes = function(state, year) {
    var taxes = [],
        data;

    year = year || service.year;
    data = service.data[year];

    for (var tax in data.federal.taxes) {
      taxes.push(data.federal.taxes[tax].rate);
    }

    for (tax in data.state[state].taxes) {
      if (data.state[state].taxes.hasOwnProperty(tax)) {
        taxes.push(data.state[state].taxes[tax].rate);
      }
    }

    return taxes;
  };

  service.getTaxNames = function(state, year) {
    var taxes = [],
        data;

    year = year || service.year;
    data = service.data[year];

    for (var tax in data.federal.taxes) {
      taxes.push(splitCamelCase(tax));
    }

    for (tax in data.state[state].taxes) {
      if (data.state[state].taxes.hasOwnProperty(tax)) {
        taxes.push(state + ' ' + splitCamelCase(tax));
      }
    }

    return taxes;
  };

  service.getDeduction = function(deduction) {
    return service.data[service.year].federal.deductions[deduction].amount;
  };

  return service;
}

module.exports = taxData;