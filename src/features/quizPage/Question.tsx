import { ChangeEvent } from 'react';
import { QuestionType } from '../../pages/Quiz';
import InputCol from '../../ui/InputCol';
import InputGroup from '../../ui/InputGroup';
import { toast } from 'react-hot-toast';


interface QuestionProps {
  q: QuestionType;
  setOnChange: (id: number, value: string, index: string) => void;
  selected: string
}

const Question = ({ q, setOnChange, selected }: QuestionProps) => {
  const change = (e: ChangeEvent<HTMLSelectElement>) => {
    let index = e.target.selectedIndex;
    let val;
    switch (index) {
      case 1:
        val = "option_a";
        break;
      case 2:
        val = "option_b";
        break;
      case 3:
        val = "option_c";
        break;
      case 4:
        val = "option_d";
        break;
        case 5:
          val = "option_e";
          break;
      default:
        toast.error("Select an option please")
        break;
    }
    setOnChange(q.id, e.target.value, val as string);
    //console.log(q.id, e.target.value,"hi", e.target.selectedIndex, val);
  }

  return (
    (
      <div className='mb-4 mt-4'>
        {q.question?.length > 0 && <p className="font-medium mb-2">{q.question}</p>}
        {q.image_link && <img src={q.image_link} alt={q.question} width={400} className='mt-4' />}
        <InputGroup>
          <InputCol>
            <select
              value={selected || ""}
              name={`question_${q.id}`}
              className="w-full form-input"
              onChange={change}
            >
              <option value="" disabled>Choose an option</option>
              <option value={q.option_a} >{q.option_a}</option>
              <option value={q.option_b} >{q.option_b}</option>
              {q.option_c?.trim() && <option value={q.option_c} >{q.option_c}</option>}
              {q.option_d?.trim() && <option value={q.option_d} >{q.option_d}</option>}
              {q.option_d?.trim() && <option value={q.option_e} >{q.option_e}</option>}
            </select>
          </InputCol>
        </InputGroup>
      </div>
    )
  );
};

export default Question;
