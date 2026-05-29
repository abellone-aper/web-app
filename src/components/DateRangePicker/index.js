import { useState } from 'react';
import './DateRangePicker.css';
import PrimaryButton from '../Buttons/PrimaryButton';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DOW = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

function nightsBetween(a, b) { return Math.round((b - a) / 86400000); }

export default function DateRangePicker({ startDate, endDate, onConfirm, onClose }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [viewYear, setViewYear] = useState(startDate ? startDate.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(startDate ? startDate.getMonth() : today.getMonth());
  const [selStart, setSelStart] = useState(startDate ?? null);
  const [selEnd, setSelEnd] = useState(endDate ?? null);

  function handleDayClick(day) {
    const clicked = new Date(viewYear, viewMonth, day); clicked.setHours(0,0,0,0);
    if (!selStart || selEnd || clicked <= selStart) {
      setSelStart(clicked); setSelEnd(null);
    } else {
      setSelEnd(clicked);
    }
  }

  function prevMonth() {
    if (viewMonth > 0) setViewMonth(m => m - 1);
    else { setViewMonth(11); setViewYear(y => y - 1); }
  }
  function nextMonth() {
    if (viewMonth < 11) setViewMonth(m => m + 1);
    else { setViewMonth(0); setViewYear(y => y + 1); }
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days = [];
  for (let i = 0; i < offset; i++) days.push(<span key={`e${i}`} className="drp-day drp-day--empty"></span>);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateD = new Date(viewYear, viewMonth, d); dateD.setHours(0,0,0,0);
    const disabled = dateD < today;
    let cls = 'drp-day';
    if (disabled) cls += ' drp-day--disabled';
    else if (selStart && dateD.getTime() === selStart.getTime()) cls += ' drp-day--start';
    else if (selEnd && dateD.getTime() === selEnd.getTime()) cls += ' drp-day--end';
    else if (selStart && selEnd && dateD > selStart && dateD < selEnd) cls += ' drp-day--in-range';
    days.push(<button key={d} type="button" className={cls} disabled={disabled} onClick={() => handleDayClick(d)}>{d}</button>);
  }

  const nights = selStart && selEnd ? nightsBetween(selStart, selEnd) : null;

  return (
    <div className="drp" onClick={e => e.stopPropagation()}>
      <div className="drp-header">
        <button className="drp-nav" type="button" onClick={prevMonth}><i className="ph ph-caret-left"></i></button>
        <span className="drp-month">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="drp-nav" type="button" onClick={nextMonth}><i className="ph ph-caret-right"></i></button>
      </div>
      <div className="drp-grid">
        {DOW.map(d => <span key={d} className="drp-dow">{d}</span>)}
      </div>
      <div className="drp-days">{days}</div>
      <div className="drp-footer">
        <span className="drp-nights">
          {nights ? `${nights} noches seleccionadas` : 'Seleccioná la fecha de salida'}
        </span>
        <PrimaryButton type="button" onClick={() => { if (selStart && selEnd) onConfirm(selStart, selEnd, nights); onClose(); }}>
          Confirmar
        </PrimaryButton>
      </div>
    </div>
  );
}
