import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CourseDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (!slug) return;
    axios.get(`http://localhost:5000/api/courses/${slug}`)
      .then(res => {
        setCourse(res.data.data);
      })
      .catch(err => console.error(err));
  }, [slug]);
  if (!course) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p><strong>Price:</strong> BDT {course.price}</p>
      <h3>Lessons</h3>
      <ul style={{ listStyle: 'decimal', paddingLeft: '1.5rem' }}>
        {course.lessons.map(lesson => (
          <li key={lesson.id} style={{ marginBottom: '0.5rem' }}>
            {lesson.title}
          </li>
        ))}
      </ul>
      <button onClick={() => alert('Checkout flow coming soon')}>Buy Course</button>
    </div>
  );
}