import { MDXRemote } from 'next-mdx-remote/rsc';

export default function Page() {
  return (
    <div>
      <MDXRemote
        source={`# Hello World

        This is from Server Components!
        `}
      />
    </div>
  );
}
