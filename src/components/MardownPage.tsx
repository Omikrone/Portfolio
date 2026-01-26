import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

import "highlight.js/styles/github-dark.css";

type MarkdownPageProps = {
  content: string;
};

const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8 pb-3 border-b-2 border-slate-700 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-5 pb-2 border-b border-slate-300 text-slate-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-slate-800">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-slate-700">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-slate-700">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base md:text-lg font-semibold mt-4 mb-2 text-slate-600">
        {children}
      </h6>
    ),

    p: ({ children }) => (
      <p className="leading-relaxed text-slate-700 mb-5 text-base md:text-lg">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),

    em: ({ children }) => (
      <em className="italic text-slate-700">{children}</em>
    ),

    ul: ({ children }) => (
      <ul className="list-none mb-6 space-y-2 ml-0">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 ml-4 text-slate-700">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="text-slate-700 text-base md:text-lg flex items-start">
        <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),

    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-slate-100 text-red-600 px-2 py-0.5 rounded text-sm font-mono border border-slate-200">
            {children}
          </code>
        );
      }
      return (
        <code className={className}>
          {children}
        </code>
      );
    },

    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg overflow-x-auto mb-6 border border-slate-700 shadow-lg">
        {children}
      </pre>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-slate-900 bg-slate-50 pl-6 pr-4 py-4 italic text-slate-600 my-6 rounded-r-lg">
        {children}
      </blockquote>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-900 font-medium underline decoration-2 decoration-slate-400 hover:decoration-slate-900 transition-colors duration-200"
      >
        {children}
      </a>
    ),

    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ""}
        className="rounded-xl shadow-2xl my-8 max-w-full h-auto border border-slate-200"
      />
    ),

    hr: () => (
      <hr className="my-10 border-t-2 border-slate-300" />
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full border-collapse border border-slate-300 rounded-lg overflow-hidden shadow-md">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-slate-900 text-white">
        {children}
      </thead>
    ),

    tbody: ({ children }) => (
      <tbody className="bg-white">
        {children}
      </tbody>
    ),

    tr: ({ children }) => (
      <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-6 py-4 text-slate-700">
        {children}
      </td>
    ),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownPage;
