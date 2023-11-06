const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@cluster0.qanhdhl.mongodb.net/?retryWrites=true&w=majority', {
  dbName: 'agendamento',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error(err);
});

const professorSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const disciplineSchema = new mongoose.Schema({
  name: String,
});

const classroomSchema = new mongoose.Schema({
  name: String,
});

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

app.post('/register/professor', async (req, res) => {
  const { name, email } = req.body;
  const professor = new Professor({ name, email });
  await professor.save();
  res.json({ message: 'Professor cadastrado com sucesso' });
});

app.post('/register/discipline', async (req, res) => {
  const { name } = req.body;
  const discipline = new Discipline({ name });
  await discipline.save();
  res.json({ message: 'Disciplina cadastrada com sucesso' });
});

app.post('/register/classroom', async (req, res) => {
  const { name } = req.body;
  const classroom = new Classroom({ name });
  await classroom.save();
  res.json({ message: 'Turma cadastrada com sucesso' });
});

app.post('/register/horario', async (req, res) => {
    const { professor, discipline, classroom, startDate, endDate, numberOfDays } = req.body;
  
    // Verifique se o professor já está agendado para alguma aula durante as datas fornecidas
    const existingHorario = await Horario.findOne({
      professor: professor,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
    });
  
    if (existingHorario) {
      return res.status(400).json({ message: 'O professor já está agendado para outra aula durante este período.' });
    }
  
    // Se o professor não estiver agendado, crie o novo horário
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
app.get('/professors', async (req, res) => {
  const professors = await Professor.find({}, 'name email');
  res.json(professors);
});

app.get('/disciplines', async (req, res) => {
  const disciplines = await Discipline.find({}, 'name');
  res.json(disciplines);
});

app.get('/classrooms', async (req, res) => {
  const classrooms = await Classroom.find({}, 'name');
  res.json(classrooms);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
