import { useState, useEffect } from "react";

export function useTypingEffect(
  strings: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDelay = 2000
) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const i = loopNum % strings.length;
      const fullText = strings[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        nextSpeed = pauseDelay;
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        nextSpeed = 500;
      }

      timeout = setTimeout(handleTyping, nextSpeed);
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopNum, strings, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
}
