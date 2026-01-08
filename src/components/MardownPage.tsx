import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

type MarkdownPageProps = {
  content: string;
};

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-6 border-b pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-10 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-8 mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed text-gray-300 mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-gray-300">{children}</li>
          ),
          code: ({ children }) => {
            return (
            <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">
                {children}
            </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-6">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownPage;
