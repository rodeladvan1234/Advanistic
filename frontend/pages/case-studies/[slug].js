import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CaseStudyDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [caseStudy, setCaseStudy] = useState(null);
  useEffect(() => {
    if (!slug) return;
    axios.get(`http://localhost:5000/api/case-studies/${slug}`)
      .then(res => setCaseStudy(res.data.data))
      .catch(err => console.error(err));
  }, [slug]);
  if (!caseStudy) return <div className="container" style={{ padding: '2rem 0' }}><p>Loading...</p></div>;
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>{caseStudy.title}</h2>
      {caseStudy.media_url && <img src={caseStudy.media_url} alt={caseStudy.title} style={{ maxWidth: '500px', borderRadius: '8px' }} />}
      <p>{caseStudy.description}</p>
    </div>
  );
}