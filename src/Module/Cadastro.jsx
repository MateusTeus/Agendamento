import React, { useState, useEffect } from 'react';

function Cadastro() {

  const [name, setName] = useState('');

  const [discipline, setDiscipline] = useState('');
  const [subject, setSubject] = useState('');
  const [classroom, setClassroom] = useState('');
  const [professors, setProfessors] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const handleProfessorSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('Por favor, preencha o nome do professor.');
      return;
    }
    const response = await fetch('http://localhost:5000/register/professor', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (result) {
      alert('Professor cadastrado com sucesso');
      setName('');
    }
  };

  const handleDisciplineSubmit = async (e) => {
    if (!discipline) {
      alert('Por favor, preencha o nome da disciplina.');
      return;
    }
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register/discipline', {
      method: 'POST',
      body: JSON.stringify({ name: discipline }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (result) {
      alert('Disciplina cadastrada com sucesso');
      setDiscipline('');
    }
  };

  const handleClassroomSubmit = async (e) => {
    e.preventDefault();
    if (!classroom) {
      alert('Por favor, preencha o nome da turma.');
      return;
    }
    const response = await fetch('http://localhost:5000/register/classroom', {
      method: 'POST',
      body: JSON.stringify({ name: classroom }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (result) {
      alert('Turma cadastrada com sucesso');
      setClassroom('');
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/professors')
      .then((response) => response.json())
      .then((data) => setProfessors(data));
    fetch('http://localhost:5000/disciplines')
      .then((response) => response.json())
      .then((data) => setDisciplines(data));
    fetch('http://localhost:5000/classrooms')
      .then((response) => response.json())
      .then((data) => setClassrooms(data));
  }, []);


  return (
    <div>
      <h1>Cadastro de Professor, Disciplina e Turma</h1>


      <div>
        <h2>Cadastro de Professor</h2>
        <form onSubmit={handleProfessorSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Cadastrar Professor</button>
        </form>
      </div>


      <div>
        <h2>Cadastro de Disciplina</h2>
        <form onSubmit={handleDisciplineSubmit}>
          <input
            type="text"
            placeholder="Nome da Disciplina"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />
          <button type="submit">Cadastrar Disciplina</button>
        </form>
      </div>

   
      <div>
        <h2>Cadastro de Turma</h2>
        <form onSubmit={handleClassroomSubmit}>
          <input
            type="text"
            placeholder="Nome da Turma"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
          />
          <button type="submit">Cadastrar Turma</button>
        </form>
      </div>
    </div>
  );
}


export default Cadastro;