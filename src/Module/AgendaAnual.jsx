import React, { useState } from 'react';
import style from './AgendaAnual.css';

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

  // Estado para controlar o mês selecionado.
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

  const daysInMonth = selectedMonth
    ? getDaysInMonth(months.indexOf(selectedMonth), selectedYear)
    : [];

  return (
    <div>
      <h1>Agenda Anual</h1>
      <div>
        <label>Selecione um Mês:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Selecione um Mês</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <label>Ano:</label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      {selectedMonth && (
        <div>
          <h2>
            {selectedMonth} {selectedYear}
          </h2>
          <div className="calendar-grid">
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

export default AgendaAnual;
