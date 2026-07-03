import React from 'react';
import BarGraphDiagram from '../shared/BarGraphDiagram.jsx';
import PictureGraphDiagram from '../shared/PictureGraphDiagram.jsx';
import DataTable from '../shared/DataTable.jsx';
import AxisDiagram from '../shared/AxisDiagram.jsx';
import LinePairDiagram from '../shared/LinePairDiagram.jsx';

export default function QuestionRenderer({ question, onAnswer, disabled, hintsShown }) {
  const { questionText, visual, options, categories, values, scale, icon, type } = question;

  return (
    <div>
      {/* Visual */}
      <div style={{ marginBottom: 14 }}>
        {visual === 'barGraph' && categories && (
          <BarGraphDiagram categories={categories} values={values} scale={scale}
            targetIndex={question.targetCategoryIndex}/>
        )}
        {visual === 'pictureGraph' && categories && (
          <PictureGraphDiagram categories={categories} values={values} scale={scale} icon={icon || '⭐'}/>
        )}
        {visual === 'table' && categories && (
          <DataTable categories={categories} values={values} scale={scale}/>
        )}
        {visual === 'axisDiagram' && <AxisDiagram errorHint={hintsShown > 0}/>}
        {visual === 'linePair' && <LinePairDiagram/>}
      </div>

      {/* Question text */}
      <div style={{
        fontFamily: 'var(--font-head)', fontSize: 'clamp(16px,2.5vw,20px)',
        color: 'var(--text-white)', textAlign: 'center', marginBottom: 16,
        lineHeight: 1.4, fontWeight: 900
      }}>
        {questionText}
      </div>

      {/* Options */}
      {options && (
        <div className="mcq-grid">
          {options.map((opt, i) => (
            <button key={i}
              className="mcq-btn"
              onClick={() => !disabled && onAnswer(opt)}
              disabled={disabled}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
