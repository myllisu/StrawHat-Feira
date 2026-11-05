import React, { useState } from 'react';
import { AppState, MonitoredItem, TimeWindow } from '../types';
import { ShieldAlert, Plus, Trash2, Calendar, ToggleLeft, ToggleRight, Sparkles, Clock, Edit2, Check, AlertCircle, Play } from 'lucide-react';
import { formatMinutesToHoursMin, parseHoursMinutesToTotalMinutes, isScheduleWindowActive, formatDaysList } from '../utils/timeUtils';

interface LimitsScreenProps {
  state: AppState;
  onAddItem: (item: Omit<MonitoredItem, 'id'>) => void;
  onUpdateItem: (item: MonitoredItem) => void;
  onDeleteItem: (id: string) => void;
  onApplyPresetMode: (mode: 'routine' | 'weekend' | 'everyday') => void;
  onRemoveAllLimitsConfirmed: () => void;
}

export const LimitsScreen: React.FC<LimitsScreenProps> = ({
  state,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onApplyPresetMode,
  onRemoveAllLimitsConfirmed,
}) => {
  const [filter, setFilter] = useState<'all' | 'active_today' | 'scheduled' | 'weekdays' | 'weekends'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MonitoredItem | null>(null);
  const [scheduleModalItem, setScheduleModalItem] = useState<MonitoredItem | null>(null);
  const [editingWindow, setEditingWindow] = useState<TimeWindow | null>(null);
  const [showResetWarningModal, setShowResetWarningModal] = useState(false);

  // Scheduled Lock simulation test modal
  const [simulatedScheduleLock, setSimulatedScheduleLock] = useState<{ item: MonitoredItem; window: TimeWindow } | null>(null);

  // New item form state (hours and minutes)
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState<'app' | 'site'>('app');
  const [itemIdentifier, setItemIdentifier] = useState('');
  
  const [weekdayHours, setWeekdayHours] = useState<number>(0);
  const [weekdayMinutes, setWeekdayMinutes] = useState<number>(45);

  const [weekendHours, setWeekendHours] = useState<number>(1);
  const [weekendMinutes, setWeekendMinutes] = useState<number>(30);

  // Schedule Window form state
  const [windowName, setWindowName] = useState('Bloqueio Programado');
  const [windowStartTime, setWindowStartTime] = useState('22:00');
  const [windowEndTime, setWindowEndTime] = useState('07:00');
  const [windowDaysActive, setWindowDaysActive] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const daysOfWeek = [
    { label: 'Dom', index: 0 },
    { label: 'Seg', index: 1 },
    { label: 'Ter', index: 2 },
    { label: 'Qua', index: 3 },
    { label: 'Qui', index: 4 },
    { label: 'Sex', index: 5 },
    { label: 'Sáb', index: 6 },
  ];
  const todayIndex = new Date().getDay();

  const filteredItems = state.monitoredItems.filter((item) => {
    if (filter === 'active_today') return item.active && item.daysActive.includes(todayIndex);
    if (filter === 'scheduled') return item.active && item.scheduleEnabled && (item.timeWindows?.length || 0) > 0;
    if (filter === 'weekdays') return item.active && item.daysActive.some((d) => d >= 1 && d <= 5);
    if (filter === 'weekends') return item.active && item.daysActive.some((d) => d === 0 || d === 6);
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !itemIdentifier) return;

    const weekdayTotal = parseHoursMinutesToTotalMinutes(weekdayHours, weekdayMinutes);
    const weekendTotal = parseHoursMinutesToTotalMinutes(weekendHours, weekendMinutes);

    if (weekdayTotal <= 0 || weekendTotal <= 0) {
      alert('Por favor, informe uma duração válida maior que 0 minutos.');
      return;
    }

    onAddItem({
      name: itemName,
      type: itemType,
      identifier: itemIdentifier,
      dailyLimitMinutes: weekdayTotal,
      timeUsedMinutesToday: 0,
      active: true,
      weekdayLimit: weekdayTotal,
      weekendLimit: weekendTotal,
      daysActive: [0, 1, 2, 3, 4, 5, 6],
      scheduleEnabled: false,
      timeWindows: [],
    });

    setItemName('');
    setItemIdentifier('');
    setWeekdayHours(0);
    setWeekdayMinutes(45);
    setWeekendHours(1);
    setWeekendMinutes(30);
    setShowAddModal(false);
  };

  const handleOpenEdit = (item: MonitoredItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemType(item.type);
    setItemIdentifier(item.identifier);
    setWeekdayHours(Math.floor(item.weekdayLimit / 60));
    setWeekdayMinutes(item.weekdayLimit % 60);
    setWeekendHours(Math.floor(item.weekendLimit / 60));
    setWeekendMinutes(item.weekendLimit % 60);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !itemName || !itemIdentifier) return;

    const weekdayTotal = parseHoursMinutesToTotalMinutes(weekdayHours, weekdayMinutes);
    const weekendTotal = parseHoursMinutesToTotalMinutes(weekendHours, weekendMinutes);

    if (weekdayTotal <= 0 || weekendTotal <= 0) {
      alert('Por favor, informe uma duração válida maior que 0 minutos.');
      return;
    }

    const updated: MonitoredItem = {
      ...editingItem,
      name: itemName,
      type: itemType,
      identifier: itemIdentifier,
      weekdayLimit: weekdayTotal,
      weekendLimit: weekendTotal,
      dailyLimitMinutes: (todayIndex === 0 || todayIndex === 6) ? weekendTotal : weekdayTotal,
    };

    onUpdateItem(updated);
    setEditingItem(null);
  };

  // Schedule Window Actions
  const handleOpenAddWindow = (item: MonitoredItem) => {
    setScheduleModalItem(item);
    setEditingWindow(null);
    setWindowName('Bloqueio Noturno');
    setWindowStartTime('22:00');
    setWindowEndTime('07:00');
    setWindowDaysActive([0, 1, 2, 3, 4, 5, 6]);
  };

  const handleOpenEditWindow = (item: MonitoredItem, tw: TimeWindow) => {
    setScheduleModalItem(item);
    setEditingWindow(tw);
    setWindowName(tw.name || 'Faixa de Bloqueio');
    setWindowStartTime(tw.startTime);
    setWindowEndTime(tw.endTime);
    setWindowDaysActive(tw.daysActive || [0, 1, 2, 3, 4, 5, 6]);
  };

  const handleSaveWindow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModalItem) return;

    const newWindow: TimeWindow = {
      id: editingWindow ? editingWindow.id : `tw_${Date.now()}`,
      name: windowName || 'Faixa de Bloqueio',
      startTime: windowStartTime,
      endTime: windowEndTime,
      daysActive: windowDaysActive,
      active: editingWindow ? editingWindow.active : true,
    };

    const currentWindows = scheduleModalItem.timeWindows || [];
    const updatedWindows = editingWindow
      ? currentWindows.map((w) => (w.id === editingWindow.id ? newWindow : w))
      : [...currentWindows, newWindow];

    onUpdateItem({
      ...scheduleModalItem,
      scheduleEnabled: true,
      timeWindows: updatedWindows,
    });

    setScheduleModalItem(null);
    setEditingWindow(null);
  };

  const handleDeleteWindow = (item: MonitoredItem, windowId: string) => {
    const updatedWindows = (item.timeWindows || []).filter((w) => w.id !== windowId);
    onUpdateItem({
      ...item,
      timeWindows: updatedWindows,
    });
  };

  const handleToggleWindowActive = (item: MonitoredItem, windowId: string) => {
    const updatedWindows = (item.timeWindows || []).map((w) =>
      w.id === windowId ? { ...w, active: !w.active } : w
    );
    onUpdateItem({
      ...item,
      timeWindows: updatedWindows,
    });
  };

  const toggleDaySelection = (dayIdx: number) => {
    setWindowDaysActive((prev) =>
      prev.includes(dayIdx) ? prev.filter((d) => d !== dayIdx) : [...prev, dayIdx].sort((a, b) => a - b)
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Quick Action Buttons */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert color="var(--primary-strawberry)" size={24} />
            Gerenciamento de Limites e Bloqueio por Horário
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Configure durações em horas e minutos e defina horários de bloqueio programado independentes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Adicionar Limite
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowResetWarningModal(true)}
            style={{ fontSize: '0.82rem' }}
          >
            Desativar Todos
          </button>
        </div>
      </div>

      {/* Preset Modes */}
      <div className="card" style={{ background: 'rgba(254, 235, 200, 0.25)', border: '1px solid var(--card-border)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={18} color="#dd6b20" /> Modos de Configuração Rápida
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => onApplyPresetMode('routine')}
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '0.75rem' }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>Modo Rotina</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Foco de Seg. a Sex. e Fim de semana livre</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onApplyPresetMode('weekend')}
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '0.75rem' }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>Mais Tempo no Fim de Semana</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>+50% no sábado e domingo</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onApplyPresetMode('everyday')}
            style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '0.75rem' }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>Todos os Dias Igual</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Aplica limite uniforme a semana toda</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Monitored Items List */}
      <div className="card">
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
          >
            Todos ({state.monitoredItems.length})
          </button>
          <button
            className={`btn ${filter === 'scheduled' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('scheduled')}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
          >
            Com Horários Programados
          </button>
          <button
            className={`btn ${filter === 'active_today' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('active_today')}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
          >
            Ativos Hoje
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredItems.map((item) => {
            const isOver = item.timeUsedMinutesToday >= item.dailyLimitMinutes;
            const windows = item.timeWindows || [];
            const hasActiveScheduleNow = windows.some(
              (w) => w.active && item.scheduleEnabled && isScheduleWindowActive(w.startTime, w.endTime, w.daysActive)
            );

            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--card-bg)',
                  border: `1px solid ${hasActiveScheduleNow ? '#e53e3e' : isOver ? '#dd6b20' : 'var(--card-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                {/* Item Header & Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-sm)',
                        background: item.type === 'app' ? 'rgba(49, 130, 206, 0.15)' : 'rgba(56, 161, 105, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                      }}
                    >
                      {item.type === 'app' ? '📱' : '🌐'}
                    </div>

                    <div>
                      <h4 style={{ fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {item.name}
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                          ({item.identifier})
                        </span>
                        {hasActiveScheduleNow && (
                          <span style={{ fontSize: '0.72rem', background: '#fed7d7', color: '#e53e3e', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>
                            🚫 BLOQUEIO POR HORÁRIO ATIVO AGORA
                          </span>
                        )}
                      </h4>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Uso Hoje: <strong>{formatMinutesToHoursMin(item.timeUsedMinutesToday)}</strong> / Limite:{' '}
                        <strong>{formatMinutesToHoursMin(item.dailyLimitMinutes)}</strong> • (Úteis:{' '}
                        {formatMinutesToHoursMin(item.weekdayLimit)} | Fim de Sem.: {formatMinutesToHoursMin(item.weekendLimit)})
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleOpenEdit(item)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', gap: '0.3rem' }}
                    >
                      <Edit2 size={15} /> Editar
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => onUpdateItem({ ...item, active: !item.active })}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', gap: '0.3rem' }}
                    >
                      {item.active ? (
                        <ToggleRight size={20} color="var(--foliage-green)" />
                      ) : (
                        <ToggleLeft size={20} color="var(--text-secondary)" />
                      )}
                      <span>{item.active ? 'Ativo' : 'Inativo'}</span>
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => onDeleteItem(item.id)}
                      style={{ padding: '0.4rem', color: '#e53e3e' }}
                      title="Excluir item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Scheduled Time Locks Section */}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} color="var(--primary-strawberry)" />
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>Bloqueio por Horário Programado:</strong>
                      <button
                        className="btn btn-secondary"
                        onClick={() => onUpdateItem({ ...item, scheduleEnabled: !item.scheduleEnabled })}
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}
                      >
                        {item.scheduleEnabled ? <ToggleRight size={16} color="var(--foliage-green)" /> : <ToggleLeft size={16} color="var(--text-secondary)" />}
                        {item.scheduleEnabled ? 'Ativado' : 'Desativado'}
                      </button>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => handleOpenAddWindow(item)}
                      style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', gap: '0.25rem' }}
                    >
                      <Plus size={14} /> Nova Faixa de Horário
                    </button>
                  </div>

                  {/* Scheduled Windows List */}
                  {windows.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0.25rem 0' }}>
                      Nenhuma faixa de horário cadastrada. Exemplo: Bloqueado das 22:00 às 07:00 todos os dias.
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {windows.map((tw) => {
                        const isCurrentlyActive = tw.active && item.scheduleEnabled && isScheduleWindowActive(tw.startTime, tw.endTime, tw.daysActive);

                        return (
                          <div
                            key={tw.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.6rem 0.85rem',
                              borderRadius: 'var(--radius-sm)',
                              background: isCurrentlyActive ? 'rgba(229, 62, 62, 0.12)' : 'rgba(0,0,0,0.03)',
                              border: `1px solid ${isCurrentlyActive ? '#e53e3e' : 'rgba(0,0,0,0.08)'}`,
                              flexWrap: 'wrap',
                              gap: '0.5rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <span
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: isCurrentlyActive ? '#e53e3e' : tw.active ? '#38a169' : '#a0aec0',
                                }}
                              />
                              <div>
                                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                  {tw.name || 'Faixa de Bloqueio'} ({tw.startTime} às {tw.endTime})
                                </strong>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  Dias: {formatDaysList(tw.daysActive)} {isCurrentlyActive && ' • 🔥 BLOQUEADO AGORA'}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <button
                                className="btn btn-secondary"
                                onClick={() => setSimulatedScheduleLock({ item, window: tw })}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', gap: '0.2rem' }}
                                title="Testar simulador de tela bloqueada por horário"
                              >
                                <Play size={13} color="var(--primary-strawberry)" /> Simular
                              </button>

                              <button
                                className="btn btn-secondary"
                                onClick={() => handleToggleWindowActive(item, tw.id)}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                {tw.active ? 'Ativo' : 'Inativo'}
                              </button>

                              <button
                                className="btn btn-secondary"
                                onClick={() => handleOpenEditWindow(item, tw)}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                <Edit2 size={13} />
                              </button>

                              <button
                                className="btn btn-secondary"
                                onClick={() => handleDeleteWindow(item, tw.id)}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#e53e3e' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Weekly Schedule Grid */}
      <div className="card">
        <div className="card-title">
          <Calendar color="var(--accent-gold)" size={22} />
          <span>Quadro de Programação Semanal</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Aplicativo / Site</th>
                {daysOfWeek.map((day) => (
                  <th
                    key={day.label}
                    style={{
                      padding: '0.75rem',
                      background: day.index === todayIndex ? 'var(--badge-bg)' : 'transparent',
                      color: day.index === todayIndex ? '#dd6b20' : 'inherit',
                      fontWeight: day.index === todayIndex ? 800 : 600,
                    }}
                  >
                    {day.label} {day.index === todayIndex ? '(Hoje)' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.monitoredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{item.name}</td>
                  {daysOfWeek.map((day) => {
                    const isWeekend = day.index === 0 || day.index === 6;
                    const limitForDay = isWeekend ? item.weekendLimit : item.weekdayLimit;
                    const isActive = item.active && item.daysActive.includes(day.index);

                    return (
                      <td
                        key={day.index}
                        style={{
                          padding: '0.75rem',
                          background: day.index === todayIndex ? 'rgba(254, 235, 200, 0.2)' : 'transparent',
                        }}
                      >
                        {isActive ? (
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {formatMinutesToHoursMin(limitForDay)}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>Livre</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Monitored Item Modal */}
      {(showAddModal || editingItem) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              {editingItem ? `Editar Limite: ${editingItem.name}` : 'Adicionar Aplicativo ou Site Monitorado'}
            </h3>

            <form onSubmit={editingItem ? handleEditSubmit : handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Nome do Recurso:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Instagram, YouTube, Reddit..."
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Tipo:
                  </label>
                  <select
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value as 'app' | 'site')}
                    style={{ width: '100%' }}
                  >
                    <option value="app">Aplicativo Mobile</option>
                    <option value="site">Website</option>
                  </select>
                </div>

                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Identificador / URL:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="com.instagram.android ou youtube.com"
                    value={itemIdentifier}
                    onChange={(e) => setItemIdentifier(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Hours and Minutes selector for Weekdays */}
              <div style={{ background: 'rgba(0,0,0,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Limite em Dias Úteis (Segunda a Sexta):
                </label>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Horas:</span>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={weekdayHours}
                      onChange={(e) => setWeekdayHours(Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Minutos:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      step="5"
                      value={weekdayMinutes}
                      onChange={(e) => setWeekdayMinutes(Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-strawberry)', marginTop: '0.4rem', fontWeight: 600 }}>
                  Duração Total: {formatMinutesToHoursMin(parseHoursMinutesToTotalMinutes(weekdayHours, weekdayMinutes))}
                </div>
              </div>

              {/* Hours and Minutes selector for Weekends */}
              <div style={{ background: 'rgba(0,0,0,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Limite em Fins de Semana (Sábado e Domingo):
                </label>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Horas:</span>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={weekendHours}
                      onChange={(e) => setWeekendHours(Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Minutos:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      step="5"
                      value={weekendMinutes}
                      onChange={(e) => setWeekendMinutes(Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-strawberry)', marginTop: '0.4rem', fontWeight: 600 }}>
                  Duração Total: {formatMinutesToHoursMin(parseHoursMinutesToTotalMinutes(weekendHours, weekendMinutes))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Limite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Scheduled Time Window Modal */}
      {scheduleModalItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {editingWindow ? 'Editar Faixa de Bloqueio por Horário' : 'Nova Faixa de Bloqueio por Horário'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Aplicativo: <strong>{scheduleModalItem.name}</strong>
            </p>

            <form onSubmit={handleSaveWindow} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Nome da Regra:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Bloqueio Noturno, Horário de Aula..."
                  value={windowName}
                  onChange={(e) => setWindowName(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Horário de Início (HH:mm):
                  </label>
                  <input
                    type="time"
                    required
                    value={windowStartTime}
                    onChange={(e) => setWindowStartTime(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Horário de Término (HH:mm):
                  </label>
                  <input
                    type="time"
                    required
                    value={windowEndTime}
                    onChange={(e) => setWindowEndTime(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Overnight Notice */}
              {windowStartTime > windowEndTime && (
                <div style={{ fontSize: '0.8rem', color: '#dd6b20', background: 'rgba(254, 235, 200, 0.4)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  🌙 <strong>Faixa Noturna Atravessando a Meia-Noite:</strong> O bloqueio começará às {windowStartTime} e terminará às {windowEndTime} do dia seguinte.
                </div>
              )}

              {/* Days of week picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Dias da Semana de Aplicação:
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {daysOfWeek.map((d) => {
                    const isSelected = windowDaysActive.includes(d.index);
                    return (
                      <button
                        key={d.index}
                        type="button"
                        className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => toggleDaySelection(d.index)}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', minWidth: '40px' }}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setScheduleModalItem(null);
                    setEditingWindow(null);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Faixa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scheduled Lock Simulation Test Modal */}
      {simulatedScheduleLock && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center', border: '2px solid #e53e3e' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⏰</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#e53e3e', marginBottom: '0.5rem' }}>
              Simulador de Bloqueio por Horário Programado
            </h3>
            <p style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              O aplicativo <strong>{simulatedScheduleLock.item.name}</strong> está bloqueado por regra de agenda!
            </p>

            <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div><strong>Regra:</strong> {simulatedScheduleLock.window.name}</div>
              <div><strong>Horário Programado:</strong> {simulatedScheduleLock.window.startTime} às {simulatedScheduleLock.window.endTime}</div>
              <div><strong>Dias Ativos:</strong> {formatDaysList(simulatedScheduleLock.window.daysActive)}</div>
              <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                💡 <em>Nota técnica: Esta é uma simulação interna do app StrawHat. No Android Studio, esta regra aciona a API nativa de acessibilidade/bloqueio.</em>
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setSimulatedScheduleLock(null)}>
              Fechar Simulação
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Warning Modal for Removing ALL Limits */}
      {showResetWarningModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center', border: '2px solid #e53e3e' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚠️</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#e53e3e', marginBottom: '0.5rem' }}>
              Atenção: Perda do Progresso da Fazenda!
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Ao remover ou desativar completamente os limites, conforme a regra de disciplina,{' '}
              <strong>sua fazenda será zerada</strong> (plantas voltam a broto e a sequência de dias é zerada).
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowResetWarningModal(false)}>
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onRemoveAllLimitsConfirmed();
                  setShowResetWarningModal(false);
                }}
              >
                Confirmar e Zerar Progresso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
