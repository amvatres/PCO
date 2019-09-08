function agendaController($scope,$http,$location,$routeParams,$route,toastr){

    $scope.getConferenceInformation = function(){
      $http.get('/api/conference/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferenceInfo = response.data;

        var beginningDate=new Date($scope.conferenceInfo[0].date);

        $scope.newDate=new Date();
        $scope.newDate.setDate( beginningDate.getDate()+3);
      });
    }

    $scope.addAgenda = function(agenda){
      $http.post('/api/agenda', agenda, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $route.reload();
          toastr.success('You have successfully added agenda item!', 'Success');
      });
    }

    
    $scope.getFirstDay = function(){
      $http.get('/api/conference/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferenceInfo = response.data;
      }).then(function(response){
          $http.get('/api/agenda/'+ $scope.conferenceInfo[0].date, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $scope.day1 = response.data;
          });
      });
    }

    $scope.getSecondDay = function(){
      $http.get('/api/conference/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferenceInf = response.data;

        var beginningDate=new Date($scope.conferenceInf[0].date);

        $scope.secondDate=new Date();
        $scope.secondDate.setHours(0,0,0,0);

        $scope.secondDate.setDate( beginningDate.getDate()+1);

        var json = JSON.stringify($scope.secondDate);

        $scope.parsedSecondDate = JSON.parse(json);  

      }).then(function(response){
          $http.get('/api/agenda/'+  $scope.parsedSecondDate, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $scope.day2 = response.data;
          });
      });
    }


    $scope.getThirdDate = function(){
      $http.get('/api/conference/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.conferenceIn = response.data;

        var beginningDate=new Date($scope.conferenceIn[0].date);

        $scope.thirdDate=new Date();
        $scope.thirdDate.setHours(0,0,0,0);

        $scope.thirdDate.setDate( beginningDate.getDate()+2);

        var json = JSON.stringify($scope.thirdDate);

        $scope.parsedThirdDate = JSON.parse(json);  

      }).then(function(response){
          $http.get('/api/agenda/'+  $scope.parsedThirdDate, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $scope.day3 = response.data;
          });
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