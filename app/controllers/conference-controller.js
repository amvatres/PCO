function conferenceController($scope,$http,$location,$routeParams,$route,toastr){
    
  $scope.addConferenceInformation = function(conference){
        $http.post('/api/conference', conference, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $route.reload();
            toastr.success('You have successfully added conference information!', 'Success');
        });
      }

    $scope.getConferenceInformation = function(){
      $http.get('/api/conference/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferenceInfo = response.data;
      });
    }

    $scope.getConferenceCount = function(){
      $http.get('/api/conference/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferencecount = response.data;
      });
    }
     
    $scope.showConferenceInformation = function(){
      var id = $routeParams.id;
      $http.get('/api/conference/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conference = response.data;
      });
    }

    $scope.deleteConference = function(id){
      if(localStorage.getItem('admin') == 'true'){
      var id = id;
      $http.delete('/api/conference/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $route.reload();
        toastr.success('You have successfully removed conference information!', 'Success');
      })}else{
        toastr.error('You do not have permission to delete!', 'PERMISSION');
      }
    }

    $scope.editConferenceInformation = function(){
      var id = $routeParams.id;
      $http.put('/api/conference/'+ id , $scope.conference, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $route.reload();
        toastr.success('You have successfully updated conference information!', 'Updated');
      });
    };
}