/**
 * Created by a514804 on 10/26/2016.
 */
var upload = angular.module('uploader', []);
upload.directive('ngUpload', ['uploadService','$log', function (uploadService, $log) {
  return {
    restrict: 'AE',
    templateUrl: 'ngapp/uploader/template.html',
    link: function ($scope, $elem, $attr, $http) {
      $scope.needToUpload = false;
      $scope.btn_remove = function (file) {
        $log.info('deleting=' + file);
        uploadService.removeFile(file);
      };
      $scope.btn_clean = function () {
        uploadService.removeAll();
      };
      $scope.btn_upload = function () {
        $log.info('uploading...');
        uploadService.startUpload({
          url: 'http://127.0.0.1:3000/upload',
          concurrency: 2,
          onProgress: function (file) {
            $log.info(file.name + '=' + file.humanSize);
            $scope.$apply();
          },
          onCompleted: function (file, response) {
            file.uploaded = true;
            $log.info(file.name + ' response ' + response);
          },
          onCompletedAll: function(files){
            $scope.uploaded = true;
            $scope.needToUpload = false;
            $scope.$apply();
            $log.info('All '+files.length+' files uploaded!');
          },
          onError: function(e, file){
            file.error = true;
            $scope.errors.push('Upload file [' + file.name +'] is failed!');
            $scope.$apply();
          }
        });
      };
      $scope.files = [];
      var element = $elem.find('input')[0];
      element.addEventListener('change', function (e) {
        var files = e.target.files;
        $scope.errors = [];
        $scope.uploaded = false;
        $scope.needToUpload = true;
        uploadService.addFiles(files);
        $scope.files = uploadService.getFiles();
        $scope.$apply();
      });
    }
  }
}]);
upload.service('uploadService', ['$log', function ($log) {

  /*jshint validthis: true */
  var self = this;
  self.files = [];
  self.options = {};
  self.activeUploads = 0;
  self.uploadedFiles = 0;
  $log.info('uploadService loaded');

  function addFiles(files) {
    for (var i = 0; i < files.length; i++) {
      self.files.push(files[i]);
    }
  }

  function getFiles() {
    return self.files;
  }

  function startUpload(options) {
    self.options = options;

    //headers are not shared by requests
    var headers = options.headers || {};

    for (var i = 0; i < self.files.length; i++) {
      if (self.activeUploads == self.options.concurrency) {
        break;
      }
      if (self.files[i].active)
        continue;
      ajaxUpload(self.files[i], self.options.url, self.options.data, headers);
    }
  }

  function removeFile(file) {
    self.files.splice(self.files.indexOf(file), 1);
  }

  function removeAll() {
    self.files.splice(0, self.files.length);
  }

  function ajaxUpload(file, url, data, headers) {
    var xhr, formData, prop, key = 'file'+self.activeUploads;
    data = data || {};

    self.activeUploads += 1;
    file.active = true;
    xhr = new window.XMLHttpRequest();

    // To account for sites that may require CORS
    if (data.withCredentials === true) {
      xhr.withCredentials = true;
    }

    formData = new window.FormData();
    xhr.open('POST', url);

    if (headers) {
      for (var headerKey in headers) {
        if (headers.hasOwnProperty(headerKey)) {
          xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
      }
    }

    // Triggered when upload starts:
    xhr.upload.onloadstart = function () {
    };

    // Triggered many times during upload:
    xhr.upload.onprogress = function (event) {
      if (!event.lengthComputable) {
        return;
      }
      // Update file size because it might be bigger than reported by
      // the fileSize:
      //$log.info("progres..");
      //console.info(event.loaded);
      file.loaded = event.loaded;
      file.humanSize = getHumanSize(event.loaded);
      if (angular.isFunction(self.options.onProgress)) {
        self.options.onProgress(file);
      }
    };

    // Triggered when upload is completed:
    xhr.upload.onload = function () {
      self.activeUploads -= 1;
      self.uploadedFiles += 1;
      startUpload(self.options);
      if (angular.isFunction(self.options.onCompleted)) {
        self.options.onCompleted(file, xhr.responseText, xhr.status);
      }
      if (self.activeUploads === 0) {
        self.uploadedFiles = 0;
        if (angular.isFunction(self.options.onCompletedAll)) {
          self.options.onCompletedAll(self.files);
        }
      }
    };

    // Triggered when upload fails:
    xhr.upload.onerror = function (e) {
      self.activeUploads -= 1;
      self.uploadedFiles += 1;
      startUpload(self.options);
      if (angular.isFunction(self.options.onError)) {
        self.options.onError(e, file);
      }
    };

    // Append additional data if provided:
    if (data) {
      for (prop in data) {
        if (data.hasOwnProperty(prop)) {
          formData.append(prop, data[prop]);
        }
      }
    }

    // Append file data:
    formData.append(key, file, file.name);

    // Initiate upload:
    xhr.send(formData);

    return xhr;
  }

  return {
    addFiles: addFiles,
    getFiles: getFiles,
    files: self.files,
    startUpload: startUpload,
    removeFile: removeFile,
    removeAll: removeAll
  }
}]);

function getHumanSize(bytes) {
  var sizes = ['n/a', 'bytes', 'KiB', 'MiB', 'GiB', 'TB', 'PB', 'EiB', 'ZiB', 'YiB'];
  var i = (bytes === 0) ? 0 : +Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + ' ' + sizes[isNaN(bytes) ? 0 : i + 1];
}

