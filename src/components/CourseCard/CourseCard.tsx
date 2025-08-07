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
  CardTop,
  DeleteButton
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
  onDelete?: () => void;
}


const CourseCard: FC<Props> = ({
  course,
  showState,
  editable,
  onEdit,
  onUpdateState,
  onDelete
}) => {
  const { _id, title, description, image, hours, state } = course;
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const isTeacherRoute = location.pathname === '/teacher' || editable;

  console.log('Imagen del curso:', course.image);
  
  return (
    <CardWrapper>
      {image && <Image src={image} alt={title} />}

      {isTeacherRoute && (
        <CardTop>
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

      {onDelete && <DeleteButton onClick={onDelete}>✕</DeleteButton>}

      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Footer>
          {hours && (
            <Hours>
              <FaClock />
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
