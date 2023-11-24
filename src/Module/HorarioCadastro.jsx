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
  const [selectedTurno, setSelectedTurno] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [selectedHoliday, setSelectedHoliday] = useState('');
  const [holidays, setHolidays] = useState([
    '2023-01-01', // Ano-Novo
    '2023-01-01', // Dia da Confraternização Universal (1º de janeiro) FERIADO
    '2023-02-20', // Segunda-feira de Carnaval PONTO FACULTATIVO
    '2023-02-21', // Carnaval PONTO FACULTATIVO
    '2023-02-22', // Quarta-feira de Cinzas (Ponto Facultativo até as 14h) PONTO FACULTATIVO
    '2023-03-08', // Dia Internacional da Mulher | 8 de Março
    '2023-03-20', // Início do Outono
    '2023-04-02', // Domingo de Ramos
    '2023-04-06', // Quinta-feira Santa
    '2023-04-07', // Sexta-feira Santa FERIADO
    '2023-04-08', // Sábado de Aleluia
    '2023-04-09', // Páscoa
    '2023-04-19', // Dia dos Povos Indígenas (Dia do Índio)
    '2023-04-21', // Tiradentes FERIADO
    '2023-05-01', // Dia do Trabalho FERIADO
    '2023-05-14', // Dia das Mães
    '2023-06-08', // Corpus Christi PONTO FACULTATIVO
    '2023-06-12', // Dia dos Namorados
    '2023-06-21', // Início do Inverno (Solstício de Inverno)
    '2023-06-24', // Dia de São João
    '2023-07-09', // Dia da Revolução Constitucionalista
    '2023-07-20', // Dia do Amigo e Internacional da Amizade
    '2023-08-13', // Dia dos Pais
    '2023-08-22', // Dia do Folclore
    '2023-08-25', // Dia do Soldado
    '2023-09-07', // Dia da Independência do Brasil FERIADO
    '2023-09-21', // Dia da Árvore
    '2023-09-23', // Início da Primavera
    '2023-10-12', // Dia das Crianças
    '2023-10-12', // Nossa Senhora Aparecida FERIADO
    '2023-10-14', // 2º Eclipse Solar de 2023 - Eclipse Anular (visível no norte do Brasil)
    '2023-10-15', // Dia do Professor
    '2023-10-28', // Dia do Servidor Público PONTO FACULTATIVO
    '2023-10-28', // 2º Eclipse Lunar de 2023 - Eclipse Parcial (não visível no Brasil)
    '2023-10-31', // Dia das Bruxas - Halloween
    '2023-10-31', // Dia do Saci
    '2023-11-01', // Dia de Todos os Santos
    '2023-11-02', // Finados FERIADO
    '2023-11-15', // Proclamação da República FERIADO
    '2023-11-19', // Dia da Bandeira
    '2023-11-20', // Dia Nacional da Consciência Negra
    '2023-12-22', // Início do Verão - Solstício de Verão
    '2023-12-24', // Véspera de Natal
    '2023-12-25', // Natal FERIADO
    '2023-12-31', // Véspera de Ano-Novo
  
    // Feriados de 2024
    '2024-01-01', // Confraternização Universal (segunda-feira)
    '2024-03-29', // Sexta-Feira Santa (sexta-feira)
    '2024-04-21', // Tiradentes (domingo)
    '2024-05-01', // Dia do Trabalho (quarta-feira)
    '2024-09-07', // Independência do Brasil (sábado)
    '2024-10-12', // Dia de Nossa Sra. Aparecida (sábado)
    '2024-11-02', // Finados (sábado)
    '2024-11-15', // Proclamação da República (sexta-feira)
    '2024-12-25', // Natal (quarta-feira)
  
    // Pontos Facultativos de 2024
    '2024-02-12', // Carnaval (segunda-feira)
    '2024-02-13', // Carnaval (terça-feira)
    '2024-02-14', // Quarta-Feira de Cinzas (quarta-feira)
    '2024-05-30', // Corpus Christi (quinta-feira)
    '2024-10-28', // Dia do Servidor Público (segunda-feira)
  ]);


  const addHoliday = () => {
    if (!holidayDate) {
      alert('Por favor, insira uma data de feriado válida.');
      return;
    }

    if (holidays.includes(holidayDate)) {
      alert('Essa data de feriado já foi adicionada.');
      return;
    }

    setHolidays([...holidays, holidayDate]);
    alert('Essa data de feriado foi adiciona com sucesso.');
    setHolidayDate('');
  };

   const isHoliday = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return holidays.includes(formattedDate);
  };
  const removeHoliday = () => {
    if (!selectedHoliday) {
      alert('Selecione um feriado para remover.');
      return;
    }

    const updatedHolidays = holidays.filter((holiday) => holiday !== selectedHoliday);
    setHolidays(updatedHolidays);
    setSelectedHoliday('');
  };
  const isWeekendOrHoliday = (date) => {
    const day = new Date(date).getDay(); 
    return day === 0 || day === 6 || isHoliday(date);
  };

  const calculateEndDate = (start, daysToAdd, selectedTurno) => {
    let end = new Date(start);

    if (selectedTurno === 'manha') {
      end.setHours(7, 0, 0);
    } else if (selectedTurno === 'tarde') {
      end.setHours(12, 0, 0);
    } else if (selectedTurno === 'noite') {
      end.setHours(18, 0, 0);
    }

    let daysAdded = 0;

    while (daysAdded < daysToAdd) {
      end.setDate(end.getDate() + 1);

      if (!isWeekendOrHoliday(end)) {
        daysAdded += 1;
      }
    }

    while (isWeekendOrHoliday(end)) {
      end.setDate(end.getDate() + 1);
    }

    const adjustedEnd = new Date(end.getTime() + end.getTimezoneOffset() * 60000);

    return adjustedEnd;
  };

  const handleHorarioSubmit = async (e) => {
    e.preventDefault();

    if (!startDate) {
      alert('Preencha a data de início antes de cadastrar o horário.');
      return;
    }

    if (!numberOfDays) {
      alert('Preencha a quantidade de dias antes de cadastrar o horário.');
      return;
    }
    

    const daysToAdd = parseInt(numberOfDays, 10);
    const start = new Date(startDate);

    const end = calculateEndDate(start, daysToAdd, selectedTurno);

    start.setDate(start.getDate() + 1);

    const startDateDisplay = start.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    start.setDate(start.getDate() - 1);

    const endDateDisplay = end.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    setStartDateFormatted(startDateDisplay);
    setEndDateFormatted(endDateDisplay);

    setSelectedTurno(selectedTurno);
  };
  

  const registrarHorarioNoBancoDeDados = async () => {
    if (!selectedProfessor || !selectedDiscipline || !selectedClassroom || !numberOfDays || !selectedTurno) {
      alert('Preencha todos os campos antes de registrar.');
      return;
    }

    const response = await fetch('http://localhost:5000/register/horario', {
      method: 'POST',
      body: JSON.stringify({
        professor: selectedProfessor,
        discipline: selectedDiscipline,
        classroom: selectedClassroom,
        startDate: startDate,
        endDate: endDate,
        numberOfDays: numberOfDays,
        turno: selectedTurno,
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
      setSelectedTurno('');
    } else {
      alert('Erro ao cadastrar o horário. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Horário</h2>
      <form onSubmit={handleHorarioSubmit}>
      <p>Selecione um feriado para excluir</p>
<select
  value={selectedHoliday}
  onChange={(e) => setSelectedHoliday(e.target.value)}
>
  <option value="">Selecione um feriado</option>
  {holidays.map((holiday, index) => (
    <option key={`${holiday}-${index}`} value={holiday}>
      {holiday}
    </option>
  ))}
</select>
<button type="button" onClick={removeHoliday}>
  Remover Feriado
</button>
        <div>
          <p>Adicione um feriado na sua agenda</p>
          <label>Data de Feriado:</label>
          <input
            type="date"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
          />
          <button type="button" onClick={addHoliday}>
            Adicionar Feriado
          </button>
      </div>
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
        <div>
      <label>Turno:</label>
      <select
        value={selectedTurno}
        onChange={(e) => setSelectedTurno(e.target.value)}
      >
        <option value="">Selecione o Turno</option>
        <option value="manha">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
      </select>
    </div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={startDate}
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
        <button type="submit">Verificar Horario</button>
        <button type="button" onClick={registrarHorarioNoBancoDeDados}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default HorarioCadastro;
