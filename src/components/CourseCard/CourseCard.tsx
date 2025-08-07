import { FC, useState } from 'react';
import {
  CardWrapper,
  Image,
  Info,
  Title,
  Description,
  Footer,
  Hours,
  ViewButton,
  MenuButton,
  DropdownMenu,
  CardTop
} from './style';
import { Course } from '../../interface/Interface';
import { useLocation } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

interface Props {
  course: Course;
  showState?: boolean;
  editable?: boolean;
  onEdit?: (course: Course) => void;
  onUpdateState?: (courseId: string, newState: string) => void;
}

const CourseCard: FC<Props> = ({ course, showState, editable, onEdit, onUpdateState }) => {
  const {
    _id,
    title,
    description,
    image,
    hours,
    state
  } = course;

  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const isTeacherRoute = location.pathname === '/teacher' || editable;

  return (
    <CardWrapper>
  {image && <Image src={image} alt={title} />} {/* imagen arriba */}

  {isTeacherRoute && (
    <CardTop> {/* menú hamburguesa encima */}
      <MenuButton onClick={() => setOpenDropdown(!openDropdown)}>
        <div></div>
      </MenuButton>
      {openDropdown && (
        <DropdownMenu>
          <button onClick={() => onEdit?.(course)}>Modificar</button>
          {state === 'published' || state === 'in_review' ? (
            <button onClick={() => onUpdateState?.(_id, 'inactive')}>Dar de baja</button>
          ) : (
            <button onClick={() => onUpdateState?.(_id, 'in_review')}>Poner en revisión</button>
          )}
        </DropdownMenu>
      )}
    </CardTop>
  )}

  <Info>
    <Title>{title}</Title>
    <Description>{description}</Description>

    <Footer>
      {hours && (
        <Hours>
          <FaClock style={{ marginRight: 6 }} />
          {hours}h
        </Hours>
      )}

      {showState && isTeacherRoute && state && (
        <span
          style={{
            backgroundColor:
              state === 'published' ? '#4CAF50' :
              state === 'in_review' ? '#FFC107' : '#F44336',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '0.75rem'
          }}
        >
          {state === 'published' ? 'Publicado' : state === 'in_review' ? 'En Revisión' : 'De Baja'}
        </span>
      )}
    </Footer>

    <ViewButton to={`/course/${_id}`}>Ver curso</ViewButton>
  </Info>
</CardWrapper>
  );
};

export default CourseCard;
