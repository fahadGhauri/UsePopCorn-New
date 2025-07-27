import "./styles.css";
import { useState } from "react";

export default function Project() {
  return (
    <div>
      <TextExpander
        collapsedNumWords={10}
        expandButtonText="Show text"
        collapseButtonText="Show Less"
        buttonColor="#1f09cd"
      >
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={10}
        expandButtonText="Show text"
        collapseButtonText="Show Less"
        buttonColor="#1f09cd"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander
        expanded={true}
        className="box"
        collapsedNumWords={10}
        expandButtonText="Show text"
        collapseButtonText="Show Less"
        buttonColor="#1f09cd"
      >
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords,
  collapseButtonText = "Show Less",
  expandButtonText = "Show More",
  buttonColor = "#1f09cd",
  expanded = false,
  className,
  children,
}) {
  const [isExpand, setIsExpand] = useState(expanded);

  const displayText = isExpand
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  const buttonstyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{displayText}</span>
      <button onClick={() => setIsExpand((e) => !e)} style={buttonstyle}>
        {isExpand ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
