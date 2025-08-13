// app/components/Markdown.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

type Props = { content: string };

export default function Markdown({ content }: Props) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        // GFM (tables, strikethrough, task lists) + soft line breaks
        remarkPlugins={[remarkGfm, remarkBreaks]}
        // Syntax highlighting for fenced code blocks
        rehypePlugins={[rehypeHighlight]}
        // Optional: customize how tags render
        components={{
          a: ({ href = "", children, ...props }) => (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          code({  className, children, ...props }) {
            // Ensure <code> inside <pre> gets proper classes for hljs
            const hasLang = /language-/.test(className ?? "");
            return (
              <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 overflow-x-auto">
                <code className={hasLang ? className : "language-plaintext"} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          table: (props) => (
            <div className="not-prose overflow-x-auto">
              <table className="min-w-[40rem]" {...props} />
            </div>
          ),
          img: (props) => (
            // basic responsive images
            // For Next/Image integration, map to <Image> instead
            <img {...props} style={{ maxWidth: "100%", height: "auto" }} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
