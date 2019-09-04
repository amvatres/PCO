function adminsController($scope,$http,$location,$routeParams,$route,toastr){
    
  $scope.getAdmins = function(){
    $http.get('/api/admins/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $scope.admins = response.data;
    });
  }
  $scope.getSysUsers = function(){
    $http.get('/api/users/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $scope.users = response.data;
    });
  }   
}