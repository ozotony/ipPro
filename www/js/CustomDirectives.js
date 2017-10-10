(function (window) {

    'use strict';

    var app3 = angular.module('app2', []);

    app3.directive('changeBackground', ['$animate', function ($animate) {
        return {
            restrict: 'EA',
            scope: {
                colorcode: '@?'
            },
            link: function ($scope, element, attr) {
              
                element.on('mouseenter', function () {
                    element.addClass('change-color');
                    element.css('background-color', $scope.colorcode);
                    element.css('color', 'black');
                });
                element.on('mouseleave', function () {
                    element.removeClass('change-color');
                    element.css('background-color', 'green');
                    element.css('color', 'white');
                });
            }
        };
    }]);

    app3.directive('changeBackground2', ['$animate', '$rootScope', 'localStorageService', function ($animate, $rootScope, localStorageService) {
        return {
            restrict: 'EA',
            scope: {
                colorcode: '@?'
            },
            link: function (scope, element, attributes) {
                //Add event listener for 'click' event
                
               
                element.on('click', function (event) {
                  //  alert("scope value = " + $rootScope.count)
                   
                    console.log("cliked");

                   // alert(attributes.count2)

                    $rootScope.count = attributes.count2;

                    localStorageService.set("count2", $rootScope.count);
                    element.css('color', 'white');
                   


                

                 //   alert("new value of count =" + $rootScope.count)


                });

                element.on('mouseenter', function () {
                   
                    element.css('text-decoration', 'underline');
                   
                });
                element.on('mouseleave', function () {
                 
                    element.css('text-decoration', 'none');
                   
                });
            }
        };
    }]);


    app3.directive('changeBackground3', ['$animate', '$rootScope', 'localStorageService', function ($animate, $rootScope, localStorageService) {
        return {
            restrict: 'EA',
            scope: {
                colorcode: '@?'
            },
            link: function (scope, element, attributes) {
                //Add event listener for 'click' event

                element.on('click', function (event) {
                    //  alert("scope value = " + $rootScope.count)

                    console.log("cliked2");

                    // alert(attributes.count2)

                    $rootScope.count22 = attributes.count2;

                    localStorageService.set("count", $rootScope.count22);
                    element.css('color', 'white');





                    //   alert("new value of count =" + $rootScope.count)


                });
         

                element.on('mouseenter', function () {

                //    element.css('background-color', '#616161');

                });
                element.on('mouseleave', function () {

                //    element.css('background-color', '#3D3D3D');

                ////   element.css('color', 'white');

                });
            }
        };
    }]);


    app3.directive('fileUpload', function () {
        return {
            scope: true,        //create a new scope
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var files = event.target.files;
                    var typeoffile = attrs.typeoffile;
                    var fileobj = { file: files, typeoffile: typeoffile };
                    //iterate files since 'multiple' may be specified on the element

                    //emit event upward
                    scope.$emit("fileSelected", { file: fileobj });

                });
            }
        };
    });




}(window));












