
var app = angular.module('starter');


app.factory('authService', ['$http', '$q', '$rootScope', 'localStorageService', function ($http, $q, $rootScope, localStorageService) {

  var serviceBase = 'http://88.150.164.30/NewTrademark/';
//var serviceBase = 'http://localhost:24322/';

   var serviceBaseCld ="http://45.40.139.163/EinaoTestEnvironment.CLD" ;


    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

   
  

   var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        var AgentsData = {

            "username": loginData.userName,
            "password": loginData.password


        };

        $http.post(serviceBase + 'api/account/GetLoginToken2', AgentsData, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

           
               if (response == null) {

                swal("", "Invalid Username / Password", "error")
                return;
            }
           
            var kp = response.Token;
            if (kp.error_description != undefined) {
                swal("", kp.error_description, "error")
                return;
                
            }
            

          
            //  $rootScope.token = response.access_token;
            // localStorageService.set("access_token", response.access_token);
            $rootScope.username = response.Email;

             var dsap = response.Sys_ID;

localStorageService.set("user", response);
            localStorageService.set("access_token", kp.access_token);


           

            localStorageService.set("access_tokenexpire", kp.expires);

            localStorageService.set("username", response.Email);

            $rootScope.login = true;


 


            $rootScope.username = response.Email;

            $rootScope.islogin = true;

            $rootScope.islogout = false;
            $rootScope.login = true;



            $rootScope.username = response.Email;

            $rootScope.islogin = true;

            $rootScope.islogout = false;

         

            _authentication.isAuth = true;
            _authentication.userName = response.Email;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };

 var _getAgentemail = function (registration) {
        var dd = "";
        var data = {
            property1: registration
        };
        return $http.get(serviceBase + 'api/account/getEmails', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .success(function (response) {
            return response;
        })
        .error(function (response) {
            return response
        });


        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

    };

 var _GetFee = function () {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();


        $http.get(serviceBase + 'api/account/GetFee', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };

 var _GetFee2 = function () {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();


        $http.get(serviceBase + 'api/account/GetFee2', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };

     var _GetFee3 = function () {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();


        $http.get(serviceBase + 'api/account/GetFee3', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {



            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
      
        return deferred.promise;

    };



  var _GetCountry = function () {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();


        $http.get(serviceBase + 'api/account/getCountry', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {



            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
      
        return deferred.promise;

    };

    var _GetClass = function () {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();


        $http.get(serviceBase + 'api/account/getClass', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {



            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
      
        return deferred.promise;

    };



    var _getEmailCount = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getEmailCount', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };


      var _getAgentRoles = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getAgentRoles', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };


     var _getTrademarkStatus = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getApplicationStatus', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };

     var _getPaymentReport = function (dd, dd2) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd,
            property2: dd2
        };


        $http.get(serviceBase + 'api/account/getPaymentReport', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {



            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });

        return deferred.promise;

    };


      var _getTrademarkStatus2 = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getApplicationStatus2', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };


 var _getPatentStatus = function (dd) {
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getApplicationStatus3', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
       

        return deferred.promise;

    };

 var _getState = function (dd) {
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getState', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
       

        return deferred.promise;

    };




var _getDesignStatus = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/getApplicationStatus4', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };


     var _getBasket2 = function (dd,dd2) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd ,
             property2: dd2
        };


        $http.get(serviceBase + 'api/account/getBasketDetail', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {



            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
       
        return deferred.promise;

    };


        var _PostAll = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();
       
   $http.post(serviceBaseCld + '/Handlers/Save_GenericApplication7.ashx', dd, { headers: { 'Content-Type': undefined } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });
       


       
        return deferred.promise;

    };


 var _getPaymentStatus = function (dd,dd2) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd ,
             property2: dd2
        };


        $http.get(serviceBase + 'api/account/getPaymentStatus', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };

     var _getSendMail = function (dd,dd2,dd3,dd4,dd5) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd ,
             property2: dd2,
             property3: dd3,
             property4: dd4,
             property5: dd5
        };


        $http.get(serviceBase + 'api/account/SendEmail', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };




     var _Basket = function (dd) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd
        };


        $http.get(serviceBase + 'api/account/ViewBasket', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });


            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });
        //return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        //    return response;
        //});

        return deferred.promise;

    };




            //  alert("tony response ="+response);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
 var _checkout= function (applicant,shoppingcart,agent) {

      

        var deferred = $q.defer();
        var AgentsData = {


            bb: applicant,
            cc: shoppingcart,
            dd: agent

        };
       
        

        $http.post(serviceBase + 'api/account/AddFeeList',AgentsData, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            //  alert(response.access_token);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            //  alert(response.access_token);

            



          

            deferred.resolve(response);

        }).error(function (err, status) {
           // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };

    var _PaymentDetail = function (applicant, shoppingcart, agent, twallet, InterSwitchPostFields) {



        var deferred = $q.defer();
        var AgentsData = {


            bb: applicant,
            cc: shoppingcart,
            dd: agent,
            ee: twallet,
            ff: InterSwitchPostFields

        };



        $http.post(serviceBase + 'api/account/PaymentDetail', AgentsData, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };


      var _UpdateRegistration = function (pp7) {


 var deferred = $q.defer();
       


        $http.post(serviceBase + 'api/account/UpdateRegistration', pp7, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            //  alert(response.access_token);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            //  alert(response.access_token);







            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };


 var _getEmails = function (pp7) {


 var deferred = $q.defer();
       
 var data = {
            property1: pp7
        };


        $http.get(serviceBase + 'api/account/getEmails', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };


    var _getPwalletCount = function (pp7) {


 var deferred = $q.defer();
       
 var data = {
            property1: pp7
        };


        $http.get(serviceBase + 'api/account/PwalletCount', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };


     var _getAknowlegment = function (pp7) {


 var deferred = $q.defer();
       
 var data = {
            property1: pp7
        };


        $http.get(serviceBase + 'api/account/getAknowlegment', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };


    
 var _getEmails2 = function (pp7) {


 var deferred = $q.defer();
       
 var data = {
            property1: pp7
        };


        $http.get(serviceBase + 'api/account/getEmails2', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };

 var _ProceedToPayment = function (applicant, shoppingcart, agent, twallet) {



        var deferred = $q.defer();
        var AgentsData = {


            bb: applicant,
            cc: shoppingcart,
            dd: agent,
            ee:twallet

        };



        $http.post(serviceBase + 'api/account/ProceedToPayment2', AgentsData, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            //  alert(response.access_token);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            //  alert(response.access_token);







            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };

      var _getPaymentReport2 = function (dd, dd2) {
        // var serviceBase2 = "http://localhost:24322/";
        var deferred = $q.defer();

        var data = {
            property1: dd,
            property2: dd2
        };


        $http.get(serviceBase + 'api/account/getPaymentReport2', { params: data }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {



            deferred.resolve(response);

        }).error(function (err, status) {

            deferred.reject(err);
        });

        return deferred.promise;

    };

 var _formx = function (applicant, shoppingcart, agent, twallet, InterSwitchPostFields) {



        var deferred = $q.defer();
        var AgentsData = {


            bb: applicant,
            cc: shoppingcart,
            dd: agent,
            ee: twallet,
            ff: InterSwitchPostFields

        };

//

        $http.post(serviceBase + 'api/account/formx2', AgentsData, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            //  alert(response.access_token);
            //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            //  alert(response.access_token);







            deferred.resolve(response);

        }).error(function (err, status) {
            // _logOut();
            deferred.reject(err);
        });




        return deferred.promise;

    };



   

     var _PostPayment = function () {



        var deferred = $q.defer();
       
        var aa = $("#form1").submit();
        deferred.resolve(aa);

    

        alert("submited")

      


        return deferred.promise;

    };
     authServiceFactory.formx = _formx;
  authServiceFactory.ProceedToPayment =_ProceedToPayment;
 authServiceFactory.login = _login;
 authServiceFactory.GetFee = _GetFee;
 authServiceFactory.GetFee2 = _GetFee2;
 authServiceFactory.GetFee3 = _GetFee3;
authServiceFactory.checkout = _checkout ;
 authServiceFactory.PaymentDetail = _PaymentDetail;
  authServiceFactory.PostPayment = _PostPayment ;

 authServiceFactory.UpdateRegistration =  _UpdateRegistration ;

 authServiceFactory.getEmailCount = _getEmailCount ;

 authServiceFactory.getEmails =_getEmails ;

  authServiceFactory.getEmails2 =_getEmails2 ;

 authServiceFactory.Basket =_Basket ;
 authServiceFactory.getBasket2 =_getBasket2 ;

authServiceFactory.getTrademarkStatus = _getTrademarkStatus;

authServiceFactory.getTrademarkStatus2 = _getTrademarkStatus2;
     authServiceFactory.getPatentStatus =_getPatentStatus ;

    authServiceFactory.getDesignStatus = _getDesignStatus ;
        authServiceFactory.getPaymentStatus =_getPaymentStatus

       authServiceFactory.getSendMail =  _getSendMail ;

      authServiceFactory.getAgentRoles = _getAgentRoles

     authServiceFactory.GetCountry =  _GetCountry

    authServiceFactory.GetClass =  _GetClass

      authServiceFactory.getAgentemail = _getAgentemail;
   
  authServiceFactory.getState =  _getState

  authServiceFactory.PostAll = _PostAll

 authServiceFactory.getPwalletCount = _getPwalletCount

 authServiceFactory.getAknowlegment =_getAknowlegment

  authServiceFactory.getPaymentReport = _getPaymentReport

    authServiceFactory.getPaymentReport2 = _getPaymentReport2

    return authServiceFactory;
}]);

