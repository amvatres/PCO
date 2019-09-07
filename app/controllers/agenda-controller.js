function agendaController($scope,$http,$location,$routeParams,$route,toastr){

    $scope.getConferenceInformation = function(){
      $http.get('/api/conference/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferenceInfo = response.data;
      });
    }

    $scope.addAgenda = function(agenda){
      $http.post('/api/agenda', agenda, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $route.reload();
          toastr.success('You have successfully added agenda item!', 'Success');
      });
    }

    
    $scope.getAgenda = function(){
      $http.get('/api/agenda/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.agenda = response.data;
      });
    }

    $scope.getDay1 = function(date){
      console.log(date);
      $http.get('/api/agenda/day1', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.day1 = response.data;
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