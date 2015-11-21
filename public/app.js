var app = angular.module('app', []);
app.controller('AppController', function($scope, $http) {
	// Endereço da api
	var apiUrl = 'http://127.0.0.1';
	// Listagem geral
	$scope.alunos = [];
	// Listagem especifica
	$scope.aluno = {};
	$scope.listarMatricula = null;
	// Add
	$scope.pessoaAdd = {
		matricula: '',
		nome: ''
	};
	// Edit
	$scope.pessoaEdit = {
		matricula: '',
		nome: ''
	};
	// Remove
	$scope.pessoaRemove = {
		matricula: ''
	};

	$scope.listar = function() {
    $http({
      method: 'GET',
      url: apiUrl+'/aluno',
      dataType: 'json'
    })
    .success(function(res) {
    	$scope.alunos = res;
    	toastr["success"](res.length+' aluno(s)');
    })
    .error(function(data, status) {
      toastError('Não foi possível carregar a página solicitada!');
    });
  };

  $scope.listarEspecifico = function() {
  	if ($scope.listarMatricula == null || $scope.listarMatricula == '') {
    	toastr["error"]('Informe o número de matrícula');
  	} else {
  		$http({
	      method: 'GET',
	      url: apiUrl+'/aluno/'+$scope.listarMatricula,
	      dataType: 'json'
	    })
	    .success(function(res) {
	    	$scope.aluno = res;
	    	$scope.listarMatricula = '';
	    }).error(function(err, status) {
    		toastr["error"](err);
    		$scope.aluno = null;
	    });
  	}
  };

  $scope.adicionar = function() {
  	if ($scope.pessoaAdd.matricula == '') {
    	toastr["error"]('Informe o número de matrícula');
  	} else {
  		if ($scope.pessoaAdd.nome == '') {
    		toastr["error"]('Informe o nome');
  		} else {
  			$http({
		      method: 'POST',
		      url: apiUrl+'/aluno',
		      dataType: "json",
		      data: $scope.pessoaAdd
		    })
		    .success(function(res) {
    			$scope.pessoaAdd.matricula = '';
    			$scope.pessoaAdd.nome = '';
    			toastr["success"]('Aluno adicionado com sucesso');
		    }).error(function(err, status) {
    			toastr["error"](err);
		    });
  		}
  	}
  };

  $scope.editar = function() {
  	if ($scope.pessoaEdit.matricula == '') {
    	toastr["error"]('Informe o número de matrícula');
  	} else {
  		if ($scope.pessoaEdit.nome == '') {
    		toastr["error"]('Informe o nome');
  		} else {
  			$http({
		      method: 'PUT',
		      url: apiUrl+'/aluno/'+$scope.pessoaEdit.matricula,
		      dataType: 'json',
		      data: $scope.pessoaEdit
		    })
		    .success(function(res) {
		    	$scope.pessoaEdit.matricula = '';
    			$scope.pessoaEdit.nome = '';
    			toastr["success"]('Aluno editado com sucesso');
		    }).error(function(err, status) {
    			toastr["error"](err);
		    });
  		}
  	}
  };

  $scope.remover = function() {
  	if ($scope.pessoaRemove.matricula == '') {
    	toastr["error"]('Informe o número de matrícula');
  	} else {
			$http({
	      method: 'DELETE',
	      url: apiUrl+'/aluno/'+$scope.pessoaRemove.matricula,
	      dataType: 'json'
	    })
	    .success(function(res) {
	    	$scope.pessoaRemove.matricula = '';
  			toastr["success"]('Aluno removido com sucesso');
	    }).error(function(err, status) {
  			toastr["error"](err);
	    });
  	}
  };
});