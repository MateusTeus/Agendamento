import React, { useState, useEffect } from 'react';
import Cadastro from '../src/Module/Cadastro';
import HorarioCadastro from '../src/Module/HorarioCadastro';
import AgendaAnual from '../src/Module/AgendaAnual';
import './Module/style.css';


const App = () => {
  const [professors, setProfessors] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [showHorarios, setShowHorarios] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorsResponse = await fetch('http://localhost:5000/professors');
        const disciplinesResponse = await fetch('http://localhost:5000/disciplines');
        const classroomsResponse = await fetch('http://localhost:5000/classrooms');
        const horariosResponse = await fetch('http://localhost:5000/horarios');

        const professorsData = await professorsResponse.json();
        const disciplinesData = await disciplinesResponse.json();
        const classroomsData = await classroomsResponse.json();
        const horariosData = await horariosResponse.json();

        setProfessors(professorsData);
        setDisciplines(disciplinesData);
        setClassrooms(classroomsData);
        setHorarios(horariosData);
        setShowHorarios(horariosData.length > 0); 
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AgendaAnual />
      <button
  className={`show-hide-button ${showHorarios ? 'showHorarios' : ''}`}
  onClick={() => setShowHorarios(!showHorarios)}
>
  Mostrar Horários
  <span className="arrow-down">↓</span>
</button>

      {showHorarios && (
        <div>
          <h2>Horários Cadastrados</h2>
          <ul className={`mostrar`}>
            {horarios.map((horario) => (
              <li key={horario._id}>
                {`${horario.professor} - ${horario.discipline} - ${horario.classroom} - ${horario.startDate} - ${horario.endDate} - ${horario.turno} - ${horario.turno === 'manha' ? '07:00 até 11:55' : (horario.turno === 'tarde' ? '13:30 até 15:30' : '18:30 até 22:30')}`}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Cadastro />



      <HorarioCadastro
        professors={professors}
        disciplines={disciplines}
        classrooms={classrooms}
      />

      
    </div>
  );
};

export default App;
