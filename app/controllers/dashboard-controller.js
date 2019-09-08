function dashboardController($scope,$http,$location,$routeParams,$route,toastr){

 
    $scope.getVisitorsStandard = function(){
        $http.get('/api/tickets/standard', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.visitorsStandard = response.data;
        });
      }

      $scope.getVisitorsStandardCount = function(){
        $http.get('/api/tickets/standard/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.vscount = response.data;
        });
      }
   
      $scope.getVisitorsPro = function(){
        $http.get('/api/tickets/pro', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.visitorsPro = response.data;
        });
      }

      $scope.getVisitorsProCount = function(){
        $http.get('/api/tickets/pro/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.procount = response.data;
        });
      }

      $scope.getVisitorsPremium = function(){
        $http.get('/api/tickets/premium', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.visitorsPremium = response.data;
        });
      }

      $scope.getVisitorsPremiumCount = function(){
        $http.get('/api/tickets/premium/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.premiumcount = response.data;
        });
      }

      function getCharts(){
        $scope.getVisitorsStandardCount = function(){
          $http.get('/api/tickets/standard/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $scope.vscount = response.data;
          }).then(function(response){
            $http.get('/api/tickets/pro/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
              $scope.procount = response.data;
            }).then (function(response){
              $http.get('/api/tickets/premium/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
                $scope.premiumcount = response.data;
                  
                new Chartist.Pie('#piechart', {
                    series: [$scope.vscount, $scope.premiumcount,$scope.procount]
                  }, {
                    donut: true,
                    donutWidth: 60,
                    donutSolid: true,
                    startAngle: 270,
                    showLabel: true
                  });

                  var data = {
                    labels: ['Total'],
                    series: [
                      [$scope.vscount],
                      [$scope.premiumcount],
                      [$scope.procount]
                    ]
                  };
                  
                  var options = {
                    seriesBarDistance: 10
                  };
                  
                  var responsiveOptions = [
                    ['screen and (max-width: 640px)', {
                      seriesBarDistance: 5,
                      axisX: {
                        labelInterpolationFnc: function (value) {
                          return value[1];
                        }
                      }
                    }]
                  ];
                  
                  new Chartist.Bar('#columnchart', data, options, responsiveOptions);



                  new Chartist.Bar('#stackedchart', {
                    labels: ['TOTAL'],
                    series: [
                      [$scope.vscount],
                      [$scope.premiumcount],
                      [$scope.procount]
                    ]
                  }, {
                    stackBars: true,
                    axisY: {
                      labelInterpolationFnc: function(value) {
                        return (value ) ;
                      }
                    }
                  }).on('draw', function(data) {
                    if(data.type === 'bar') {
                      data.element.attr({
                        style: 'stroke-width: 30px'
                      });
                    }
                  });
                  
                  var chart = new Chartist.Bar('#peakcircles', {
                    labels: ['TOTAL'],
                    series: [
                      [$scope.vscount, $scope.premiumcount, $scope.procount]
                    ]
                  }, {
                    high: 10,
                    low: 0,
                    axisX: {
                      labelInterpolationFnc: function(value, index) {
                        return index % 2 === 0 ? value : null;
                      }
                    }
                  });
                  
                  // Listen for draw events on the bar chart
                  chart.on('draw', function(data) {
                    // If this draw event is of type bar we can use the data to create additional content
                    if(data.type === 'bar') {
                      // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
                      data.group.append(new Chartist.Svg('circle', {
                        cx: data.x2,
                        cy: data.y2,
                        r: Math.abs(Chartist.getMultiValue(data.value)) * 2 + 5
                      }, 'ct-slice-pie'));
                    }
                  });
              });
            });
          });
        }
      }

      getCharts();

      $scope.notify = function (email) {
        to=email;
        text="Thank you for sharing our vision of Conference Organizing. Your ticket it ready. This is just a reminder of conference. Don't forget to take ticket at least 1 hour before conference. We will be waiting for you.";
       
        var dataToPost = {to,text}; 
        $http({
            url: "/send", 
            method: "GET",
            params: {to: dataToPost.to, subject: " Conference Organizer - notification", text: dataToPost.text }}, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(serverResponse) {
                toastr.success('Your notification was successfully sent!', 'Success');
            })
        };

}