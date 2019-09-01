registrationApp.controller('registrationController', function($scope, $location, $http, toastr, $window){
    
    $scope.addUser = function(user){
        $http.post('/api/users', user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $window.location.href = '/login.html';
          toastr.success('You have successfully registered!', 'Success');
        });
      }

      
});