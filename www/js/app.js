// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app =angular.module('starter', ['ionic','ui.router','ngCordova','ksSwiper','LocalStorageModule','angular-loading-bar','smart-table','ngModal','ngMessages','720kb.datepicker','angular-momentjs','ngSanitize' ,'ui.bootstrap','ngAnimate','vAccordion','app2']) ;

app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

  // note that you can also chain configs
  
});
  app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);

   

  


  
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

app.factory("$fileFactory", function($q) {

    var File = function() { };

    File.prototype = {

        getParentDirectory: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                fileSystem.getParent(function(result) {
                    deferred.resolve(result);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        getEntriesAtRoot: function() {
            var deferred = $q.defer();
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                var directoryReader = fileSystem.root.createReader();
                directoryReader.readEntries(function(entries) {
                  
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },

        getEntries: function(path) {
            var deferred = $q.defer();
            window.resolveLocalFileSystemURI(path, function(fileSystem) {
                var directoryReader = fileSystem.createReader();
                directoryReader.readEntries(function(entries) {
                    deferred.resolve(entries);
                }, function(error) {
                    deferred.reject(error);
                });
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    };

    return File;

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}) ;

app.directive('ionicstringtohtml', ['$compile', function($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.inputstring);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
    };
  }])
app.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: [ "$scope", function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
 app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "partial/menu.html",
      controller: 'AppCtrl'
    })
            .state('app.Home', {
                url: '/',
                 cache: false,
                 views: {
        'menuContent' :{
          templateUrl: "partial/Index2.html",
          controller: 'Home3Controller'
        }
      }
              
            })
             .state('app.login', {
                        url: '/login',
                       
                        cache: false,
                          views: {
        'menuContent' :{
          templateUrl: "partial/Login.html",
          controller: 'ContactController'
        }
      }
                       
                    })
          .state('app.logout', {
                         url: '/logout',
                        
                         cache: false,
                          views: {
        'menuContent' :{
          templateUrl: "partial/Index2.html",
          controller: 'logoutController'
        }
      }
                        
                     })

                     .state('app.SelectedItem', {
                           url: '/SelectedItem',
                                           views: {
        'menuContent' :{
          templateUrl: "partial/SelectedItem.html",
          controller: 'SelectedItemController'
        }
      }
                          
                       })

                        .state('app.GetEmails', {
                           url: '/GetEmails',
                            views: {
        'menuContent' :{
          templateUrl: "partial/GetEmails.html",
          controller: 'GetEmailsController'
        }
      }
                         
                       })


                         .state('app.CheckStatus', {
                           url: '/CheckStatus',
                            views: {
        'menuContent' :{
          templateUrl: "partial/CheckStatus.html",
          controller: 'CheckStatusController'
        }
      }
                         
                       })

                          

                          .state('app.PatentStatus', {
                           url: '/PatentStatus',
                            views: {
        'menuContent' :{
          templateUrl: "partial/PatentStatus.html",
          controller: 'PatentStatusController'
        }
      }
                         
                       })

                        .state('app.DesignStatus', {
                           url: '/DesignStatus',
                            views: {
        'menuContent' :{
          templateUrl: "partial/DesignStatus.html",
          controller: 'DesignStatusController'
        }
      }
                         
                       })

                        .state('app.TrademarkPaymentReport', {
                           url: '/TrademarkPaymentReport',
                            views: {
        'menuContent' :{
          templateUrl: "partial/TrademarkPaymentReport.html",
          controller: 'TrademarkPaymentReportController'
        }
      }
                         
                       })

                        .state('app.PatentPaymentReport', {
                           url: '/PatentPaymentReport',
                            views: {
        'menuContent' :{
          templateUrl: "partial/PatentPaymentReport.html",
          controller: 'PatentPaymentReportController'
        }
      }
                         
                       })


                       .state('app.DesignPaymentReport', {
                           url: '/DesignPaymentReport',
                            views: {
        'menuContent' :{
          templateUrl: "partial/DesignPaymentReport.html",
          controller: 'DesignPaymentReportController'
        }
      }
                         
                       })


                        .state('app.PaymentStatus', {
                           url: '/PaymentStatus',
                            views: {
        'menuContent' :{
          templateUrl: "partial/PaymentStatus.html",
          controller: 'PaymentStatusController'
        }
      }
                         
                       })

                        .state('app.ApplicationStatus', {
                           url: '/ApplicationStatus',
                            views: {
        'menuContent' :{
          templateUrl: "partial/ApplicationStatus.html",
          controller: 'ApplicationStatusController'
        }
      }
                         
                       })


                         .state('app.ApplicationStatus2', {
                           url: '/ApplicationStatus2',
                            views: {
        'menuContent' :{
          templateUrl: "partial/ApplicationStatus2.html",
          controller: 'ApplicationStatus2Controller'
        }
      }
                         
                       })


                        .state('app.TrademarkStatus', {
                           url: '/TrademarkStatus',
                            views: {
        'menuContent' :{
          templateUrl: "partial/TrademarkStatus.html",
          controller: 'TrademarkStatusController'
        }
      }
                         
                       })


                         .state('app.SendMail', {
                           url: '/SendMail',
                            views: {
        'menuContent' :{
          templateUrl: "partial/SendMail.html",
          controller: 'SendMailController'
        }
      }
                         
                       })


                         .state('app.CheckStatus2', {
                           url: '/CheckStatus2',
                            views: {
        'menuContent' :{
          templateUrl: "partial/CheckStatus2.html",
          controller: 'CheckStatus2Controller'
        }
      }
                         
                       })
                      .state('app.GetEmails2', {
                           url: '/GetEmails2',
                            views: {
        'menuContent' :{
          templateUrl: "partial/GetEmails2.html",
          controller: 'GetEmailsController'
        }
      }
                          
                       })
            .state('app.ViewBasket', {
                           url: '/ViewBasket',
                            cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/ViewBasket.html",
          controller: 'ViewBasketController'
        }
      }
                          
                       })

                        .state('app.ViewBasketTm', {
                           url: '/ViewBasketTm',
                            cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/ViewBasketTm.html",
          controller: 'ViewBasketTmController'
        }
      }
                          
                       })

                        .state('app.Confirmbasketdetails', {
                           url: '/Confirmbasketdetails',
                            views: {
        'menuContent' :{
          templateUrl: "partial/Confirmbasketdetails.html",
          controller: 'ViewBasketTmController'
        }
      }
                          
                       })

   .state('app.FileToo2', {
                           url: '/FileToo2',
                           cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/FileToo2.html",
          controller: 'FileToo2Controller'
        }
      }
                          
                       })


                

.state('app.ApplicationFileToo2', {
                           url: '/ApplicationFileToo2',
                           cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/ApplicationFileToo2.html",
          controller: 'ApplicationFileToo2Controller'
        }
      }
                          
                       })

                       .state('app.Aknowlegment', {
                           url: '/Aknowlegment',
                            views: {
        'menuContent' :{
          templateUrl: "partial/Aknowlegment.html",
          controller: 'AknowlegmentController'
        }
      }
                          
                       })


                        .state('app.ViewBasketPt', {
                           url: '/ViewBasketPt',
                            cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/ViewBasketPt.html",
          controller: 'ViewBasketPtController'
        }
      }
                          
                       })


                         .state('app.ConfirmBasketPt', {
                           url: '/ConfirmBasketPt',
                            views: {
        'menuContent' :{
          templateUrl: "partial/ConfirmBasketPt.html",
          controller: 'ViewBasketPtController'
        }
      }
                          
                       })


                        .state('app.ViewBasketDs', {
                           url: '/ViewBasketDs',
                            cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/ViewBasketDs.html",
          controller: 'ViewBasketDsController'
        }
      }
                          
                       })

                        .state('app.ConfirmBasketDs', {
                           url: '/ConfirmBasketDs',
                            views: {
        'menuContent' :{
          templateUrl: "partial/ConfirmBasketDs.html",
          controller: 'ViewBasketDsController'
        }
      }
                          
                       })





                        .state('app.UpdateRegistration', {
                           url: '/UpdateRegistration',
                            cache: false,
                            views: {
        'menuContent' :{
          templateUrl: "partial/UpdateRegistration.html",
          controller: 'UpdateRegistrationController'
        }
      }
                          
                       })
                     .state('app.PaymentDetail', {
                         url: '/PaymentDetail',
                         views: {
        'menuContent' :{
          templateUrl: "partial/PaymentDetail.html",
          controller: 'PaymentDetailController'
        }
      }
                        
                     })
                        .state('app.Formx', {
                           url: '/Formx',
                            views: {
        'menuContent' :{
          templateUrl: "partial/Formx.html",
          controller: 'FormxController'
        }
      }
                          
                       })
                         .state('app.Minvoice', {
                         url: '/Minvoice',
                         views: {
        'menuContent' :{
          templateUrl: "partial/Minvoice.html",
          controller: 'MinvoiceController'
        }
      }
                        
                     })

                        .state('app.ProceedToPayment', {
                          url: '/ProceedToPayment',
                          cache: false,
                           views: {
        'menuContent' :{
          templateUrl: "partial/ProceedToPayment.html",
          controller: 'ProceedToPaymentController'
        }
      }
                         
                      })
                      .state('app.Applicant', {
                           url: '/Applicant',
                         cache: false,
                           
                             views: {
        'menuContent' :{
          templateUrl: "partial/Applicant.html",
          controller: 'ApplicantController'
        }
      }
                          
                       })

                        .state('app.Fee', {
                         url: '/Fee',
                      
                        
                          views: {
        'menuContent' :{
          templateUrl: "partial/Fee.html",
          controller: 'FeeController'
        }
      }
                       
                     })
            .state('app.users', {
                url: '/users',
                 views: {
        'menuContent' :{
          templateUrl: "partial/Index2.html",
          controller: 'Home3Controller'
        }
      }
               
            }) ;


                     $urlRouterProvider.otherwise('/app/');

               
    });





 app.controller('AppCtrl', function ($scope, $http, $rootScope ,$ionicModal,localStorageService,  $location,authService,$window,$ionicSideMenuDelegate,$ionicHistory,$sce,$state,$filter ) {

$scope.submitForm3= function () {

  //  alert($rootScope.htmlPopover )

   $scope.calendarHTML=$rootScope.htmlPopover;
$scope.modal.show()

 }

 $scope.submitForm4= function () {
alert("called")
 $state.go('app.logout')

 }

 $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


if (localStorageService.get("baskets") == null) {

    $rootScope.TrademarkCount = 0;

    $rootScope.PatentCount = 0;

    $rootScope.DesignCount = 0;

    $rootScope.TotalCount = 0;
    $rootScope.Accreditation = 0;
    $rootScope.vcount = 0;;

    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color:black ">Trademark (' + $rootScope.TrademarkCount + ') <br/><br/><br/><br/><br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');

    
}

else {

    var aap2 = localStorageService.get("baskets");
    $rootScope.TrademarkCount = aap2.TrademarkCount;

    $rootScope.PatentCount = aap2.PatentCount;

    $rootScope.DesignCount = aap2.DesignCount;

    $rootScope.Accreditation = aap2.Accreditation;

    $rootScope.TotalCount = aap2.TotalCount;
    $rootScope.vcount = aap2.vcount;;
    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

}
$scope.goBack = function () {

$ionicHistory.goBack();
 }


$scope.toggleSideMenu = function() {
  if ($ionicSideMenuDelegate.isOpen()) {
    $ionicSideMenuDelegate.toggleLeft(false); // close
  } else {
    $ionicSideMenuDelegate.toggleLeft(); // open
  }
};

  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

             //  $rootScope.vurl = dx.imageurl + dx.Principal;
             //  $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

 });
 app.controller('Home3Controller', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$sce, $filter) {
 

 
$rootScope.$on('refr', function() {

    if (localStorageService.get("Email") != null) {
    var ddx = localStorageService.get("Email");
    // alert("inside logged")

    $scope.itemsByPage = 50;
    $scope.ListAgent = ddx.data;
    $scope.displayedCollection = [].concat($scope.ListAgent);

}
     
   });


               if (localStorageService.get("username") == null) {

                 
                   //  alert("username=" + localStorageService.get("username"))

                   $rootScope.islogin = false;

                   $rootScope.islogout = true;

                  



               }

else {

     
                   var vtokendate = localStorageService.get("access_tokenexpire")
var vtokendate2 = new Date(vtokendate);

var vtokendate3 = new Date();



var tdate = dates.compare(vtokendate2, vtokendate3);

if (tdate < 0) {
  //  $location.path("/app/logout");

   // return;

}


    if (localStorageService.get("Email") != null) {
    var ddx = localStorageService.get("Email");
    // alert("inside logged")

    $scope.itemsByPage = 50;
    $scope.ListAgent = ddx.data;
    $scope.displayedCollection = [].concat($scope.ListAgent);

}



$rootScope.agentRole = localStorageService.get("agentRole");

$rootScope.islogin = true;

$rootScope.islogout = false;

$rootScope.username = localStorageService.get("username")



//   authService2.checkaccess2();conta



}



$rootScope.HeaderMessage = "Mails";

$rootScope.isFee = true;
//  if (localStorageService.get("Email") != null) {
$rootScope.count22 = '22b';


//   }

//  localStorageService.set("count", '3');

// var aap = localStorageService.get("count");




if (localStorageService.get("baskets") == null) {

    $rootScope.TrademarkCount = 0;

    $rootScope.PatentCount = 0;

    $rootScope.DesignCount = 0;

    $rootScope.TotalCount = 0;
    $rootScope.Accreditation = 0;
    $rootScope.vcount = 0;;

    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black; ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ')  <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');

    
}

else {

    var aap2 = localStorageService.get("baskets");
    $rootScope.TrademarkCount = aap2.TrademarkCount;

    $rootScope.PatentCount = aap2.PatentCount;

    $rootScope.DesignCount = aap2.DesignCount;

    $rootScope.Accreditation = aap2.Accreditation;

    $rootScope.TotalCount = aap2.TotalCount;
    $rootScope.vcount = aap2.vcount;;
    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

}

// alert(aap)
$rootScope.count = '0';

$rootScope.count2 = '3';

             

$scope.oneAtATime = true;

$scope.add2 = function (vrow) {
    var serviceBase2 = 'http://88.150.164.30/EinaoTestEnvironment.IPO/Handlers/GetEmail2.ashx';

    var Encrypt = {
        vid: vrow.id
    }


    $http({
        method: 'POST',
        url: serviceBase2,
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: Encrypt,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
    })
      .success(function (response) {
          var dd = [];

          dd = response;

          $scope.itemsByPage = 10;
          $scope.ListAgent2 = response;
          $scope.displayedCollection2 = [].concat($scope.ListAgent2);



          //  IpoTradeMarks2(response.Email, response.Firstname, response.CompanyAddress, response.xid, response.PhoneNumber)
          //  ajaxindicatorstop();

      })
      .error(function (response) {
          //   ajaxindicatorstop();
      });

    // $rootScope.xid = vrow.xid
    $state.go('form.detail')
}




$scope.add5 = function (vrow) {

    if (vrow.Status) {

        return false
    }
    else {

        return true;
    }


}




$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];



var urlIpobase = "http://88.150.164.30/EinaoTestEnvironment.IPO/";


$scope.$on('$viewContentLoaded', function () {

    $scope.items = ['Corporate'];

    // alert($rootScope.Sys_ID)

    //Here your view content is fully loaded !!
});







 


       });


        app.controller('CheckStatusController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
 

 $scope.dashboard = function () {

$ionicHistory.goBack();
 }
$scope.Registration = localStorageService.get("user");
 var id=$scope.Registration.xid ;

 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];
          






       });


      


        app.controller('PatentStatusController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce, $filter ) {
   if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
               //    $location.path("/app/logout");

                //   return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")
                $rootScope.user = localStorageService.get("user")





               //  authService2.CheckAccess();

           }
           $rootScope.HeaderMessage = "Status";

           $rootScope.isFee = true;

           localStorageService.set("count", '13');

           $rootScope.count22 = '29';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';
           $rootScope.count2 = '13';
           $scope.ApplicantForm = {};




           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.Accreditation = 0;
               $rootScope.vcount = 0;;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.Accreditation = aap2.Accreditation;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }


           $scope.submitForm3 = function () {

               $window.print();


           }



           $scope.vshow = false;
           $scope.Getstatus = "";
           $scope.SelectedValue = "";



           $scope.Ddx3 = function () {

               $("input#SelectedValue").val("");
               // $("#Getstatus").val("").change();
               $scope.vshow = false;


           }
           $scope.Ddx = function (dxp2) {




               authService.getPatentStatus(dxp2).then(function (data, status) {
                   $scope.dd = data;
                   if (data.vcount > 0) {
                       $scope.vshow = true;

                   }

                   else {

                       swal("", "Record Not Found", "error");
                       $scope.vshow = false;

                   }

               });





           }









       });


        app.controller('DesignStatusController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce, $filter ) {
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                  // $location.path("/logout");

                  // return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

                $rootScope.user = localStorageService.get("user")





               //  authService2.CheckAccess();

           }
           $rootScope.HeaderMessage = "Status";

           $rootScope.isFee = true;

           localStorageService.set("count", '13');

           $rootScope.count22 = '29';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';
           $rootScope.count2 = '13';
           $scope.ApplicantForm = {};




           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.Accreditation = 0;
               $rootScope.vcount = 0;;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.Accreditation = aap2.Accreditation;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }

           $scope.submitForm3 = function () {

               $window.print();


           }


           $scope.varray44 = [{ Transaction_Status: 'TransactionId', Transaction_Status2: 'TransactionId' }, { Transaction_Status: 'TpNumber', Transaction_Status2: 'TpNumber' }];

           $scope.vshow = false;
           $scope.Getstatus = "";
           $scope.SelectedValue = "";



           $scope.Ddx3 = function () {

               $("input#SelectedValue").val("");
               // $("#Getstatus").val("").change();
               $scope.vshow = false;


           }
           $scope.Ddx = function (dxp2) {




               authService.getDesignStatus(dxp2).then(function (data, status) {
                   $scope.dd = data;
                   if (data.vcount > 0) {
                       $scope.vshow = true;

                   }

                   else {

                       swal("", "Record Not Found", "error");
                       $scope.vshow = false;

                   }

               });





           }

          






       });

         app.controller('TrademarkStatusController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce,$filter ) {


 if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                 // $location.path("/app/logout");

                  // return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")
                $rootScope.user = localStorageService.get("user")





               //  authService2.CheckAccess();

           }
           $rootScope.HeaderMessage = "Status";

           $rootScope.isFee = true;

           localStorageService.set("count", '13');

           $rootScope.count22 = '28';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '13';
           $scope.ApplicantForm = {};




           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.Accreditation = 0;
               $rootScope.vcount = 0;;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.Accreditation = aap2.Accreditation;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }


           $scope.submitForm3 = function () {

               $window.print();


           }

        
           $scope.varray44 = [{ Transaction_Status: 'TransactionId', Transaction_Status2: 'TransactionId' }, { Transaction_Status: 'TpNumber', Transaction_Status2: 'TpNumber' }];

           $scope.vshow = false;
           $scope.Getstatus = "";
           $scope.SelectedValue = "";



           $scope.Ddx3 = function () {

               $("input#SelectedValue").val("");
               $("#Getstatus").val("").change();
               $scope.vshow = false;


           }
           $scope.Ddx = function (dxp, dxp2) {


               if (dxp == "TransactionId") {

                   authService.getTrademarkStatus(dxp2).then(function (data, status) {
                       $scope.dd = data;
                       if (data.vcount > 0) {
                           $scope.vshow = true;

                       }

                       else {

                           swal("", "Record Not Found", "error");
                           $scope.vshow = false;

                       }

                   });

               }

               if (dxp == "TpNumber") {

                   authService.getTrademarkStatus2(dxp2).then(function (data, status) {
                       $scope.dd = data;
                       if (data.vcount > 0) {
                           $scope.vshow = true;

                       }

                       else {

                           swal("", "Record Not Found", "error");
                           $scope.vshow = false;

                       }

                   });

               }

           }

         });

            app.controller('PatentPaymentReportController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce,$filter,$ionicModal ) {
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                  // $location.path("/logout");

                 //  return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")





               //  authService2.CheckAccess();

           }
           $rootScope.HeaderMessage = "Purchases Report";

           $rootScope.isFee = true;

           localStorageService.set("count", '10');

           $rootScope.count22 = '25';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '10';
           $scope.ApplicantForm = {};

         


           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.vcount = 0;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }

            $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


           $scope.submitForm3 = function () {

               $window.print();


           }

           $scope.vchange = function (vrow) {
                  var akp2 = localStorageService.get("user");
                       $scope.agent = localStorageService.get("user");
                       authService.getPaymentReport2(vrow.newtransID, akp2.xid).then(function (data, status) {
                           $scope.itemsByPage = 6;
                           $scope.data2 = data
                           $scope.ListAgent2 = data.fee_details;

                           $scope.displayedCollection2 = [].concat($scope.ListAgent2);

                           $scope.vTotal = 0;
                           $scope.vTotal = $scope.vTotal + parseFloat($scope.data2.InterSwitchPostField.isw_conv_fee);
                          
                           //added
                           angular.forEach(data.fee_details, function (item) {

                               item.amt = item.tot_amt ;
                               $scope.vTotal = $scope.vTotal + parseFloat(item.amt);

                               //   $scope.vTotal = $scope.vTotal + parseFloat(item.amt);


                           });


                            $scope.modal.show() ;



                       });
              
           }



           var akp = localStorageService.get("user");
           authService.getPaymentReport("pt", akp.xid).then(function (data, status) {
               $scope.itemsByPage = 3000000;

               $scope.ListAgent = data;

              $scope.displayedCollection = [].concat($scope.ListAgent);



           });




            });


             app.controller('DesignPaymentReportController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce,$filter,$ionicModal ) {
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                  // $location.path("/logout");

                 //  return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")





               //  authService2.CheckAccess();

           }
           $rootScope.HeaderMessage = "Purchases Report";

           $rootScope.isFee = true;

           localStorageService.set("count", '10');

           $rootScope.count22 = '25';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '10';
           $scope.ApplicantForm = {};

         


           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.vcount = 0;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }

            $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


           $scope.submitForm3 = function () {

               $window.print();


           }

           $scope.vchange = function (vrow) {
                  var akp2 = localStorageService.get("user");
                       $scope.agent = localStorageService.get("user");
                       authService.getPaymentReport2(vrow.newtransID, akp2.xid).then(function (data, status) {
                           $scope.itemsByPage = 6;
                           $scope.data2 = data
                           $scope.ListAgent2 = data.fee_details;

                           $scope.displayedCollection2 = [].concat($scope.ListAgent2);

                           $scope.vTotal = 0;
                           $scope.vTotal = $scope.vTotal + parseFloat($scope.data2.InterSwitchPostField.isw_conv_fee);
                          
                           //added
                           angular.forEach(data.fee_details, function (item) {

                               item.amt = item.tot_amt ;
                               $scope.vTotal = $scope.vTotal + parseFloat(item.amt);

                               //   $scope.vTotal = $scope.vTotal + parseFloat(item.amt);


                           });


                            $scope.modal.show() ;



                       });
              
           }



           var akp = localStorageService.get("user");
           authService.getPaymentReport("ds", akp.xid).then(function (data, status) {
               $scope.itemsByPage = 3000000;

               $scope.ListAgent = data;

              $scope.displayedCollection = [].concat($scope.ListAgent);



           });




            });




              app.controller('TrademarkPaymentReportController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce,$filter,$ionicModal ) {
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                  // $location.path("/logout");

                 //  return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")





               //  authService2.CheckAccess();

           }
           $rootScope.HeaderMessage = "Purchases Report";

           $rootScope.isFee = true;

           localStorageService.set("count", '10');

           $rootScope.count22 = '25';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '10';
           $scope.ApplicantForm = {};

         


           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.vcount = 0;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: white ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }

            $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


           $scope.submitForm3 = function () {

               $window.print();


           }

           $scope.vchange = function (vrow) {
                  var akp2 = localStorageService.get("user");
                       $scope.agent = localStorageService.get("user");
                       authService.getPaymentReport2(vrow.newtransID, akp2.xid).then(function (data, status) {
                           $scope.itemsByPage = 6;
                           $scope.data2 = data
                           $scope.ListAgent2 = data.fee_details;

                           $scope.displayedCollection2 = [].concat($scope.ListAgent2);

                           $scope.vTotal = 0;
                           $scope.vTotal = $scope.vTotal + parseFloat($scope.data2.InterSwitchPostField.isw_conv_fee);
                          
                           //added
                           angular.forEach(data.fee_details, function (item) {

                               item.amt = item.tot_amt ;
                               $scope.vTotal = $scope.vTotal + parseFloat(item.amt);

                               //   $scope.vTotal = $scope.vTotal + parseFloat(item.amt);


                           });


                            $scope.modal.show() ;



                       });
              
           }



           var akp = localStorageService.get("user");
           authService.getPaymentReport("tm", akp.xid).then(function (data, status) {
               $scope.itemsByPage = 3000000;

               $scope.ListAgent = data;

              $scope.displayedCollection = [].concat($scope.ListAgent);



           });




            });

          app.controller('ApplicationStatusController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce,$filter ) {
  
  $scope.submitForm = function (aa) {

             if (aa ==undefined) {

                 alert("Select Type") ;
                 return ;
             }

             else if (aa =="Trademark") {
$location.path("/app/TrademarkStatus");

             }


              else if (aa =="Patent") {
$location.path("/app/PatentStatus");

             }


              else if (aa =="Design") {
$location.path("/app/DesignStatus");

             }


           }



   $scope.items = ['Trademark' ,'Patent','Design'];
  localStorageService.set("count", '13');

           $rootScope.count22 = '28';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '13';



               if (localStorageService.get("username") == null) {

                 
                   //  alert("username=" + localStorageService.get("username"))

                   $rootScope.islogin = false;

                   $rootScope.islogout = true;

                  



               }

else {

     
                   var vtokendate = localStorageService.get("access_tokenexpire")
var vtokendate2 = new Date(vtokendate);

var vtokendate3 = new Date();



var tdate = dates.compare(vtokendate2, vtokendate3);

if (tdate < 0) {
  //  $location.path("/app/logout");

   // return;

}


    if (localStorageService.get("Email") != null) {
    var ddx = localStorageService.get("Email");
    // alert("inside logged")

    $scope.itemsByPage = 50;
    $scope.ListAgent = ddx.data;
    $scope.displayedCollection = [].concat($scope.ListAgent);

}



$rootScope.agentRole = localStorageService.get("agentRole");

$rootScope.islogin = true;

$rootScope.islogout = false;

$rootScope.username = localStorageService.get("username")



//   authService2.checkaccess2();conta



}


if (localStorageService.get("baskets") == null) {

    $rootScope.TrademarkCount = 0;

    $rootScope.PatentCount = 0;

    $rootScope.DesignCount = 0;

    $rootScope.TotalCount = 0;
    $rootScope.Accreditation = 0;
    $rootScope.vcount = 0;;

    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black; ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ')  <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');

    
}

else {

    var aap2 = localStorageService.get("baskets");
    $rootScope.TrademarkCount = aap2.TrademarkCount;

    $rootScope.PatentCount = aap2.PatentCount;

    $rootScope.DesignCount = aap2.DesignCount;

    $rootScope.Accreditation = aap2.Accreditation;

    $rootScope.TotalCount = aap2.TotalCount;
    $rootScope.vcount = aap2.vcount;;
    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

}

          });



//added 

  app.controller('ApplicationStatus2Controller', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ,$sce,$filter ) {
  
  $scope.submitForm = function (aa) {

             if (aa ==undefined) {

                 alert("Select Type") ;
                 return ;
             }

             else if (aa =="Trademark") {
$location.path("/app/TrademarkPaymentReport");

             }


              else if (aa =="Patent") {
$location.path("/app/PatentPaymentReport");

             }


              else if (aa =="Design") {
$location.path("/app/DesignPaymentReport");

             }


           }



   $scope.items = ['Trademark' ,'Patent','Design'];
  localStorageService.set("count", '13');

           $rootScope.count22 = '28';

           var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '10';



               if (localStorageService.get("username") == null) {

                 
                   //  alert("username=" + localStorageService.get("username"))

                   $rootScope.islogin = false;

                   $rootScope.islogout = true;

                  



               }

else {

     
                   var vtokendate = localStorageService.get("access_tokenexpire")
var vtokendate2 = new Date(vtokendate);

var vtokendate3 = new Date();



var tdate = dates.compare(vtokendate2, vtokendate3);

if (tdate < 0) {
  //  $location.path("/app/logout");

   // return;

}


    if (localStorageService.get("Email") != null) {
    var ddx = localStorageService.get("Email");
    // alert("inside logged")

    $scope.itemsByPage = 50;
    $scope.ListAgent = ddx.data;
    $scope.displayedCollection = [].concat($scope.ListAgent);

}



$rootScope.agentRole = localStorageService.get("agentRole");

$rootScope.islogin = true;

$rootScope.islogout = false;

$rootScope.username = localStorageService.get("username")



//   authService2.checkaccess2();conta



}


if (localStorageService.get("baskets") == null) {

    $rootScope.TrademarkCount = 0;

    $rootScope.PatentCount = 0;

    $rootScope.DesignCount = 0;

    $rootScope.TotalCount = 0;
    $rootScope.Accreditation = 0;
    $rootScope.vcount = 0;;

    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black; ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ')  <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');

    
}

else {

    var aap2 = localStorageService.get("baskets");
    $rootScope.TrademarkCount = aap2.TrademarkCount;

    $rootScope.PatentCount = aap2.PatentCount;

    $rootScope.DesignCount = aap2.DesignCount;

    $rootScope.Accreditation = aap2.Accreditation;

    $rootScope.TotalCount = aap2.TotalCount;
    $rootScope.vcount = aap2.vcount;;
    $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

}

          });
        app.controller('PaymentStatusController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
  $scope.varray44 = [{ Transaction_Status: 'TransactionId', Transaction_Status2:'TransactionId' }, { Transaction_Status: 'TpNumber', Transaction_Status2: 'TpNumber' }] ;
 
$scope.vshow = false;
$scope.Getstatus ="";
$scope.SelectedValue ="";



$scope.Ddx3 = function() {                                              

    $("input#SelectedValue").val("");
   // $("#Getstatus").val("").change();
     $scope.vshow = false;
   

}
 $scope.Ddx = function(dxp2) {  
  



authService.getPaymentStatus(dxp2,id).then(function (data, status) {
                   $scope.dd = data;

   if ($scope.dd.twallet.xpay_status == "1")
                {
                    $scope.payment_status = "Paid";
                }
                else
                {
                    if ($scope.dd.twallet.xpay_status == "2")
                    {
                        $scope.payment_status = "Pending";
                    }
                    else
                    {
                        $scope.payment_status = "Failed";
                    }
                }


                   if ($scope.dd.vcount > 0) {
$scope.vshow = true;

                   }

                   else {

                       swal("","Record Not Found" ,"error") ;
                       $scope.vshow = false;

                   }

               });





 }


 $scope.dashboard = function () {

$ionicHistory.goBack();
 }
$scope.Registration = localStorageService.get("user");





   
 var id=$scope.Registration.xid ;

 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];
          






       });


  app.controller('SendMailController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {


$scope.Registration = localStorageService.get("user");


$scope.dashboard = function () {

$ionicHistory.goBack();
 }


   
 var id=$scope.Registration.xid ;
 var vemail =$scope.Registration.Email ;
var vfullname = $scope.Registration.Surname
 $scope.submitForm = function (aa) {


if ( (aa.chickenEgg =="") || (aa.chickenEgg ==undefined) )  {

    swal("","Select Complain Type" ,"error");
    return ;
}

 var  subject = aa.chickenEgg + " From: " + this.fullname;

  authService.getSendMail(aa.chickenEgg,"paymentsupport@einaosolutions.com",vemail,vfullname,aa.address).then(function (data, status) {
swal ("","Message Sent Successfully","success") ;


               });

}

 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

          






       });




  app.controller('CheckStatus2Controller', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
 
 $scope.dashboard = function () {

$ionicHistory.goBack();
 }
$scope.Registration = localStorageService.get("user");
 var id=$scope.Registration.xid ;

 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];
          






       });



   app.controller('ViewBasketTmController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
 

 $scope.dashboard2 = function () {
$location.path("/app/FileToo2");

 }

 $scope.EditRow = function (row) {
$rootScope.Details = row;
localStorageService.set("ViewBasketDetails", row);

if (row.product_title =="" || row.product_title ==undefined ) {

    swal ("","Please Enter Product Title","error")
    return;
}




          authService.getPwalletCount(row.new_transID).then(function (data, status) {
             
                  if ((data > 0) && (row.item_code =="T002") ) {

                      swal("","Application Already Exist","error")
                      return ;
                  }

                  else {
 if ( (row.item_code =="T002") ) {

$location.path("/app/Confirmbasketdetails");

 }

//$location.path("/app/Confirmbasketdetails");

                  }


               });





 }
$scope.dashboard = function () {

$ionicHistory.goBack();
 }

 
$scope.Registration = localStorageService.get("user");
 var id=$scope.Registration.xid ;

    authService.getBasket2("tm",id).then(function (data, status) {
                   $scope.itemsByPage = 6;
        
       $scope.ListAgent = data;
   
        $scope.displayedCollection = [].concat($scope.ListAgent);
 


               });
 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];
          






       });


        app.controller('FileToo2Controller', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
 

 


$scope.dashboard = function () {

$ionicHistory.goBack();
 }


 $scope.submitForm = function () {
$location.path("/app/ApplicationFileToo2");
    
     


//$location.path("/app/FileTest");



 }

 $rootScope.Details =localStorageService.get("ViewBasketDetails");
$scope.Registration = localStorageService.get("user");
 var id=$scope.Registration.xid ;

   
          






       });


        app.controller('AknowlegmentController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {


 $scope.dashboard = function () {

$ionicHistory.goBack();
 }

   
          






       });


      

        app.controller('ApplicationFileToo2Controller', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory,$ionicModal,$fileFactory,$cordovaFileTransfer,$ionicPlatform,$ionicLoading ) {

$scope.device2 = true;

$scope.GetStates13=function (Logo) {



    if (Logo =="2") {
$scope.device2 =false;

    }

    else {
$scope.device2 =true;

    }
}
        $scope.openModal = function () {

$scope.modal.show()
       }

              $scope.openModal2 = function () {

$scope.modal2.show()
       }

              $scope.openModal3 = function () {

$scope.modal3.show()
       }


              $scope.openModal4 = function () {

$scope.modal4.show()
       }

                 $scope.openModal7 = function () {

$scope.modal5.show()
       }


$scope.SubmitDoc = function (data,vv2) {
     
       $ionicLoading.show({
      template: 'Uploading Document...'
    }).then(function(){
      // console.log("The loading indicator is now displayed");
    });
var options = {
     fileKey: "logo_pic",
     fileName:  $scope.filename,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName': $scope.filename , 'logstaff':data} // directory represents remote directory,  fileName represents final remote file name
 };


      
 $cordovaFileTransfer.upload("http://45.40.139.163/EinaoTestEnvironment.CLD/Handlers/TestUpload.ashx", $scope.files2, options).then(function (result) {
    options = {
     fileKey: "auth_doc",
     fileName:  $scope.filename2,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName': $scope.filename2 , 'logstaff':data} // directory represents remote directory,  fileName represents final remote file name
 };


$cordovaFileTransfer.upload("http://45.40.139.163/EinaoTestEnvironment.CLD/Handlers/TestUpload.ashx", $scope.files3, options).then(function (result) {
 
if ($scope.files4 !=undefined) {
   

    $scope.SubmitDoc3(data,vv2) ;
}



if ($scope.files4 ==undefined && $scope.files5 !=undefined ) {
 
    $scope.SubmitDoc4(data,vv2) ;
}

if ($scope.files4 ==undefined && $scope.files5 ==undefined ) {
 
     $ionicLoading.hide().then(function(){
      // console.log("The loading indicator is now hidden");
    });
vv2 = $rootScope.Details.new_transID;
     authService.getAknowlegment(vv2).then(function (data, status) {
   
$rootScope.Aknowlegment = data;
$rootScope.Aknowlegment.vurl =$rootScope.Aknowlegment.vurl + $rootScope.Aknowlegment.markinfo.logo_pic


swal("","Record saved Successfully" ,"success")
$location.path("/app/Aknowlegment");
 });

}


     //end
 }, function (err) {
     alert(JSON.stringify(err))
            $ionicLoading.hide().then(function(){
     
    });

 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 });


     //end
 }, function (err) {
     alert(JSON.stringify(err))
     
            $ionicLoading.hide().then(function(){
     
    });

 }, function (progress) {
     
 });

 }



 $scope.SubmitDoc2 = function (data,vv2) {
      
       $ionicLoading.show({
      template: 'Uploading Document...'
    }).then(function(){
      // console.log("The loading indicator is now displayed");
    });

   var  options = {
     fileKey: "auth_doc",
     fileName:  $scope.filename2,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName': $scope.filename2 , 'logstaff':data} // directory represents remote directory,  fileName represents final remote file name
 };



$cordovaFileTransfer.upload("http://45.40.139.163/EinaoTestEnvironment.CLD/Handlers/TestUpload.ashx", $scope.files3, options).then(function (result) {

if ($scope.files4 !=undefined) {

    $scope.SubmitDoc3(data,vv2) ;
}



if ($scope.files4 ==undefined && $scope.files5 !=undefined ) {

    $scope.SubmitDoc4(data,vv2) ;
}

if ($scope.files4 ==undefined && $scope.files5 ==undefined ) {

     $ionicLoading.hide().then(function(){
      // console.log("The loading indicator is now hidden");
    });
vv2 = $rootScope.Details.new_transID;
     authService.getAknowlegment(vv2).then(function (data, status) {
   
$rootScope.Aknowlegment = data;
$rootScope.Aknowlegment.vurl =$rootScope.Aknowlegment.vurl + $rootScope.Aknowlegment.markinfo.logo_pic


swal("","Record saved Successfully" ,"success")
$location.path("/app/Aknowlegment");
 });

}
     //end
 }, function (err) {
     alert(JSON.stringify(err))
            $ionicLoading.hide().then(function(){
     
    });

 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 });


     //end


 }



$scope.SubmitDoc4 = function (data,vv2) {
  var   options = {
     fileKey: "sup_doc2",
     fileName:  $scope.filename4,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName': $scope.filename4 , 'logstaff':data} // directory represents remote directory,  fileName represents final remote file name
 };

     $cordovaFileTransfer.upload("http://45.40.139.163/EinaoTestEnvironment.CLD/Handlers/TestUpload.ashx", $scope.files5, options).then(function (result) {
 


      $ionicLoading.hide().then(function(){
      // console.log("The loading indicator is now hidden");
    });
vv2 = $rootScope.Details.new_transID;
     authService.getAknowlegment(vv2).then(function (data, status) {
   
$rootScope.Aknowlegment = data;
$rootScope.Aknowlegment.vurl =$rootScope.Aknowlegment.vurl + $rootScope.Aknowlegment.markinfo.logo_pic


swal("","Record saved Successfully" ,"success")
$location.path("/app/Aknowlegment");
 });



 
    
 }, function (err) {
     alert(JSON.stringify(err))
            $ionicLoading.hide().then(function(){
     
    });


      
 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 });


}


$scope.SubmitDoc3 = function (data,vv2) {
  var   options = {
     fileKey: "sup_doc1",
     fileName:  $scope.filename3,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName': $scope.filename3 , 'logstaff':data} // directory represents remote directory,  fileName represents final remote file name
 };

     $cordovaFileTransfer.upload("http://45.40.139.163/EinaoTestEnvironment.CLD/Handlers/TestUpload.ashx", $scope.files4, options).then(function (result) {
 
 if (($scope.files5=="") ||( $scope.files5==undefined )  ) {

      $ionicLoading.hide().then(function(){
      // console.log("The loading indicator is now hidden");
    });
vv2 = $rootScope.Details.new_transID;
     authService.getAknowlegment(vv2).then(function (data, status) {
   
$rootScope.Aknowlegment = data;
$rootScope.Aknowlegment.vurl =$rootScope.Aknowlegment.vurl + $rootScope.Aknowlegment.markinfo.logo_pic


swal("","Record saved Successfully" ,"success")
$location.path("/app/Aknowlegment");
 });

 }

 else {

     $scope.SubmitDoc4 (data,vv2) ;
 }

 
    
 }, function (err) {
     alert(JSON.stringify(err))
            $ionicLoading.hide().then(function(){
     
    });


      
 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 });


}


 $scope.submitForm = function () {
  //   alert($scope.files2)
//alert("class=" + $scope.vclass2)

if ($scope.Logo == "" || $scope.Trademark_Type == "" || $scope.vclass2 == "" || $scope.Logo == undefined || $scope.Trademark_Type == undefined || $scope.vclass2 == undefined ) {
swal("","All Required Field Must be Entered " ,"error")
    return ;
}


if ($scope.Logo =="2") {

    if($scope.files3 ==""  || $scope.files3 ==undefined   ) {
swal("","Required File must be Uploaded" ,"error")
        return ;
    }

}

 if($scope.files2 =="" || $scope.files2 ==undefined ||  $scope.files3 ==""  || $scope.files3 ==undefined   ) {
swal("","Required File must be Uploaded" ,"error")
        return ;
    }



   var AgentsData = {
                Applicant_name: $scope.appname,
                Applicant_Address: $scope.address,
                Applicant_Email: $scope.xemail,
                Applicant_Phone: $scope.xtelephone,
                Trading_As: "",
                Nationality: $scope.country,
                Trademark_Type: $scope.Trademark_Type,
                Title_Of_Trademark: $scope.title_of_product,
                Rtm_No: "",
                Application_No: "",
                Validationid :$rootScope.Details.new_transID,
                Application_Date: "",
             Trademark_Class: $scope.vclass2,
                Goods_Desc: $scope.nice_class_desc,
                Logo_Desc: $scope.Logo,
                Txt_Discalimer: $scope.txt_discalimer,
                Agent_Code: $scope.xcode,
                Rep_Xname: $scope.xrep_xname,
                Agent_Nationality: "",
                Agent_Rep_Nationality: "",
                Agent_State: "",
                rep_address: $scope.rep_address,
                Rep_telephone: $scope.rep_xtelephone,
                Rep_email: $scope.rep_xemail,
                Cert_publicationdate: "",
                cert_details: "",
                amount: '0',
                Application_Type: 'T002'




            };
         
 var formData = new FormData();
 

   formData.append("vv", JSON.stringify(AgentsData));





   authService.PostAll(formData).then(function (data, status) {
      
      
if ($scope.Logo =="2") {

    if($scope.files3 ==""  || $scope.files3 ==undefined   ) {
swal("","Required File must be Uploaded" ,"error")
        return ;
    }

    else {

$scope.SubmitDoc2(data,$rootScope.Details.new_transID) ;

 //$scope.getfilesize () ;


    }
  


}

else {

     if($scope.files2 =="" || $scope.files2 ==undefined ||  $scope.files3 =="" ||  $scope.files3 ==undefined  ) {
swal("","Required File must be Uploaded" ,"error")
        return ;
    }

    else {
   
$scope.SubmitDoc(data,$rootScope.Details.new_transID) ;

 //$scope.getfilesize ($scope.files2) ;



    }

}


//


       
               });




 }

 $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

   $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

     $ionicModal.fromTemplateUrl('templates/modal3.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });

       $ionicModal.fromTemplateUrl('templates/modal4.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal4 = modal;
  });

         $ionicModal.fromTemplateUrl('templates/modal5.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal5 = modal;
  });
 var fs = new $fileFactory();
$ionicPlatform.ready(function() {
        fs.getEntriesAtRoot().then(function(result) {
            $scope.files = result;
        }, function(error) {
            console.error(error);
        });

        $scope.getContents = function(path,cc,dd) {
            if (cc) {
           
               $scope.files2 =path 
                $scope.filename =dd
            $scope.modal.hide()

            }
            fs.getEntries(path).then(function(result) {
                $scope.files = result;

              //  $scope.file2 = result;
           
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                  //  alert(result)
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }


          $scope.getContents2 = function(path,cc,dd) {
            if (cc) {
            
               $scope.files3 =path 
                $scope.filename2 =dd
            $scope.modal2.hide()

            }
            fs.getEntries(path).then(function(result) {
                $scope.files = result;

              //  $scope.file2 = result;
           
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                  //  alert(result)
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }

                  $scope.getContents3 = function(path,cc,dd) {
            if (cc) {
          
               $scope.files4 =path 
                $scope.filename3 =dd
            $scope.modal3.hide()

            }
            fs.getEntries(path).then(function(result) {
                $scope.files = result;

              //  $scope.file2 = result;
           
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                  //  alert(result)
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }


                   $scope.getContents4 = function(path,cc,dd) {
            if (cc) {
          
               $scope.files5 =path 
                $scope.filename4 =dd
            $scope.modal4.hide()

            }
            fs.getEntries(path).then(function(result) {
                $scope.files = result;

              //  $scope.file2 = result;
           
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                  //  alert(result)
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }
 });

$scope.dashboard = function () {

$ionicHistory.goBack();
 }



 $rootScope.Details =localStorageService.get("ViewBasketDetails");
$scope.Registration = localStorageService.get("user");
$scope.appname = $rootScope.Details.xname
$scope.address = $rootScope.Details.address
$scope.xtelephone = $rootScope.Details.xmobile
$scope.xemail = $rootScope.Details.xemail
$scope.title_of_product= $rootScope.Details.product_title

$scope.xcode = $scope.Registration.Sys_ID
$scope.xrep_xname = $scope.Registration.Surname
$scope.rep_address = $scope.Registration.CompanyAddress
$scope.rep_xtelephone = $scope.Registration.PhoneNumber
$scope.rep_xemail = $scope.Registration.Email


 var id=$scope.Registration.xid ;
     $scope.varray = [{ name: 'LOCAL', id: '1' }, { name: 'FOREIGN', id: '2' }]

    $scope.vaplication = [{ name: 'T001', id: 'T001' }, { name: 'T003', id: 'T003' }, { name: 'T004', id: 'T004' }]

    $scope.classtrademark = [{ name: 'DEVICE', id: '1' }, { name: 'WORD MARK', id: '2' }, { name: 'WORD AND DEVICE', id: '3' }]

 $scope.GetStates2 = function (dd) {
        var countryId = dd;


        if (countryId == '160') {
            $scope.Trademark_Type = "1";

        }

        else {

            $scope.Trademark_Type = "2";
        }

        authService.getState(countryId).then(function (data, status) {
                   $scope.dd = data;
                    $scope.states = data;
               });


    }
 authService.GetCountry().then(function (data, status) {
      $scope.countries = data;
               
               });

authService.GetClass().then(function (data, status) {
                   $scope.dd = data;
                     $scope.vclass = data;
               });




   
          






       });






 app.controller('ViewBasketPtController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
 
$scope.EditRow = function (row) {
$rootScope.Details = row;
localStorageService.set("ViewBasketDetails", row);

if (row.product_title =="" || row.product_title ==undefined ) {

    swal ("","Please Enter Product Title","error")
    return;
}
$location.path("/app/ConfirmBasketPt");


 }
 

 $scope.dashboard = function () {

$ionicHistory.goBack();
 }
$scope.Registration = localStorageService.get("user");
 var id=$scope.Registration.xid ;

    authService.getBasket2("pt",id).then(function (data, status) {
                   $scope.itemsByPage = 6;
        
       $scope.ListAgent = data;
   
        $scope.displayedCollection = [].concat($scope.ListAgent);
 


               });
 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];
          






       });


 app.controller('ViewBasketDsController', function ($scope, $http, $rootScope ,localStorageService,  $location,authService,$window,$ionicHistory ) {
 
$scope.EditRow = function (row) {
$rootScope.Details = row;
localStorageService.set("ViewBasketDetails", row);

if (row.product_title =="" || row.product_title ==undefined ) {

    swal ("","Please Enter Product Title","error")
    return;
}
$location.path("/app/ConfirmBasketDs");


 }
 

 $scope.dashboard = function () {

$ionicHistory.goBack();
 }
$scope.Registration = localStorageService.get("user");
 var id=$scope.Registration.xid ;

    authService.getBasket2("ds",id).then(function (data, status) {
                   $scope.itemsByPage = 6;
        
       $scope.ListAgent = data;
   
        $scope.displayedCollection = [].concat($scope.ListAgent);
 


               });
 
  
  if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
                  
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

$scope.myImages = ["img/xmas_2.jpg", "img/xmas_3.jpg" , "img/xmas_4.jpg"];
          






       });


     app.controller('ApplicantController', function ($scope, $http, $rootScope, localStorageService, authService, $location,$window,$ionicHistory,$sce, $filter) {
        
        
         if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;
           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")
               var vtokendate2 = new Date(vtokendate);

               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                  // $location.path("/app/logout");

                  // return;

               }

               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")





               //  authService2.CheckAccess();

           }

         
           $rootScope.HeaderMessage = "Make Payment";
        
           $rootScope.isFee = true;
       
          // localStorageService.set("count", '32');

           $rootScope.count22 = '22b';
          
         //  var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';
           $rootScope.count2 = '32';
           $scope.ApplicantForm = {};

           if (localStorageService.get("applicant") != null) {
               var ddx2 = localStorageService.get("applicant");
              

               $scope.ApplicantForm.firstname = ddx2.firstname;
               $scope.ApplicantForm.Lastname = ddx2.lastname;
               $scope.ApplicantForm.Address = ddx2.address;
               $scope.ApplicantForm.Email = ddx2.email;
               $scope.ApplicantForm.Phonenumber = ddx2.mobile;



           }

           else {

               $scope.ApplicantForm = {};
           }



           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.vcount = 0;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }
         



        


           $scope.submitForm = function (aa) {

             //  $location.path("/Fee");


               if ((aa)) {
                   
                   var Applicant = new Object();
                   Applicant.applicantname = $scope.ApplicantForm.firstname + " " + $scope.ApplicantForm.Lastname;
                   Applicant.firstname = $scope.ApplicantForm.firstname;
                   Applicant.lastname = $scope.ApplicantForm.Lastname;
                   Applicant.address = $scope.ApplicantForm.Address;
                   Applicant.email = $scope.ApplicantForm.Email;
                   Applicant.mobile = $scope.ApplicantForm.Phonenumber;

                   localStorageService.set("applicant", Applicant);


                   $location.path("/app/Fee");
               }
               else {

                   swal("", "ALL FIELD MUST BE FILLED", "error")
                   return;

               


               }


           }

       
    
       });



         app.controller('UpdateRegistrationController', function ($scope, $http, $rootScope, localStorageService, authService, $location,$window,$moment,$ionicHistory) {
  
   $scope.dashboard = function () {

$ionicHistory.goBack();
 }
   $scope.Registration = localStorageService.get("user");
 // $scope.Registration.DateOfBrith = ppx($scope.Registration.DateOfBrith)  ;

// $scope.DateOfBrith2 = $moment("20111031").format('DD-MM-YYYY');

  //alert($moment("20111031").format('DD-MM-YYYY'))


      

           $scope.submitForm = function (aa) {
               var pp= $scope.Registration;
  

    swal({
                   title: "Are You Sure You want To Update Record",
                   text: "",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#DD6B55", confirmButtonText: "YES",
                   cancelButtonText: "No, cancel please!",
                   closeOnConfirm: true,
                   closeOnCancel: true
               },
    function (isConfirm) {
        if (isConfirm) {
   authService.UpdateRegistration(pp).then(function (data, status) {
                   var dd = data;
                   localStorageService.set("user", data);
                   swal("","Update SuccessFul","success") 

                 //  $location.path("/PaymentDetail");



               });


        }

    });
      

           }

         

           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               $location.path("/app")
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = "http://ipo.cldng.com/" + dx.Principal;
              // $rootScope.vurl = dx.imageurl + dx.Principal;

               
               $rootScope.vurl2 = dx.imageurl + dx.logo;


                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }
       });
       
app.controller('ProceedToPaymentController', function ($scope, $http, $rootScope, localStorageService, authService, $location,

$ionicHistory) {
 $scope.dashboard = function (row) {

$ionicHistory.goBack();
 }
    

           $scope.Shopping_card3 = localStorageService.get("Shopping_card2")

           $scope.applicant = localStorageService.get("applicant");
           $scope.agent = localStorageService.get("user");
           $scope.twallet = localStorageService.get("twallet");

         

           angular.forEach($scope.Shopping_card3, function (item) {

               $scope.vTotal = $scope.vTotal + parseFloat(item.amt);


           });

 $scope.getdata2 = function (obj) {


 }

           $scope.getdata = function (obj) {

               $scope.food = obj.target.value;

            


                              var Shopping_card = []
               Shopping_card = localStorageService.get("Shopping_card2");
               var applicant = localStorageService.get("applicant");
               var agent = localStorageService.get("user");
               var twallet = localStorageService.get("twallet");

               var InterSwitchPostFields = localStorageService.get("InterSwitchPostFields");






               authService.PaymentDetail(applicant, Shopping_card, agent, twallet, InterSwitchPostFields).then(function (data, status) {
                   var dd = data;
                 //  localStorageService.set("InterSwitchPostFields", data);

                   $location.path("/app/PaymentDetail");



               });
           }



           $scope.submitForm = function () {






           }



           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;

               $location.path("/app")
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
   $rootScope.vcount2 = ppx;
    if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }
       });


 app.controller('FormxController', function ($scope, $http, $rootScope, localStorageService, authService, $location) {


           $scope.Shopping_card3 = localStorageService.get("Shopping_card2")

           var Shopping_card = $scope.Shopping_card3;

           $scope.applicant = localStorageService.get("applicant");
           var applicant2 = $scope.applicant
           $scope.agent = localStorageService.get("user");
           var agent2 = $scope.agent
           $scope.twallet = localStorageService.get("twallet");
           var twallet2 = $scope.twallet



           $scope.InterSwitchPostFields = localStorageService.get("InterSwitchPostFields");
           var InterSwitchPostFields2 = $scope.InterSwitchPostFields

     
           $scope.tech_amt = 0.0;
           $scope.init_amt = 0.0;

           angular.forEach($scope.Shopping_card3, function (item) {

               $scope.tech_amt = $scope.tech_amt + parseFloat(item.tech_amt);
               $scope.init_amt = $scope.init_amt + parseFloat(item.init_amt);


           });
           $scope.tech_amt = $scope.tech_amt * 100;
           $scope.init_amt = $scope.init_amt * 100;
          

           authService.formx(applicant2, Shopping_card, agent2, twallet2, InterSwitchPostFields2).then(function (data, status) {
               var dd = data;
               $scope.vdata = data;
               //  localStorageService.set("InterSwitchPostFields", data);

               //  $location.path("/PaymentDetail");



           });
          
           // $scope.amount2 = parseFloat($scope.InterSwitchPostFields.amount / 100)
         






           $scope.submitForm = function () {


           //    authService.PostPayment().then(function (data, status) {
              //     var dd = data;
                

             //  });
      
try {
 //  doUrlPost("http://88.150.164.30/NewTrademark/#/Formx2", "test", "", "", "") 

  window.open("http://88.150.164.30/NewTrademark/Index2.aspx?TransactionidID="+twallet2.transID+ "&&xid="+ twallet2.xid , '_system');
  
}
catch(err) {
    alert(err.message)
    
}


 
               

           }



           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               $location.path("/app")
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }
       });


 app.controller('PaymentDetailController', function ($scope, $http, $rootScope, localStorageService, authService, $location ,

$ionicHistory) {

 $scope.dashboard = function (row) {

$ionicHistory.goBack();
 }
        
           $scope.Shopping_card3 = localStorageService.get("Shopping_card2")

           $scope.applicant = localStorageService.get("applicant");
           $scope.agent = localStorageService.get("user");
           $scope.twallet = localStorageService.get("twallet");

  var twallet2 =$scope.twallet ;

           $scope.InterSwitchPostFields = localStorageService.get("InterSwitchPostFields");
           $scope.vTotal2 = 0;

           angular.forEach($scope.Shopping_card3, function (item) {

               $scope.vTotal2 = $scope.vTotal2 + parseFloat(item.amt);


           });
          // $scope.amount2 = parseFloat($scope.InterSwitchPostFields.amount / 100)
           $scope.isw_conv_fee2 = parseFloat($scope.InterSwitchPostFields.isw_conv_fee )

           $scope.vtotal = ((parseFloat($scope.vTotal2) + parseFloat($scope.isw_conv_fee2)));



        


 

               try {
 //  doUrlPost("http://88.150.164.30/NewTrademark/#/Formx2", "test", "", "", "") 
window.open("http://88.150.164.30/NewTrademark/Index2.aspx?TransactionidID="+twallet2.transID+ "&&xid="+ twallet2.xid, '_blank', 'location=yes');
//  window.open("http://88.150.164.30/NewTrademark/#/Formx2?TransactionidID="+twallet2.transID+ "&&xid="+ twallet2.xid , '_blank', 'location=no');
  
}
catch(err) {
    alert(err.message)
    
}

           //    $location.path("/Formx");




           



           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               $location.path("/app")
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;
               //  authService2.CheckAccess();

           }
       });
         app.controller('SelectedItemController', function ($scope, $http, $rootScope, localStorageService, authService, $location,$ionicHistory,$sce, $filter,$ionicModal) 

{
           $scope.Shopping_card3 = [];

          
      

           $scope.Shopping_card3 = [];

           $rootScope.HeaderMessage = "Make Payment";
           $rootScope.isFee = true;



           if (localStorageService.get("baskets")== null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.Accreditation = 0;
               $rootScope.vcount = 0;;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.Accreditation = aap2.Accreditation;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }






        //   localStorageService.set("count", '32');


           //   localStorageService.set("baskets", $rootScope.htmlPopover);
         //  var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '00';

           $rootScope.count2 = '32';

         


           $scope.vTotal = 0;

           if (localStorageService.get("Shopping_card2") != null) {
               $scope.Shopping_card3 = localStorageService.get("Shopping_card2")

               $scope.itemsByPage = 100;


               $scope.displayedCollection2 = [].concat($scope.Shopping_card3);


               angular.forEach($scope.Shopping_card3, function (item) {

                   item.amt = item.amt * item.qty;
                   $scope.vTotal = $scope.vTotal + parseFloat(item.amt);


               });

           }
           $scope.animationsEnabled = true;
          
          var opened = false;
           $scope.getCheckedTrue = function (kk) {
            
               if (kk == "YES") {
                   // if (opened) return;
                 $scope.modal.show() ;
           };

           }

            $ionicModal.fromTemplateUrl('templates/modal2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
           $scope.submitForm = function (kk) {
              
               var Shopping_card = []

             

               if (kk == "NO" ||kk == undefined ) {

                   swal("", "Check Terms And Aggrement To Continue", "error");

                   return;
               }
               Shopping_card = localStorageService.get("Shopping_card2");
               var applicant = localStorageService.get("applicant");
               var agent = localStorageService.get("user");






               authService.checkout(applicant, Shopping_card, agent).then(function (data, status) {
                   var dd = data;
                   localStorageService.set("twallet", data);

                 $location.path("/app/Minvoice");



               });





           }
          

       
       });


        app.controller('GetEmailsController', function ($scope, $http, $rootScope, localStorageService, authService, $location,

$ionicHistory) {

 var agent = localStorageService.get("user");
           $scope.Shopping_card3 = [];

           $scope.dashboard = function (row) {

            $ionicHistory.goBack();
             }
      

           $scope.vTotal = 0;


    $scope.add3 = function (vrow) {

       // window.history.back();
       // location.reload();
    }

$scope.dashboard = function (row) {

$ionicHistory.goBack();
 }
 $scope.add2 = function (vrow) {

      authService.getEmails2(vrow.id).then(function (data, status) {
                   var dd = data;
                    $rootScope.itemsByPage = 6;
               $rootScope.ListAgent2 = dd;
             
               $rootScope.displayedCollection2 = [].concat($rootScope.ListAgent2);
                  // localStorageService.set("twallet", data);

                   $location.path("/app/GetEmails2");
                 


               });

 }
    $scope.add5 = function (vrow) {

        if (vrow.Status) {

            return false
        }
        else {

            return true;
        }

      
    }



      authService.getEmails(agent.Sys_ID).then(function (data, status) {
                   var dd = data;
                    $scope.itemsByPage = 6;
               $scope.ListAgent = dd;
             
               $scope.displayedCollection = [].concat($scope.ListAgent);
                  // localStorageService.set("twallet", data);

                //   $location.path("/Minvoice");
                 


               });
       
           $scope.submitForm = function () {
              


               



         

            
       


           }

          

           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               $location.path("/app")
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;


                if (localStorageService.get("vcount") != null) {
                    var ppx = localStorageService.get("vcount")
                    ppx = parseInt(ppx) ;
   $rootScope.vcount2 = ppx;
   if (ppx > 0) 
   {
                    $rootScope.xvv = true;

                }

                else {
                     $rootScope.xvv = false;
                }
                }
               //  authService2.CheckAccess();

           }

       
       });

          app.controller('MinvoiceController', function ($scope, $http, $rootScope, localStorageService, authService, $location ,

$ionicHistory,$cordovaInAppBrowser) {

         

      
           $scope.Shopping_card3 = localStorageService.get("Shopping_card2")

           $scope.applicant = localStorageService.get("applicant");
           $scope.agent = localStorageService.get("user");
           $scope.twallet = localStorageService.get("twallet");
           


              $rootScope.user =   localStorageService.get("user");
             // alert ( $rootScope.user)
            
      $rootScope.access_token =   localStorageService.get("access_token");
      $rootScope.access_tokenexpire =   localStorageService.get("access_tokenexpire");
      $rootScope.username =   localStorageService.get("username");

                authService.ProceedToPayment($scope.applicant,  $scope.Shopping_card3, $scope.agent,$scope.twallet).then(function (data, status) {
                    var dd = data;
                    localStorageService.set("InterSwitchPostFields", data);
                  $rootScope.InterSwitchPostFields = data;
var InterSwitchPostFields2 = data;

                        authService.formx($scope.applicant, $scope.Shopping_card3, $scope.agent, $scope.twallet, InterSwitchPostFields2).then(function (data, status) {
                   var dd = data;
                   $rootScope.vdata = data;
                 



               });
           
               

                });

                

            $scope.itemsByPage = 100;
            $scope.ListAgent = $scope.Shopping_card3;
             
            $scope.displayedCollection = [].concat($scope.ListAgent);

            $scope.vTotal = 0;

            angular.forEach($scope.Shopping_card3, function (item) {

                $scope.vTotal = $scope.vTotal + ( parseFloat(item.amt) * parseInt(item.qty));


            });

          
          $rootScope.$on('$cordovaInAppBrowser:exit', function () {


       localStorageService.set("Shopping_card2",null);
             localStorageService.set("applicant",null);
      
              localStorageService.set("twallet",null);

         localStorageService.set("InterSwitchPostFields",null);
         localStorageService.set("baskets",null) ;

          $location.path("/app");


    });

            $scope.submitForm = function () {
                var Shopping_card = []
                Shopping_card = localStorageService.get("Shopping_card2");
                var applicant = localStorageService.get("applicant");
                var agent = localStorageService.get("user");
                var twallet = localStorageService.get("twallet");

             var  InterSwitchPostFields =localStorageService.get("InterSwitchPostFields");

  authService.PaymentDetail(applicant, Shopping_card, agent, twallet, InterSwitchPostFields).then(function (data, status) {
                  // var dd = data;
                  

                  try {
 //  doUrlPost("http://88.150.164.30/NewTrademark/#/Formx2", "test", "", "", "") 

 var options = {
      location: 'yes',
      clearcache: 'no',
      toolbar: 'yes'
   };


$cordovaInAppBrowser.open("http://88.150.164.30/NewTrademark/Index2.aspx?TransactionidID="+twallet.transID+ "&&xid="+ twallet.xid , '_blank', options)
		
      .then(function(event) {
    
         $rootScope.test = "test"

      
         // success
      })
		
      .catch(function(event) {
         // error
      });


// window.open("http://88.150.164.30/NewTrademark/Index2.aspx?TransactionidID="+twallet.transID+ "&&xid="+ twallet.xid , '_blank');
  
}
catch(err) {
    alert(err.message)
    
}        
                 //  document.getElementById('form2').submit();


               });





           





            }



       });
   app.controller('FeeController', function ($scope, $http, $rootScope, localStorageService, authService, $location, $sce, $filter, $window) {

           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
               return;

           }

           else {
               var vtokendate = localStorageService.get("access_tokenexpire")

              
               var vtokendate2 = new Date(vtokendate);

              
           var vtokendate2 = vtokendate2.toGMTString();
               var vtokendate3 = new Date();
               var tdate = dates.compare(vtokendate2, vtokendate3);

               if (tdate < 0) {
                 //  $location.path("/app/logout");

                 //  return;

               }
               $rootScope.agentRole = localStorageService.get("agentRole");
               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")

               var dx = localStorageService.get("user");

               $rootScope.vurl = dx.imageurl + dx.Principal;
               $rootScope.vurl2 = dx.imageurl + dx.logo;

               if (localStorageService.get("vcount") != null) {
                   var ppx = localStorageService.get("vcount")
                   ppx = parseInt(ppx);
                   $rootScope.vcount2 = ppx;
                   if (ppx > 0) {
                       $rootScope.xvv = true;

                   }

                   else {
                       $rootScope.xvv = false;
                   }
               }
               //  authService2.CheckAccess();

           }

           $rootScope.HeaderMessage = "Make Payment";
           $rootScope.isFee = true;
         
           $rootScope.count = '00';
           $rootScope.count2 = '32';

           if (localStorageService.get("baskets") == null) {

               $rootScope.TrademarkCount = 0;

               $rootScope.PatentCount = 0;

               $rootScope.DesignCount = 0;

               $rootScope.TotalCount = 0;
               $rootScope.Accreditation = 0;
               $rootScope.vcount = 0;;

               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
           }

           else {

               var aap2 = localStorageService.get("baskets");
               $rootScope.TrademarkCount = aap2.TrademarkCount;

               $rootScope.PatentCount = aap2.PatentCount;

               $rootScope.DesignCount = aap2.DesignCount;

               $rootScope.Accreditation = aap2.Accreditation;

               $rootScope.TotalCount = aap2.TotalCount;
               $rootScope.vcount = aap2.vcount;;
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $filter('currency')($rootScope.TotalCount, '', 2) + '  </div> ');

           }




        

         //  localStorageService.set("count", '32');


        //   localStorageService.set("baskets", $rootScope.htmlPopover);
         //  var aap = localStorageService.get("count");

           // alert(aap)
           $rootScope.count = '32';

         


         
           $scope.createContact = function (u) {
               $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
             //  $scope.modal.hide();
           };





          


           if (localStorageService.get("Shopping_card2") != null) {

               var cart3 = localStorageService.get("Shopping_card2");

               $scope.Shopping_card2 = cart3;
           }

           else {

               $scope.Shopping_card2 = [] ;
           }



           $scope.vcount = 0;
           $scope.submitForm = function () {
              
               var vno = 0;
               //angular.forEach($scope.Shopping_card2, function (item) {
               //    var User_Status = new Object();
               //    item.amt = parseFloat(item.amt) * parseFloat(item.qty);
               //    item.sn = vno + 1;
               //    vno = vno + 1;

               //});
               localStorageService.set("Shopping_card2", $scope.Shopping_card2);
               
              $location.path("/app/SelectedItem");
              




           }

       
           $scope.showbtn2 = function (row) {

               if (row.showbtn) {

                   return true;
               }

               else {

                   return false;
               }

           }

           $scope.submitForm2 = function () {

              $location.path("/app");


           }



           $scope.EditRow = function (row) {

               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   $scope.Shopping_card2 = cart3;
               }

               if (isNumber(row.qt_code)) {


               }

               else {
                   swal("", "Quantity Field Invalid", "error");
                   return;

               }

               if (row.qt_code == "" || parseInt(row.qt_code) <= 0) {

                   swal("", "Quantity Field Invalid", "error");
                   return;
               }
               var tot = 0;
               var abc = $rootScope.TotalCount;
              
               $rootScope.TotalCount = parseFloat($rootScope.TotalCount) + (parseFloat(row.amt) * parseInt(row.qt_code));

               //  $rootScope.TotalCount = $filter('currency')($rootScope.TotalCount);


              
               angular.forEach($scope.displayedCollection, function (item) {
                   var User_Status = new Object();
                  
                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = false;
                       item.showbtn2 = true;

                       var Shopping_card = new Object();
                       Shopping_card.amt = item.amt;
                       Shopping_card.init_amt = item.init_amt;
                       Shopping_card.item_code = item.item_code;
                       Shopping_card.item_desc = item.xdesc;
                       Shopping_card.qty = item.qt_code;
                       Shopping_card.tech_amt = item.tech_amt;
                       Shopping_card.xid = item.xid;
                       Shopping_card.sn = item.sn;

                       $scope.Shopping_card2.push(Shopping_card);
                       tot = tot + parseInt(item.qt_code);
                       $rootScope.vcount = parseInt($rootScope.vcount) + tot;
                       $rootScope.TrademarkCount = parseInt($rootScope.TrademarkCount) + tot ;
                      

                       $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
                      
                       var vbasket = new Object();
                       vbasket.TrademarkCount = $rootScope.TrademarkCount;
                       vbasket.PatentCount = $rootScope.PatentCount;
                       vbasket.DesignCount = $rootScope.DesignCount;
                       vbasket.Accreditation = $rootScope.Accreditation;
                       vbasket.TotalCount = $rootScope.TotalCount;
                       vbasket.vcount = $rootScope.vcount;
                       vbasket.vcount = $rootScope.vcount;
                       
                       localStorageService.set("baskets", vbasket);

                      


                   }







               });

               localStorageService.set("Shopping_card2", $scope.Shopping_card2);

           }


           $scope.EditRow3 = function (row) {

               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   $scope.Shopping_card2 = cart3;
               }

               if (isNumber(row.qt_code)) {


               }

               else {
                   swal("", "Quantity Field Invalid", "error");
                   return;

               }

               if (row.qt_code == "" || parseInt(row.qt_code) <= 0) {

                   swal("", "Quantity Field Invalid", "error");
                   return;
               }
               var tot = 0;
               $rootScope.TotalCount = parseFloat($rootScope.TotalCount) + (parseFloat(row.amt) * parseInt(row.qt_code));
               angular.forEach($scope.displayedCollection2, function (item) {
                   var User_Status = new Object();
                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = false;
                       item.showbtn2 = true;

                       var Shopping_card = new Object();
                       Shopping_card.amt = item.amt;
                       Shopping_card.init_amt = item.init_amt;
                       Shopping_card.item_code = item.item_code;
                       Shopping_card.item_desc = item.xdesc;
                       Shopping_card.qty = item.qt_code;
                       Shopping_card.tech_amt = item.tech_amt;
                       Shopping_card.xid = item.xid;
                       Shopping_card.sn = item.sn;

                       $scope.Shopping_card2.push(Shopping_card);
                       tot = tot + parseInt(item.qt_code);
         
                       $rootScope.vcount = parseInt($rootScope.vcount) + tot;
                       $rootScope.PatentCount = parseInt($rootScope.PatentCount) + tot;
                       $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');

                       var vbasket = new Object();
                       vbasket.TrademarkCount = $rootScope.TrademarkCount;
                       vbasket.PatentCount = $rootScope.PatentCount;
                       vbasket.DesignCount = $rootScope.DesignCount;
                       vbasket.Accreditation = $rootScope.Accreditation;
                       vbasket.TotalCount = $rootScope.TotalCount;
                       vbasket.vcount = $rootScope.vcount;
                       localStorageService.set("baskets", vbasket);
                        

                   }







               });

               localStorageService.set("Shopping_card2", $scope.Shopping_card2);

           }



           $scope.EditRow4 = function (row) {

               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   $scope.Shopping_card2 = cart3;
               }


               var tot = 0;
               $rootScope.vcount = parseInt($rootScope.vcount) - parseInt(row.qt_code);
               $rootScope.PatentCount = parseInt($rootScope.PatentCount) - parseInt(row.qt_code);
               $rootScope.TotalCount = parseFloat($rootScope.TotalCount) - (parseFloat(row.amt) * parseInt(row.qt_code));
              
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
             
               var vbasket = new Object();
               vbasket.TrademarkCount = $rootScope.TrademarkCount;
               vbasket.PatentCount = $rootScope.PatentCount;
               vbasket.DesignCount = $rootScope.DesignCount;
               vbasket.Accreditation = $rootScope.Accreditation;
               vbasket.TotalCount = $rootScope.TotalCount;
               vbasket.vcount = $rootScope.vcount;
               localStorageService.set("baskets", vbasket);
               angular.forEach($scope.displayedCollection2, function (item) {
                   var User_Status = new Object();
                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = true;
                       item.showbtn2 = false;

                       item.qt_code = "";


                       var Shopping_card = new Object();
                       Shopping_card.amt = item.amt;
                       Shopping_card.init_amt = item.init_amt;
                       Shopping_card.item_code = item.item_code;
                       Shopping_card.item_desc = item.xdesc;
                       Shopping_card.qty = item.qt_code;
                       Shopping_card.tech_amt = item.tech_amt;
                       Shopping_card.xid = item.xid;

                       var index = $scope.Shopping_card2.indexOf(Shopping_card);
                       $scope.Shopping_card2.splice(index, 1);
                      
                       // alert($scope.Shopping_card2.length)

                   }


                   //if (item.description == "Acceptance") {

                   //    User_Status.online_id = item.oai_no;
                   //    User_Status.Status = "Acceptance"
                   //    User_Status.Recordid = item.RecordalID;

                   //    event2s.push(User_Status)
                   //    vcount = vcount + 1;
                   //    //alert(item.oai_no)
                   //}






               });

               localStorageService.set("Shopping_card2", $scope.Shopping_card2);

           }


           $scope.EditRow5 = function (row) {

               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   $scope.Shopping_card2 = cart3;
               }

               if (isNumber(row.qt_code)) {


               }

               else {
                   swal("", "Quantity Field Invalid", "error");
                   return;

               }

               if (row.qt_code == "" || parseInt(row.qt_code) <= 0) {

                   swal("", "Quantity Field Invalid", "error");
                   return;
               }
               var tot = 0;
               $rootScope.TotalCount = parseFloat($rootScope.TotalCount) + (parseFloat(row.amt) * parseInt(row.qt_code));
               angular.forEach($scope.displayedCollection3, function (item) {
                   var User_Status = new Object();
                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = false;
                       item.showbtn2 = true;

                       var Shopping_card = new Object();
                       Shopping_card.amt = item.amt;
                       Shopping_card.init_amt = item.init_amt;
                       Shopping_card.item_code = item.item_code;
                       Shopping_card.item_desc = item.xdesc;
                       Shopping_card.qty = item.qt_code;
                       Shopping_card.tech_amt = item.tech_amt;
                       Shopping_card.xid = item.xid;
                       Shopping_card.sn = item.sn;

                       $scope.Shopping_card2.push(Shopping_card);
                       tot = tot + parseInt(item.qt_code);
                       $rootScope.vcount = parseInt($rootScope.vcount) + tot;
                       $rootScope.DesignCount = parseInt($rootScope.DesignCount) + tot;
                      
                       $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
                       localStorageService.set("baskets", $rootScope.htmlPopover);
                       var vbasket = new Object();
                       vbasket.TrademarkCount = $rootScope.TrademarkCount;
                       vbasket.PatentCount = $rootScope.PatentCount;
                       vbasket.DesignCount = $rootScope.DesignCount;
                       vbasket.Accreditation = $rootScope.Accreditation;
                       vbasket.TotalCount = $rootScope.TotalCount;
                       vbasket.vcount = $rootScope.vcount;
                       localStorageService.set("baskets", vbasket);
                   }







               });

               localStorageService.set("Shopping_card2", $scope.Shopping_card2);

           }



           $scope.EditRow6 = function (row) {

               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   $scope.Shopping_card2 = cart3;
               }

               var tot = 0;
               $rootScope.vcount = parseInt($rootScope.vcount) - parseInt(row.qt_code);
               $rootScope.DesignCount = parseInt($rootScope.DesignCount) - parseInt(row.qt_code);
               $rootScope.TotalCount = parseFloat($rootScope.TotalCount) - (parseFloat(row.amt) * parseInt(row.qt_code));
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black ">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');
              
               var vbasket = new Object();
               vbasket.TrademarkCount = $rootScope.TrademarkCount;
               vbasket.PatentCount = $rootScope.PatentCount;
               vbasket.DesignCount = $rootScope.DesignCount;
               vbasket.Accreditation = $rootScope.Accreditation;
               vbasket.TotalCount = $rootScope.TotalCount;
               vbasket.vcount = $rootScope.vcount;
               localStorageService.set("baskets", vbasket);
               angular.forEach($scope.displayedCollection3, function (item) {
                   var User_Status = new Object();
                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = true;
                       item.showbtn2 = false;

                       item.qt_code = "";


                       var Shopping_card = new Object();
                       Shopping_card.amt = item.amt;
                       Shopping_card.init_amt = item.init_amt;
                       Shopping_card.item_code = item.item_code;
                       Shopping_card.item_desc = item.xdesc;
                       Shopping_card.qty = item.qt_code;
                       Shopping_card.tech_amt = item.tech_amt;
                       Shopping_card.xid = item.xid;

                       var index = $scope.Shopping_card2.indexOf(Shopping_card);
                       $scope.Shopping_card2.splice(index, 1);
                      
                       // alert($scope.Shopping_card2.length)

                   }


                   //if (item.description == "Acceptance") {

                   //    User_Status.online_id = item.oai_no;
                   //    User_Status.Status = "Acceptance"
                   //    User_Status.Recordid = item.RecordalID;

                   //    event2s.push(User_Status)
                   //    vcount = vcount + 1;
                   //    //alert(item.oai_no)
                   //}






               });

               localStorageService.set("Shopping_card2", $scope.Shopping_card2);

           }


           $scope.showbtn3 = function (row) {

               if (row.showbtn2) {

                   return true;
               }

               else {

                   return false;
               }


           }


           $scope.EditRow2 = function (row) {

               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   $scope.Shopping_card2 = cart3;
               }

               var tot = 0;
               $rootScope.vcount = parseInt($rootScope.vcount) - parseInt(row.qt_code);
               $rootScope.TotalCount = parseFloat($rootScope.TotalCount) - (parseFloat(row.amt) * parseInt(row.qt_code));
               $rootScope.TrademarkCount = parseInt($rootScope.TrademarkCount) - parseInt(row.qt_code);
               $rootScope.htmlPopover = $sce.trustAsHtml('<div style="color: black">Trademark (' + $rootScope.TrademarkCount + ') <br/>  Patent (' + $rootScope.PatentCount + ') <br/> Design (' + $rootScope.DesignCount + ') <br/>  Accreditation (' + $rootScope.Accreditation + ') <br/> <hr class="hr3" /> <br/> Total &nbsp; ' + $rootScope.TotalCount + '  </div> ');;
             
               var vbasket = new Object();
               vbasket.TrademarkCount = $rootScope.TrademarkCount;
               vbasket.PatentCount = $rootScope.PatentCount;
               vbasket.DesignCount = $rootScope.DesignCount;
               vbasket.Accreditation = $rootScope.Accreditation;
               vbasket.TotalCount = $rootScope.TotalCount;
               vbasket.vcount = $rootScope.vcount;
               localStorageService.set("baskets", vbasket);
               angular.forEach($scope.displayedCollection, function (item) {
                   var User_Status = new Object();
                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = true;
                       item.showbtn2 = false;

                       item.qt_code = "";


                       var Shopping_card = new Object();
                       Shopping_card.amt = item.amt;
                       Shopping_card.init_amt = item.init_amt;
                       Shopping_card.item_code = item.item_code;
                       Shopping_card.item_desc = item.xdesc;
                       Shopping_card.qty = item.qt_code;
                       Shopping_card.tech_amt = item.tech_amt;
                       Shopping_card.xid = item.xid;

                       var index = $scope.Shopping_card2.indexOf(Shopping_card);
                       $scope.Shopping_card2.splice(index, 1);
                       //  tot = tot + parseInt(item.qt_code);

                     //  $rootScope.vcount = parseInt($rootScope.vcount) - parseInt(row.qt_code);
                       // alert($scope.Shopping_card2.length)

                   }


                   //if (item.description == "Acceptance") {

                   //    User_Status.online_id = item.oai_no;
                   //    User_Status.Status = "Acceptance"
                   //    User_Status.Recordid = item.RecordalID;

                   //    event2s.push(User_Status)
                   //    vcount = vcount + 1;
                   //    //alert(item.oai_no)
                   //}






               });

               localStorageService.set("Shopping_card2", $scope.Shopping_card2);

              
         

           }

           $scope.showbtn3 = function (row) {

               if (row.showbtn2) {

                   return true;
               }

               else {

                   return false;
               }


           }


           $scope.EditTrademark = function (row) {
               angular.forEach($scope.displayedCollection, function (item) {
                   var User_Status = new Object();

                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = false;
                       item.showbtn2 = true;

                       item.qt_code = row.qty


                   }


               });


           }


           $scope.EditPatent = function (row) {
               angular.forEach($scope.displayedCollection2, function (item) {
                   var User_Status = new Object();

                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = false;
                       item.showbtn2 = true;

                       item.qt_code = row.qty


                   }


               });


           }


           $scope.EditDesign = function (row) {
               angular.forEach($scope.displayedCollection3, function (item) {
                   var User_Status = new Object();

                   if (item.item_code == row.item_code && item.sn == row.sn) {
                       item.showbtn = false;
                       item.showbtn2 = true;

                       item.qt_code = row.qty


                   }


               });


           }

           authService.GetFee().then(function (data, status) {
               var dd = data;

               $scope.itemsByPage = 6;
               $scope.ListAgent = dd;

               $scope.displayedCollection = [].concat($scope.ListAgent);


               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                 //  $scope.Shopping_card2 = cart3;


                   angular.forEach(cart3, function (item) {
                  
                       $scope.EditTrademark(item);






                   });
               }


           });

           authService.GetFee2().then(function (data, status) {
               var dd = data;

               $scope.itemsByPage = 6;
               $scope.ListAgent2 = dd;

               $scope.displayedCollection2 = [].concat($scope.ListAgent2);



               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   //  $scope.Shopping_card2 = cart3;


                   angular.forEach(cart3, function (item) {

                       $scope.EditPatent(item);






                   });
               }


           });

           authService.GetFee3().then(function (data, status) {
               var dd = data;

               $scope.itemsByPage = 6;
               $scope.ListAgent3 = dd;

               $scope.displayedCollection3 = [].concat($scope.ListAgent3);


               if (localStorageService.get("Shopping_card2") != null) {

                   var cart3 = localStorageService.get("Shopping_card2");

                   //  $scope.Shopping_card2 = cart3;


                   angular.forEach(cart3, function (item) {

                       $scope.EditDesign(item);






                   });
               }


           });



           //for (var key in kq) {

           //    if (kq[key] == "ADMIN") {

           //        $rootScope.isAdmin = true;
           //    }


           //    if (kq[key] == "PARTNER") {

           //        $rootScope.isInstitution = true;
           //    }


           //    // alert($rootScope.Roles[key])
           //}




       
       });
       

       app.controller('logoutController', function ($scope, $http, $rootScope ,localStorageService,$location,$window ) {



           localStorageService.set("username", null);
           localStorageService.set("access2", null);
           localStorageService.set("Shopping_card2", null);
           localStorageService.set("applicant", null)
           localStorageService.set("agentRole", null)
           $rootScope.islogin = false;

           $rootScope.islogout = true;
           localStorageService.set("access_token", null);
           localStorageService.set("access_right", null);
           localStorageService.set("baskets", null);

           localStorageService.set("loginuser", null);

           localStorageService.set("Email", null);


           localStorageService.set("user", null);


          
           localStorageService.set("vurl", null);
           localStorageService.set("vurl2", null);
         //  authService2.checkaccess2();
          

        

           $location.path("/app")
        






       });



          app.controller('ContactController', function ($scope, $http, $rootScope, localStorageService, authService, $location,$state) {
          
        
           


           if (localStorageService.get("username") == null) {
               //  alert("username=" + localStorageService.get("username"))

               $rootScope.islogin = false;

               $rootScope.islogout = true;
           }

           else {

               $rootScope.islogin = true;

               $rootScope.islogout = false;
               $rootScope.username = localStorageService.get("username")
           }

         
           localStorageService.set("test", "testing local storage");

        //  alert(localStorageService.get("test"))
       
           $scope.vlogin2 = false;
           $scope.vlogin = true;

 



           $scope.submitForm = function (vform) {
               localStorageService.set("access_right2", []);
              

               var formData = new FormData();
              
               var AgentsData = {

                   userName: vform.username,
                   password: vform.password



               };

               //authService.ConfirmUser(vform.username).then(function (data, status) {
               //    var dd = data;

               //    if (dd=="true") {


                      


                       authService.login(AgentsData).then(function (data, status) {
                       
                           $scope.savedSuccessfully = true;
                           $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
  var dsap = data.Sys_ID;
                           authService.getAgentemail(dsap).then(function (data, status) {
                            var dd = data;
                            localStorageService.set("Email", data);
                            $state.go('app.Home') ;

                            $rootScope.$emit('refr');
                           //  home('app.Home', null, { 'reload': true });
                         // $location.path("/app");

                        });



           

                       },
                   function (response) {
                       //  ajaxindicatorstop();

                       var errors = [];
                       for (var key in response.data.modelState) {
                           for (var i = 0; i < response.data.modelState[key].length; i++) {
                               errors.push(response.data.modelState[key][i]);
                           }
                       }
                       $scope.message = "Failed to register user due to:" + errors.join(' ');
                   });

         

$location.path("/")



           

           }


           $scope.submitForm2 = function (vform, isValid) {

               if (isValid) {

                   var formData = new FormData();

                   var AgentsData = {

                        OldPassword: vform.password,
                       NewPassword: vform.password2,
                       ConfirmPassword: vform.password3


                   };



                   formData.append("RegisterBindingModel", JSON.stringify(AgentsData));


                   authService.Changepassword(AgentsData).then(function (data, status) {

                      
                       localStorageService.set("username", null);
                       $rootScope.islogin = false;

                       $rootScope.islogout = true;
                       localStorageService.set("access_token", null);
                       localStorageService.set("access_right", null);

                       localStorageService.set("loginuser", null);
                       $rootScope.SearchAll = false;
                       $rootScope.AdminAll = false;
                       $rootScope.PartnerSearch = false;
                       $rootScope.SearchResultTransaction = false;
                       $rootScope.SearchTranscriptTransaction = false;
                       $rootScope.SearchCertificateTransaction = false;

                       $rootScope.isAdmin = false;
                       $rootScope.isInstitution = false;
                       swal("", "Password successfully changed. Please re-login to continue", "success")
                      

                       $location.path("/app/login")

                       //if (data.status == "200") {
                       //    swal("Record Saved Successfully");

                       //}


                       //   $location.path("/")
                       //  startTimer();

                   },
               function (response) {
                   //  ajaxindicatorstop();

                   var errors = [];
                   for (var key in response.data.modelState) {
                       for (var i = 0; i < response.data.modelState[key].length; i++) {
                           errors.push(response.data.modelState[key][i]);
                       }
                   }
                   $scope.message = "Failed to register user due to:" + errors.join(' ');
               });


               }

           }
        
 

           }







       );

       
       var dates = {
           convert: function (d) {
               // Converts the date in d to a date-object. The input can be:
               //   a date object: returned without modification
               //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
               //   a number     : Interpreted as number of milliseconds
               //                  since 1 Jan 1970 (a timestamp) 
               //   a string     : Any format supported by the javascript engine, like
               //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
               //  an object     : Interpreted as an object with year, month and date
               //                  attributes.  **NOTE** month is 0-11.
               return (
                   d.constructor === Date ? d :
                   d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                   d.constructor === Number ? new Date(d) :
                   d.constructor === String ? new Date(d) :
                   typeof d === "object" ? new Date(d.year, d.month, d.date) :
                   NaN
               );
           },
           compare: function (a, b) {
               // Compare two dates (could be of any type supported by the convert
               // function above) and returns:
               //  -1 : if a < b
               //   0 : if a = b
               //   1 : if a > b
               // NaN : if a or b is an illegal date
               // NOTE: The code inside isFinite does an assignment (=).
               return (
                   isFinite(a = this.convert(a).valueOf()) &&
                   isFinite(b = this.convert(b).valueOf()) ?
                   (a > b) - (a < b) :
                   NaN
               );
           },
           inRange: function (d, start, end) {
               // Checks if date in d is between dates in start and end.
               // Returns a boolean or NaN:
               //    true  : if d is between start and end (inclusive)
               //    false : if d is before start or after end
               //    NaN   : if one or more of the dates is illegal.
               // NOTE: The code inside isFinite does an assignment (=).
               return (
                    isFinite(d = this.convert(d).valueOf()) &&
                    isFinite(start = this.convert(start).valueOf()) &&
                    isFinite(end = this.convert(end).valueOf()) ?
                    start <= d && d <= end :
                    NaN
                );
           }
       }

        function isNumber(n) {
         return !isNaN(parseFloat(n)) && isFinite(n);
     }


    function doUrlPost(x_url, transID, vamount, vtranid, vrootscope) {

        //var kc = checkPopup(x_url)
     
        //if (kc == "ss") {

        postwith(x_url, {
            product_id: transID, vamount: vamount, vtranid: vtranid, vtype: "backend"
        });

         
         //   var serviceBase2 = serviceBaseCld  +'Handlers/UpdatePayment2.ashx';

    }

function ppx(mdy) {
  var d = mdy.split(/[\/\-\.]/, 3);

  if (d.length != 3) return null;

  // Check if date is valid
  var mon = parseInt(d[0]), 
      day = parseInt(d[1]),
      year= parseInt(d[2]);
  if (d[2].length == 2) year += 2000;
  if (day <= 31 && mon <= 12 && year >= 2015)
    return new Date(year, mon - 1, day);

  return null; 
}


function postwith(to, p) {
    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.action = to;
    myForm.target = "_blank";
  

    for (var k in p) {
        var myInput = document.createElement("input");
        myInput.setAttribute("name", k);
        myInput.setAttribute("value", p[k]);
        myForm.appendChild(myInput);
    }
    document.body.appendChild(myForm);
    myForm.submit();

    document.body.removeChild(myForm);

    
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}






   


              

      