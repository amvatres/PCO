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

      new Chartist.Pie('.ct-chart', {
        series: [20, 10, 30, 40]
      }, {
        donut: true,
        donutWidth: 60,
        donutSolid: true,
        startAngle: 270,
        showLabel: true
      });
      
     
    
}