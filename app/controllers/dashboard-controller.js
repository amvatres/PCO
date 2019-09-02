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
    
    $scope.addSpeaker = function(speaker){
        $http.post('/api/speakers', speaker, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $route.reload();
            toastr.success('You have successfully added new speaker on the list!', 'Success');
        });
      }


    $scope.getSpeakers = function(){
      $http.get('/api/speakers/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.speakers = response.data;
      });
    }

    $scope.showSpeaker = function(){
      var id = $routeParams.id;
      $http.get('/api/speakers/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.speaker = response.data;
      });
    }

    $scope.deleteSpeaker = function(id){
      if(localStorage.getItem('admin') == 'true'){
      var id = id;
      $http.delete('/api/speakers/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $route.reload();
        toastr.success('You have successfully removed selected speaker!', 'Success');
      })}else{
        toastr.error('You do not have permission to delete!', 'PERMISSION');
      }
    }

    $scope.editSpeaker = function(){
      var id = $routeParams.id;
      $http.put('/api/speakers/'+ id , $scope.speaker, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $route.reload();
        toastr.success('You have successfully updated speaker information!', 'Updated');
      });
    };
}