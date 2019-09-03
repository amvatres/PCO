function messagesController($scope,$http,$location,$routeParams,$route,toastr){

    $scope.getMessages = function(){
      $http.get('/api/messages/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.messages = response.data;
      });
    }

    $scope.showMessage = function(){
      var id = $routeParams.id;
      $http.get('/api/messages/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.message = response.data;
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

   
}