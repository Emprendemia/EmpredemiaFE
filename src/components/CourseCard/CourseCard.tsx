import { FC } from 'react';
import {
  CardWrapper,
  Image,
  Info,
  Title,
  Description,
  Footer,
  Hours,
  ViewButton
} from './style';
import { Course } from '../../interface/interface';

interface Props {
  course: Course;
  showState?: boolean;
}

const CourseCard: FC<Props> = ({ course, showState }) => {
  const {
    _id,
    title,
    description,
    image,
    hours,
    state
  } = course;

  return (
    <CardWrapper>
      {image && <Image src={image} alt={title} />}
      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Footer>
          {hours && <Hours>Duración: {hours}h</Hours>}
          {showState && state && (
            <span
              style={{
                backgroundColor:
                  state === 'published'
                    ? '#4CAF50'
                    : state === 'in_review'
                    ? '#FFC107'
                    : '#F44336',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}
            >
              {state === 'published'
                ? 'Publicado'
                : state === 'in_review'
                ? 'En Revisión'
                : 'De Baja'}
            </span>
          )}
        </Footer>
        <ViewButton to={`/course/${_id}`}>Ver curso</ViewButton>
      </Info>
    </CardWrapper>
  );
};

export default CourseCard;
