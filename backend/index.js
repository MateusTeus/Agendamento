const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const mongooseUri = ''
mongoose.connect(mongooseUri, {
  dbName: 'agendamento',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error(err);
});

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
  turno: String,
});

const Professor = mongoose.model('Professor', professorSchema);
const Discipline = mongoose.model('Discipline', disciplineSchema);
const Classroom = mongoose.model('Classroom', classroomSchema);
const Horario = mongoose.model('Horario', horarioSchema);

app.post('/register/professor', async (req, res) => {
  const { name } = req.body;
  const professor = new Professor({ name });
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
  const { professor, discipline, classroom, startDate, endDate, numberOfDays, turno } = req.body;

  const existingHorario = await Horario.findOne({
    professor: professor,
    turno: turno,
    $or: [
      {
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) },
      },
      {
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) },
      },
    ],
  });

  if (existingHorario) {
    return res.status(400).json({ message: 'O professor já está agendado para outra aula durante este período.' });
  }

  const newHorario = new Horario({
    professor,
    discipline,
    classroom,
    startDate,
    endDate,
    numberOfDays,
    turno,
  });

  try {
    await newHorario.save();
    res.json({ message: 'Horário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar o horário.' });
  }
});

app.get('/professors', async (req, res) => {
  const professors = await Professor.find({}, 'name');
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
app.get('/horarios', async (req, res) => {
  try {
    const horarios = await Horario.find({}, 'professor discipline classroom startDate endDate numberOfDays turno');
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar horários.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});