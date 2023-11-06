import React, { useState } from 'react';

function HorarioCadastro({ professors, disciplines, classrooms }) {
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateFormatted, setStartDateFormatted] = useState('');
  const [endDateFormatted, setEndDateFormatted] = useState('');

  const isWeekend = (date) => {
    const day = new Date(date).getDay(); // 0 (Sunday) to 6 (Saturday)
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const calculateEndDate = (start, daysToAdd) => {
    let end = new Date(start);
    while (daysToAdd > 0) {
      end.setDate(end.getDate() + 1);
      if (!isWeekend(end)) {
        daysToAdd -= 1;
      }
    }
    return end;
  };

  const handleHorarioSubmit = async (e) => {
    e.preventDefault();

    if (!numberOfDays) {
      return;
    }

    const daysToAdd = parseInt(numberOfDays, 10);

    const start = new Date(startDate);
    const end = calculateEndDate(start, daysToAdd);

    const startDateFormatted = start.toLocaleDateString();
    const endDateFormatted = end.toLocaleDateString();

    setStartDate(start.toISOString().split('T')[0]); // Ajuste para formato YYYY-MM-DD
    setEndDate(end.toISOString().split('T')[0]); // Ajuste para formato YYYY-MM-DD
    setStartDateFormatted(startDateFormatted);
    setEndDateFormatted(endDateFormatted);
  };

  const registrarHorarioNoBancoDeDados = async () => {
    if (!selectedProfessor || !selectedDiscipline || !selectedClassroom || !numberOfDays) {
      alert('Preencha todos os campos antes de registrar.');
      return;
    }

    const response = await fetch('http://localhost:5000/register/horario', {
      method: 'POST',
      body: JSON.stringify({
        professor: selectedProfessor,
        discipline: selectedDiscipline,
        classroom: selectedClassroom,
        startDate: startDate, // Mantém o formato YYYY-MM-DD
        endDate: endDate, // Mantém o formato YYYY-MM-DD
        numberOfDays: numberOfDays,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Horário cadastrado com sucesso');
      setSelectedProfessor('');
      setSelectedDiscipline('');
      setSelectedClassroom('');
      setNumberOfDays('');
      setStartDate('');
      setEndDate('');
      setStartDateFormatted('');
      setEndDateFormatted('');
    } else {
      alert('Erro ao cadastrar o horário. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Horário</h2>
      <form onSubmit={handleHorarioSubmit}>
        <div>
          <label>Professor:</label>
          <select
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
          >
            <option value="">Selecione um Professor</option>
            {professors.map((professor) => (
              <option key={professor._id} value={professor.name}>
                {professor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Disciplina:</label>
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            <option value="">Selecione uma Disciplina</option>
            {disciplines.map((discipline) => (
              <option key={discipline._id} value={discipline.name}>
                {discipline.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Turma:</label>
          <select
            value={selectedClassroom}
            onChange={(e) => setSelectedClassroom(e.target.value)}
          >
            <option value="">Selecione uma Turma</option>
            {classrooms.map((classroom) => (
              <option key={classroom._id} value={classroom.name}>
                {classroom.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={startDate} // Mantém o formato YYYY-MM-DD
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Quantidade de Dias:</label>
          <input
            type="number"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </div>
        {startDateFormatted && endDateFormatted && (
          <div>
            <p>Data de Início: {startDateFormatted}</p>
            <p>Data de Fim: {endDateFormatted}</p>
          </div>
        )}
        <button type="submit">Cadastrar Horário</button>
        <button type="button" onClick={registrarHorarioNoBancoDeDados}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default HorarioCadastro;
