function sponsorsController($scope,$http,$location,$routeParams,$route,toastr){

    $scope.getSponsorshipRequests = function(){
      $http.get('/api/sponsors/notaccepted', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
        $scope.sponsors = response.data;
      });
    }

    $scope.getRequestsCount = function(){
        $http.get('/api/sponsors/notaccepted/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.requestCount = response.data;
        });
      }

    $scope.deleteRequest = function(id){
        if(localStorage.getItem('admin') == 'true'){
        var id = id;
        $http.delete('/api/sponsors/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $route.reload();
            toastr.success('You have declined sponsorship request!', 'Success');

                to=$("#to").val();
                text="Sponsorship declined.";
               
                var dataToPost = {to, text}; 
                $http({
                    url: "/decline", 
                    method: "GET",
                    params: {to: dataToPost.to, subject: " Conference Organizer - sponsorhip declined", text: "Thank you for contacting us. PCO is always there for you. Here is the answer to your question. " + dataToPost.text }}, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(serverResponse) {
                        toastr.success('Client was successfully notified!', 'Success');
                      })
                   
        })}else{
            toastr.error('You do not have permission to decline!', 'PERMISSION');
        }
    }

    $scope.acceptSponsor = function(id){
        $http.put('/api/sponsors/accepted/'+ id , $scope.speaker, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $route.reload();
          toastr.success('You have accepted sponsorship request!', 'Updated');

            to=$("#to").val();
            text="Sponsorship accepted.";
            
            var dataToPost = {to, text}; 
            $http({
                url: "/accept", 
                method: "GET",
                params: {to: dataToPost.to, subject: " Conference Organizer - sponsorhip declined", text: "Thank you for contacting us. PCO is always there for you. Here is the answer to your question. " + dataToPost.text }}, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(serverResponse) {
                    toastr.success('Your answer was successfully sent!', 'Success');
                    })
        });
      };

      $scope.getSponsors = function(){
        $http.get('/api/sponsors', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.sponsors = response.data;
        });
      }

}