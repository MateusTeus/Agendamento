const express = require('express'); 
const mongoose = require('mongoose');
const app = express(); 
const cors = require('cors'); 

app.use(express.json()); // Habilita o uso de JSON no corpo das requisições
app.use(cors()); // Habilita o CORS para permitir requisições de diferentes origens

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.qanhdhl.mongodb.net/?retryWrites=true&w=majority', {
  dbName: 'agendamento',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB'); // Exibe mensagem de sucesso na conexão
}).catch(err => {
  console.error(err); // Registra erro, se a conexão falhar
});

// Definição de esquemas e modelos para Professor, Discipline, Classroom, e Horario
const professorSchema = new mongoose.Schema({ name: String });
const disciplineSchema = new mongoose.Schema({ name: String });
const classroomSchema = new mongoose.Schema({ name: String });
const horarioSchema = new mongoose.Schema({
  professor: String,
  discipline: String,
  classroom: String,
  startDate: Date,
  endDate: Date,
  numberOfDays: Number,
});

const Professor = mongoose.model('Professor', professorSchema);
const Discipline = mongoose.model('Discipline', disciplineSchema);
const Classroom = mongoose.model('Classroom', classroomSchema);
const Horario = mongoose.model('Horario', horarioSchema);

// Rota POST para registrar professores
app.post('/register/professor', async (req, res) => {
  const { name } = req.body; // Extrai o nome do corpo da requisição
  const professor = new Professor({ name }); // Cria uma nova instância de Professor
  await professor.save(); // Salva no banco de dados
  res.json({ message: 'Professor cadastrado com sucesso' }); // Retorna uma mensagem de sucesso
});

// Rota POST para registrar disciplinas
app.post('/register/discipline', async (req, res) => {
  const { name } = req.body;
  const discipline = new Discipline({ name });
  await discipline.save();
  res.json({ message: 'Disciplina cadastrada com sucesso' });
});

// Rota POST para registrar turmas
app.post('/register/classroom', async (req, res) => {
  const { name } = req.body;
  const classroom = new Classroom({ name });
  await classroom.save();
  res.json({ message: 'Turma cadastrada com sucesso' });
});

// Rota POST para registrar horários
app.post('/register/horario', async (req, res) => {
  const { professor, discipline, classroom, startDate, endDate, numberOfDays } = req.body;
  
  // Verifica se o professor já está agendado para alguma aula durante as datas fornecidas
  const existingHorario = await Horario.findOne({
    professor: professor,
    startDate: { $lte: new Date(endDate) },
    endDate: { $gte: new Date(startDate) },
  });

  if (existingHorario) {
    return res.status(400).json({ message: 'O professor já está agendado para outra aula durante este período.' });
  }

  // Se o professor não estiver agendado, cria o novo horário
  const newHorario = new Horario({
    professor,
    discipline,
    classroom,
    startDate,
    endDate,
    numberOfDays,
  });

  try {
    await newHorario.save();
    res.json({ message: 'Horário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar o horário.' });
  }
});

// Rota GET para obter professores
app.get('/professors', async (req, res) => {
  const professors = await Professor.find({}, 'name');
  res.json(professors);
});

// Rota GET para obter disciplinas
app.get('/disciplines', async (req, res) => {
  const disciplines = await Discipline.find({}, 'name');
  res.json(disciplines);
});

// Rota GET para obter turmas
app.get('/classrooms', async (req, res) => {
  const classrooms = await Classroom.find({}, 'name');
  res.json(classrooms);
});

// Configuração do servidor para ouvir na porta 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
