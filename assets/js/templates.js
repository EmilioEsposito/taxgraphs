angular.module('taxApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/templates/pages/state-breakdown.html',
    "<div class=\"section\"><h3>Data</h3><div ng-include=\"'assets/templates/partials/state-select.html'\"></div><div ng-include=\"'assets/templates/partials/tax-year.html'\"></div><div ng-include=\"'assets/templates/partials/filing-status.html'\"></div><div ng-include=\"'assets/templates/partials/graph-lines.html'\" ng-init=\"graphLines = [\r" +
    "\n" +
    "    { id: 'effective-taxes', prop: 'effective', label: 'Effective Taxes' },\r" +
    "\n" +
    "    { id: 'marginal-taxes', prop: 'marginal', label: 'Marginal Taxes' },\r" +
    "\n" +
    "    { id: 'total-effective', prop: 'totalEffective', label: 'Total Effective Tax' },\r" +
    "\n" +
    "    { id: 'total-marginal', prop: 'totalMarginal', label: 'Total Marginal Tax' }\r" +
    "\n" +
    "    ]\"></div><h3>Adjustments</h3><div ng-include=\"'assets/templates/partials/deductions.html'\"></div><div class=\"subsection\" ng-include=\"'assets/templates/partials/graph-settings.html'\"></div></div>"
  );


  $templateCache.put('assets/templates/pages/state-comparison.html',
    "<div class=\"section\"><h3>Data</h3><div ng-include=\"'assets/templates/partials/state-checkboxes.html'\"></div><div ng-include=\"'assets/templates/partials/tax-year.html'\"></div><div ng-include=\"'assets/templates/partials/filing-status.html'\"></div><div ng-include=\"'assets/templates/partials/graph-lines.html'\" ng-init=\"graphLines = [\r" +
    "\n" +
    "    { id: 'effective-taxes', prop: 'effective', label: 'Total Effective Tax' },\r" +
    "\n" +
    "    { id: 'marginal-taxes', prop: 'marginal', label: 'Total Marginal Tax' }\r" +
    "\n" +
    "    ]\"></div><h3>Adjustments</h3><div ng-include=\"'assets/templates/partials/deductions.html'\"></div><div class=\"subsection\" ng-include=\"'assets/templates/partials/graph-settings.html'\"></div></div>"
  );


  $templateCache.put('assets/templates/pages/take-home-pay.html',
    "<div class=\"section\"><h3>Data</h3><div ng-include=\"'assets/templates/partials/state-select.html'\"></div><div ng-include=\"'assets/templates/partials/tax-year.html'\"></div><div ng-include=\"'assets/templates/partials/graph-lines.html'\" ng-init=\"graphLines = [\r" +
    "\n" +
    "    { id: 'single-income', prop: 'single', label: 'Single Filing Status' },\r" +
    "\n" +
    "    { id: 'married-income', prop: 'married', label: 'Married Filing Status' }\r" +
    "\n" +
    "    ]\"></div><h3>Adjustments</h3><div ng-include=\"'assets/templates/partials/deductions.html'\"></div><div><label for=\"itemized\" class=\"valign-top\">Itemized<br>Deduction:</label><input type=\"text\" id=\"itemized\" name=\"itemized\" ng-model=\"data.deductions.itemized\"></div><div class=\"subsection\" ng-include=\"'assets/templates/partials/graph-settings.html'\"></div></div>"
  );


  $templateCache.put('assets/templates/partials/deductions.html',
    "<div><label class=\"valign-top\">Deductions:</label><div class=\"inline-block\"><div ng-repeat=\"deduction in deductions\"><input type=\"checkbox\" name=\"{{ deduction }}\" id=\"{{ deduction }}\" ng-model=\"data.deductions.federal.federalIncome[deduction]\"><label for=\"{{ deduction }}\">{{ deduction | splitCamelCase }}</label></div></div></div>"
  );


  $templateCache.put('assets/templates/partials/filing-status.html',
    "<div><label for=\"status\">Filing Status:</label><select ng-model=\"data.status\" id=\"status\" name=\"status\" ng-options=\"v as (v | capitalize) for v in filingStatuses\"></select></div>"
  );


  $templateCache.put('assets/templates/partials/graph-lines.html',
    "<div><label class=\"valign-top\">Graph Lines:</label><div class=\"inline-block\"><div ng-repeat=\"graphLine in graphLines\"><input type=\"checkbox\" name=\"{{::graphLine.id}}\" id=\"{{::graphLine.id}}\" ng-model=\"data.graphLines[graphLine.prop]\"><label for=\"{{::graphLine.id}}\">{{::graphLine.label}}</label></div></div></div>"
  );


  $templateCache.put('assets/templates/partials/graph-settings.html',
    "<h3>Settings</h3><div><label for=\"x-max\">X Axis Max ($):</label><input type=\"text\" id=\"x-max\" name=\"x-max\" ng-model=\"settings.xMax\" required ng-pattern=\"/^\\d+$/\"></div><div><label for=\"animation-time\">Animation Time:</label><select id=\"animation-time\" name=\"animation-time\" ng-model=\"settings.animationTime\" ng-options=\"time as ((time / 1000) + (time === 1000 ? ' second' : ' seconds')) for time in animationTimes\"></select></div><div><label for=\"colors\">Color Scheme:</label><select id=\"colors\" name=\"colors\" ng-model=\"settings.colors\" ng-options=\"(key | capitalize) for (key, val) in colors\"></select></div><div class=\"text-center buttons\"><button class=\"pure-button pure-button-primary\" ng-click=\"drawGraph()\">Graph</button></div>"
  );


  $templateCache.put('assets/templates/partials/state-checkboxes.html',
    "<div><label class=\"valign-top\">States:</label><div class=\"inline-block\"><div class=\"state-options\"><input type=\"checkbox\" name=\"all-states\" id=\"all-states\" ng-click=\"toggleStates(true)\" ng-model=\"toggleState\" ng-change=\"keepUnchecked()\"><label for=\"all-states\">All</label><input type=\"checkbox\" name=\"no-states\" id=\"no-states\" ng-click=\"toggleStates(false)\" ng-model=\"toggleState\" ng-change=\"keepUnchecked()\"><label for=\"no-states\">None</label></div></div><div class=\"states pure-g\"><div class=\"pure-u-1-3 pure-u-xl-1-4\" ng-repeat=\"state in states\"><input type=\"checkbox\" id=\"{{ state }}\" name=\"{{ state }}\" ng-model=\"data.states[state]\"><label for=\"{{ state }}\">{{ state }}</label></div></div></div>"
  );


  $templateCache.put('assets/templates/partials/state-select.html',
    "<div><label for=\"state\">State:</label><select ng-model=\"data.state\" id=\"state\" name=\"state\" ng-options=\"v as (stateNames[v]) for v in states\"></select></div>"
  );


  $templateCache.put('assets/templates/partials/tax-year.html',
    "<div><label for=\"year\">Tax Year:</label><select ng-model=\"data.year\" id=\"year\" name=\"year\" ng-options=\"v as v for v in years\"></select></div>"
  );

}]);
