import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data.data || []))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Courses</h2>
      <p>Learn music production, video editing, programming and more with our digital courses. Each course includes multiple lessons and lifetime access after purchase.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {courses.map(course => (
          <div key={course.id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3>{course.title}</h3>
            <p>{course.description?.substring(0, 100)}...</p>
            <p><strong>BDT {course.price}</strong></p>
            <Link href={`/courses/${course.slug}`}>View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
}