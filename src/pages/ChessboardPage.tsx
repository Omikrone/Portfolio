import { useEffect, useState } from "react";
import MarkdownPage from "../components/MardownPage";

const ChessboardPage = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch("/content/projects/chessboard/report.md")
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return <MarkdownPage content={content} />;
};

export default ChessboardPage;
