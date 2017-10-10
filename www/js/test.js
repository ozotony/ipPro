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