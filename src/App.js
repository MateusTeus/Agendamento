import React, { useState, useEffect } from 'react';
import Teste from '../src/Module/Teste';
import HorarioCadastro from '../src/Module/HorarioCadastro';
import AgendaAnual from '../src/Module/AgendaAnual'
import './Module/style.css'; 

function App() {
  const [professors, setProfessors] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    // Buscar os dados dos professores, disciplinas e turmas da sua API ou banco de dados.
    // Por exemplo, usando fetch() ou axios.
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
      {/* Componente de Cadastro de Professor, Disciplina e Turma */}
      <Teste />

      {/* Componente de Cadastro de Horário */}
      <HorarioCadastro
        professors={professors}
        disciplines={disciplines}
        classrooms={classrooms}
      />

      <AgendaAnual/>
    </div>
  );
}

export default App;
