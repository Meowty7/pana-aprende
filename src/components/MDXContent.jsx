import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import mdx1 from '../content/categorias/nivel-1-contexto.mdx';

const mdxFiles = {
  'mdx1': mdx1,
  // Add more MDX files as needed
};

const MDXContent = () => {
  const { slug } = useParams();

  const MDXComponent = mdxFiles[slug];

  if (!MDXComponent) {
    return <p>MDX file not found</p>;
  }

  return (
    <div>
      <MDXProvider>
        <MDXComponent />
      </MDXProvider>
    </div>
  );
};

export default MDXContent;
