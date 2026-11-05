import React, { useState } from 'react';
import { AppState, ThemeMode } from '../types';
import { StorageService } from '../services/storage';
import { Settings, HelpCircle, Download, Upload, RotateCcw, Trash2, FileText, Check, Moon, Sun, Monitor } from 'lucide-react';
import { GAME_CONFIG } from '../config/gameConfig';

interface SettingsScreenProps {
  state: AppState;
  onReplayTutorial: () => void;
  onResetFarm: () => void;
  onClearAllData: () => void;
  onImportData: (json: string) => void;
  onChangeThemeMode?: (mode: ThemeMode) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  state,
  onReplayTutorial,
  onResetFarm,
  onClearAllData,
  onImportData,
  onChangeThemeMode,
}) => {
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showConfirmResetFarm, setShowConfirmResetFarm] = useState(false);
  const [showConfirmClearAll, setShowConfirmClearAll] = useState(false);
  const [importText, setImportText] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportedJson = StorageService.exportJSON(state);

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText) return;
    onImportData(importText);
    setImportText('');
  };

  const currentThemeMode = state.themeMode || 'light';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title */}
      <div className="card">
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings color="var(--primary-strawberry)" size={24} />
          Configurações do Aplicativo
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Ajuste o modo de aparência (claro/escuro), gerencie o progresso local ou exporte seus dados.
        </p>
      </div>

      {/* Dark Mode / Appearance Settings */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Moon size={18} color="var(--primary-strawberry)" /> Modo de Aparência (Tema Visual)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <button
            className={`btn ${currentThemeMode === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onChangeThemeMode && onChangeThemeMode('light')}
            style={{ padding: '0.85rem', flexDirection: 'column', gap: '0.4rem' }}
          >
            <Sun size={24} color={currentThemeMode === 'light' ? '#FFF' : '#dd6b20'} />
            <span>Modo Claro</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>Visual brilhante padrão</span>
          </button>

          <button
            className={`btn ${currentThemeMode === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onChangeThemeMode && onChangeThemeMode('dark')}
            style={{ padding: '0.85rem', flexDirection: 'column', gap: '0.4rem' }}
          >
            <Moon size={24} color={currentThemeMode === 'dark' ? '#FFF' : '#9f7aea'} />
            <span>Modo Escuro</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>Fundo escuro e aconchegante</span>
          </button>

          <button
            className={`btn ${currentThemeMode === 'auto' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onChangeThemeMode && onChangeThemeMode('auto')}
            style={{ padding: '0.85rem', flexDirection: 'column', gap: '0.4rem' }}
          >
            <Monitor size={24} color={currentThemeMode === 'auto' ? '#FFF' : '#3182ce'} />
            <span>Automático (Sistema)</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>Segue preferencia do sistema</span>
          </button>
        </div>
      </div>

      {/* Main Settings Actions */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>Ações Rápidas</h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={onReplayTutorial} style={{ justifyContent: 'flex-start' }}>
            <HelpCircle size={18} color="var(--primary-strawberry)" /> Rever Tutorial Inicial
          </button>

          <button className="btn btn-secondary" onClick={() => setShowRulesModal(true)} style={{ justifyContent: 'flex-start' }}>
            <FileText size={18} color="var(--foliage-green)" /> Regras e Mecânicas Completas
          </button>

          <button className="btn btn-secondary" onClick={() => setShowExportModal(true)} style={{ justifyContent: 'flex-start' }}>
            <Download size={18} color="var(--accent-gold)" /> Exportar ou Importar Dados JSON
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ border: '1px solid #feb2b2', background: 'rgba(229, 62, 62, 0.05)' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#c53030', marginBottom: '1rem' }}>Zona de Perigo</h4>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => setShowConfirmResetFarm(true)} style={{ color: '#c53030' }}>
            <RotateCcw size={16} /> Reiniciar Progresso da Fazenda
          </button>

          <button className="btn btn-danger" onClick={() => setShowConfirmClearAll(true)}>
            <Trash2 size={16} /> Apagar Todos os Dados do Navegador
          </button>
        </div>
      </div>

      {/* Rules & Mechanics Modal */}
      {showRulesModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
              Manual Completo de Regras e Mecânicas 📜
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              <div>
                <strong>1. Estágios de Crescimento (Tempo Acumulado de Foco):</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                  {GAME_CONFIG.GROWTH_STAGES.map((stage) => (
                    <li key={stage.stage}>
                      {stage.icon} {stage.name}: {stage.requiredHours}h acumuladas
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>2. Raridades dos Frutos Colhidos:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                  {GAME_CONFIG.FRUIT_RARITIES.map((r) => (
                    <li key={r.rarity}>
                      {r.icon} {r.name}: {r.weight}% de chance = {r.coinValue} moedas
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>3. Bônus por Sequência de Disciplina:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                  {GAME_CONFIG.STREAK_BONUSES.map((b) => (
                    <li key={b.days}>
                      🔥 {b.days} dias consecutivos = +{b.bonusPercent}% de bônus de produção
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => setShowRulesModal(false)} style={{ marginTop: '1.5rem', width: '100%' }}>
              Fechar Manual
            </button>
          </div>
        </div>
      )}

      {/* Export / Import Modal */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Exportar ou Importar Dados JSON</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Dados Atuais (JSON):
              </label>
              <textarea
                readOnly
                value={exportedJson}
                rows={6}
                style={{
                  width: '100%',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  padding: '0.5rem',
                }}
              />
              <button className="btn btn-gold" onClick={handleCopyExport} style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.82rem' }}>
                {copied ? <Check size={16} /> : <Download size={16} />} {copied ? 'Copiado!' : 'Copiar JSON para Transferência'}
              </button>
            </div>

            <form onSubmit={handleImportSubmit}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Cole o JSON de Importação:
              </label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Cole aqui o backup em texto..."
                rows={4}
                style={{
                  width: '100%',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  padding: '0.5rem',
                }}
              />
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowExportModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={!importText}>
                  <Upload size={16} /> Restaurar Backup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Reset Farm Modal */}
      {showConfirmResetFarm && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Reiniciar Progresso da Fazenda?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Isso fará com que todos os canteiros voltem ao estágio inicial e a sequência seja zerada. Moedas e temas adquiridos serão mantidos.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirmResetFarm(false)}>
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onResetFarm();
                  setShowConfirmResetFarm(false);
                }}
              >
                Confirmar Reinício
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Clear All Data Modal */}
      {showConfirmClearAll && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center', border: '2px solid #e53e3e' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#e53e3e', marginBottom: '0.5rem' }}>
              Apagar Absolutamente Todos os Dados?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Esta ação apaga todo o progresso do aplicativo no seu navegador. Essa ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setShowConfirmClearAll(false)}>
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onClearAllData();
                  setShowConfirmClearAll(false);
                }}
              >
                Apagar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
