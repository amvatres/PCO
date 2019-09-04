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

    function deleteMessage(){
        if(localStorage.getItem('admin') == 'true'){
          var id = $routeParams.id;
          $http.delete('/api/messages/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $location.path('/messages');
          })
      }
    }

    $scope.sendMessage = function () {
      to=$("#to").val();
      text=$("#content").val();
     
      var dataToPost = {to, text}; 
      $http({
          url: "/send", 
          method: "GET",
          params: {to: dataToPost.to, subject: "Professional Conference Organizer - answer", text: "Thank you for contacting us. PCO is always there for you. Here is the answer to your question. " + dataToPost.text }}, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(serverResponse) {
            console.log(serverResponse);
              toastr.success('Your answer was successfully sent!', 'Success');
               deleteMessage();
            })
          };
      
  };