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

    $scope.sendMessage=function(){
      var to=$("#to").val();
      var text=$("#content").val();

      $http.get('/api/send/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){ });
      };

}