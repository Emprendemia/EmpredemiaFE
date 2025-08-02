import { useEffect, useState } from 'react';
import {
    ModalOverlay,
    ModalContent,
    CloseButton,
    Title,
    CoursesGrid,
    CourseCard,
    CourseTitle,
    CourseDescription,
    PaginationWrapper,
    PageButton,
    CourseButton
} from './style';

interface Course {
    _id: string;
    title: string;
    description: string;
    category: string;
}

interface Props {
    category: string;
    onClose: () => void;
}

const CourseCategoryModal = ({ category, onClose }: Props) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL}/courses?category=${encodeURIComponent(category)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('No autorizado o error al obtener cursos');
            }

            const data = await res.json();
            if (!Array.isArray(data)) throw new Error('Respuesta inesperada del servidor');

            setCourses(data);
        } catch (err) {
            console.error('Error al obtener cursos por categoría:', err);
            setCourses([]); // Evita crash por `.slice` sobre undefined
        }
    };

    useEffect(() => {
        fetchCourses();
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [category]);


    const indexOfLast = currentPage * coursesPerPage;
    const indexOfFirst = indexOfLast - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Title>{category}</Title>
                <CoursesGrid>
                    {currentCourses.map((course) => (
                        <CourseCard key={course._id}>
                            <CourseTitle>{course.title}</CourseTitle>
                            <CourseDescription>{course.description}</CourseDescription>
                            <CourseButton onClick={() => window.location.href = `/course/${course._id}`}>
                                Ver curso
                            </CourseButton>
                        </CourseCard>
                    ))}
                </CoursesGrid>

                <PaginationWrapper>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PageButton key={i} onClick={() => setCurrentPage(i + 1)} disabled={currentPage === i + 1}>
                            {i + 1}
                        </PageButton>
                    ))}
                </PaginationWrapper>
            </ModalContent>
        </ModalOverlay>
    );
};

export default CourseCategoryModal;
