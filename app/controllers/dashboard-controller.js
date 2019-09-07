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

      
      function getvscount (){
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


      $scope.sendNotification = function () {

        to=$("#to").val();
        text="This e-mail is to remind you of upcoming conference. Thank you for buying ticket. We expect to see you and hope you will have great time.";
       
        var dataToPost = {to, text}; 
        $http({
            url: "/notify", 
            method: "GET",
            params: {to: dataToPost.to, subject: "Professional Conference Organizer - reminder", text: "Thank you for contacting us. PCO is always there for you. Here is the answer to your question. " + dataToPost.text }}, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(serverResponse) {
              console.log(serverResponse);
                toastr.success('Your reminder was successfully sent!', 'Success');
              })
            };
        

      function getCharts(){
       var vscount= getvscount();
      console.log(vscount);
        new Chartist.Pie('#ticketStats', {
          series: [5, 4,3]
        }, {
          donut: true,
          donutWidth: 60,
          donutSolid: true,
          startAngle: 270,
          showLabel: true
        });
      }

      getCharts();

     
      
     
    
}