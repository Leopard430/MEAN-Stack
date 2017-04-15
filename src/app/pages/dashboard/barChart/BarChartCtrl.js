/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('BarChartCtrl', BarChartCtrl);

  /** @ngInject */
  function BarChartCtrl($scope, $http, baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');

    var vDataProvider;
    debugger;
    $http.get('/api/getcountryinfo')
    .success(function(data) {
      vDataProvider = data;
      debugger;
      console.log('vDataProvider = ' + data);

      for (var item in vDataProvider) {
        //item.color = layoutColors.primary;
        console.log('item = ' + vDataProvider[item]);
        vDataProvider[item].color = layoutColors.primary;
      }



      var barChart = AmCharts.makeChart(id, {
        type: 'serial',
        theme: 'blur',
        color: layoutColors.defaultText,
        dataProvider: vDataProvider,
        valueAxes: [
          {
            axisAlpha: 0,
            position: 'left',
            title: 'Visitors from country',
            gridAlpha: 0.5,
            gridColor: layoutColors.border,
          }
        ],
        startDuration: 1,
        graphs: [
          {
            balloonText: '<b>[[category]]: [[value]]</b>',
            fillColorsField: 'color',
            fillAlphas: 0.7,
            lineAlpha: 0.2,
            type: 'column',
            valueField: 'visits'
          }
        ],
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'country',
        categoryAxis: {
          gridPosition: 'start',
          labelRotation: 45,
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        },
        export: {
          enabled: true
        },
        creditsPosition: 'top-right',
        pathToImages: layoutPaths.images.amChart
      });

      console.log('vDataProvider = ' + data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }
})();
