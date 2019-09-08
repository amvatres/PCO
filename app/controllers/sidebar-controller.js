myApp.controller('sidebarCtrl', function($scope, $location, $http, toastr, $rootScope){

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }
    $scope.check_admin = function(){
        if(localStorage.getItem('admin')=='true'){
            return true;
        }
        return false;
    }
    $scope.check_url_registration = function(){
        var url = $location.url();
        if(url=="/registration"){
            return true;
        }
        return false;
    }

    $scope.check_url_login = function(){
        var url = $location.url();
        if(url=="/login"){
            return true;
        }
        return false;
    }
  
    $scope.getMessageCount = function(){
        $http.get('/api/messages/count', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $scope.messagesCount = response.data;
        });
    }

    $scope.register = function(user){
        $http.post('/api/users', user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
            $location.path('/dashboard');
            toastr.success('You have successfully registered!', 'Success');
        });
      }

      $scope.showProfileInformation = function(){
        var id = localStorage.getItem("id");
        $http.get('/api/users/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.user = response.data;
        });
      }

      $scope.showPasswordForm = function(){
        var form=document.getElementById("change-password-form")
        form.style.display="block";
        
        var button=document.getElementById("change-password");
        button.style.display="none";
    }

    $scope.editAccountInfo = function(){
        var id = localStorage.getItem("id");
        $http.put('/api/users/'+ id , $scope.user, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          toastr.success('You have successfully updated information!', 'Updated');
        });
      };

      $scope.changePassword = function(){
        var id = localStorage.getItem("id");
        if($scope.pass.password==$scope.pass.repassword) {
            $http.put('/api/users/password/'+ id , $scope.pass, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
                toastr.success('You have successfully updated information!', 'Updated');
              });
        }
        else{
            toastr.error('Passwords dont match!', 'Updated');
        }

       
      };

    $scope.login = function(credentials){
        $http.post('/api/authenticate', credentials).then(function(response){
            if (typeof response.data.token != 'undefined'){
                localStorage.setItem('user',response.data.token);
                localStorage.setItem('admin',response.data.admin);
                localStorage.setItem('id',response.data.id);
            
                toastr.success('You have successfully logged in!', 'Welcome');
            }else if(response.data.user == false){
                toastr.error('No User Found', 'Login Error');
            }else{
                toastr.warning('Wrong Password', 'Login Error');
            }
        }),function(error){
            console.log(error);
        }
    }

    $scope.logout = function(){
        localStorage.clear();
    }

    $scope.getClass = function (path) {
        if (path == '/dashboard' && $location.path() == '/') return 'active';
        return ($location.path() === path) ? 'active' : '';
    }

    $scope.openNavigationDrawer = function(){
        if ($scope.mobileNavigationOpen == 'nav-open'){
            $scope.mobileNavigationOpen = '';
        }else{
            $scope.mobileNavigationOpen = 'nav-open';
        }
        
    }
    $scope.menuItemClicked = function(){
        $scope.mobileNavigationOpen = '';
    }

});