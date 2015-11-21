var express = require('express'),
  bodyParser = require('body-parser'),
	ECT = require('ect');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var alunos = [];

app.get('/', function (req, res) {
	res.render('form.ect', {});
});

app.get('/aluno', function (req, res) {
  res.status(200).send(alunos);
});

app.get('/aluno/:matricula', function (req, res) {
	var alunoEncontrado = getAluno(req.params.matricula);
	if (alunoEncontrado == null)
		res.status(404).send('Aluno não encontrado');
	else
		res.status(200).send(alunoEncontrado);
});

app.post('/aluno', function (req, res) {
	var alunoEncontrado = getAluno(req.body.matricula);
	if (alunoEncontrado != null) {
		res.status(404).send('Número de matrícula já existente');
	} else {
		alunos.push({
			matricula: req.body.matricula,
			nome: req.body.nome
		});
		res.status(200).send();
	}
});

app.put('/aluno/:matricula', function (req, res) {
  var alunoEncontradoIndice = getAlunoIndice(req.params.matricula);
	if (alunoEncontradoIndice == null) {
		res.status(404).send('Número de matrícula não encontrado');
	} else {
		alunos[alunoEncontradoIndice] = {
			matricula: req.body.matricula,
			nome: req.body.nome
		};
		res.status(200).send();
	}
});

app.delete('/aluno/:matricula', function (req, res) {
  var alunoEncontradoIndice = getAlunoIndice(req.params.matricula);
	if (alunoEncontradoIndice == null) {
		res.status(404).send('Número de matrícula não encontrado');
	} else {
		var alunosNew = [];
		for (i in alunos) {
			if (i != alunoEncontradoIndice)
				alunosNew.push(alunos[i]);
		}
		alunos = alunosNew;
		res.status(200).send();
	}
});

function getAluno(matricula) {
	var alunoEncontrado = null;
	for (i in alunos) {
		if (alunos[i].matricula == matricula) {
			alunoEncontrado = alunos[i];
			break;
		}
	}
	return alunoEncontrado;
}

function getAlunoIndice(matricula) {
	var alunoEncontradoIndice = null;
	for (i in alunos) {
		if (alunos[i].matricula == matricula) {
			alunoEncontradoIndice = i;
			break;
		}
	}
	return alunoEncontradoIndice;
}

app.use(function(req, res, next) {
  res.status(404).send('Não encontrado!');
});

// view engine setup
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});