import { useState, useEffect, ReactNode } from "react";

import { rehype } from "~/lib/rehype";
import { slugify } from "~/lib/helpers";
import { Link } from "remix";

const parseTextHeaders = (html: Document) =>
  Array.from(html.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((headerItem) => {
    const text = headerItem.textContent || "";

    return {
      text,
      id: slugify(text),
      order: Number.parseInt(headerItem.tagName.replace(/h/i, "")) - 2
    };
  });

type State = {
  content: ReactNode;
  list: ReactNode;
};

const initialState = () => ({ content: null, list: null });

export function useProcessor(text: string) {
  const [Content, setContent] = useState<State>(initialState);

  useEffect(() => {
    (async () => {
      const file = await rehype(text);
      const html = new DOMParser().parseFromString(file.toString(), "text/html");

      const headers = parseTextHeaders(html);

      setContent({
        content: file.result as never,
        list: (
          <ul className="my-4">
            {headers.map((headerItem) => (
              <li key={`${headerItem.id}-${headerItem.order}`} className="my-2 text-sm underline underline-offset-4" data-order={headerItem.order}>
                <Link to={`#${headerItem.id}`}>{headerItem.text}</Link>
              </li>
            ))}
          </ul>
        )
      });
    })();
  }, [text]);

  return Content;
}
