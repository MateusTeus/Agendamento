import React, { useState } from 'react';
import style from './AgendaAnual.css';

// Componente funcional AgendaAnual
function AgendaAnual() {
  // Crie um array com os nomes dos meses.
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  // Estado para controlar o mês e ano selecionados.
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Função para obter os dias do mês selecionado.
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Array contendo os dias do mês selecionado
  const daysInMonth = selectedMonth
    ? getDaysInMonth(months.indexOf(selectedMonth), selectedYear)
    : [];

  // Renderização do componente
  return (
    <div>
      <h1>Agenda Anual</h1>
      <div>
        {/* Dropdown para selecionar o mês */}
        <label>Selecione um Mês:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Selecione um Mês</option>
          {/* Mapeamento dos meses para as opções do dropdown */}
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        {/* Input para inserir o ano */}
        <label>Ano:</label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      {/* Se um mês estiver selecionado, exibe o calendário */}
      {selectedMonth && (
        <div>
          {/* Cabeçalho do calendário com o mês e o ano selecionados */}
          <h2>
            {selectedMonth} {selectedYear}
          </h2>
          {/* Grid para exibir os dias do mês selecionado */}
          <div className="calendar-grid">
            {/* Mapeamento dos dias do mês para divs no calendário */}
            {daysInMonth.map((day, index) => (
              <div key={index} className="calendar-day">
                {day.getDate()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Exporta o componente AgendaAnual
export default AgendaAnual;
