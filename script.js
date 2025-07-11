document.addEventListener("DOMContentLoaded", () => {
    const calendarBody = document.querySelector("#calendarBody");
    const prevButton = document.querySelector("#prevBtn");
    const nextButton = document.querySelector("#nextBtn");
    const titleElement = document.querySelector("#monthTitle");
  
    let currentDate = new Date();
  
    updateCalendar(currentDate);
  
    function updateCalendar(date) {
      clearCalendar();
  
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startDayIndex = new Date(year, month, 1).getDay();
  
      const today = new Date();
      const isTodayHighlighted = (year === today.getFullYear()) && (month === today.getMonth());
  
      const rows = [];
      let rowCells = [];
  
      for (let i = 0; i < startDayIndex; i++) {
        rowCells.push("<td class='other-month'></td>");
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        let cellClass = '';
        if ((isTodayHighlighted && i === today.getDate())) {
          cellClass += 'today ';
        } else if (new Date(year, month, i) >= today) {
          cellClass += 'future-day ';
        }
  
        // Метки найденных и потерянных вещей
        if (i === 2) {
          cellClass += 'lost-marker ';
        } else if (i === 12) {
          cellClass += 'found-marker ';
        }
  
        rowCells.push(`<td class="${cellClass.trim()}">${i}</td>`);
  
        if (rowCells.length === 7 || i === daysInMonth) {
          rows.push(rowCells.join(''));
          rowCells = [];
        }
      }
  
      while (rowCells.length > 0 && rowCells.length < 7) {
        rowCells.push("<td class='other-month'></td>");
      }
  
      if (rowCells.length > 0) {
        rows.push(rowCells.join(''));
      }
  
      calendarBody.innerHTML = `<tr>${rows.join("</tr><tr>")}</tr>`;
  
      titleElement.textContent = `${new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(date)} ${year}`;
    }
  
    function clearCalendar() {
      calendarBody.innerHTML = "";
    }
  
    prevButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar(currentDate);
    });
  
    nextButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar(currentDate);
    });
  });