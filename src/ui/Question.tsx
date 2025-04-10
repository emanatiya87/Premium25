import { QuestionType } from '../pages/Quiz';
import InputCol from './InputCol';
import InputGroup from './InputGroup';

interface QuestionProps {
  q: QuestionType;
}

const Question = ({ q }: QuestionProps) => {
  return (
    q.question?.length > 0 && (
      <div className='mb-4 mt-4'>
        <p className="font-medium mb-2">{q.question}</p>
        <InputGroup>
        <InputCol>
          <select name={`question_${q.id}`} className="w-full form-input">
            <option value={q.option_a} className="form-input">{q.option_a}</option>
            <option value={q.option_b} className="form-input">{q.option_b}</option>
            {q.option_c?.trim() && <option value={q.option_c} className="form-input">{q.option_c}</option>}
            {q.option_d?.trim() && <option value={q.option_d} className="form-input">{q.option_d}</option>}
          </select>
        </InputCol>
        </InputGroup>
      </div>
    )
  );
};

export default Question;
