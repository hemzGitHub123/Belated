
import Memory from "./Memory";
import { useState } from "react";
import "./index.css";
import "./App.css";

function BirthdayStory() {
  const [page, setPage] = useState(0);
  const [showMemory, setShowMemory] = useState(false);

  const stories = [
    {
      label: "A LITTLE SURPRISE",
      title: "For You, Ragi ❤️",
      text: "Some people enter our lives unexpectedly...",
      subtext:
        "And somehow, they become a beautiful part of our story.",
    },

    {
      label: "THE BEGINNING",
      title: "It Started With You",
      text: "Every beautiful story has a beginning.",
      subtext:
        "Ours is made of conversations, laughter, silly moments, and memories that slowly became special.",
    },

    {
      label: "THE MEMORIES",
      title: "The Little Things",
      text: "Maybe it was never about the big moments.",
      subtext:
        "It was all those tiny moments that made us smile, laugh, and create memories worth keeping.",
    },

    {
      label: "THE JOURNEY",
      title: "Time Kept Moving...",
      text: "Days became months, and memories kept growing.",
      subtext:
        "Some moments fade with time. The special ones somehow stay.",
    },

    {
      label: "YOUR SPECIAL DAY",
      title: "Happy Birthday, Ragi 🎂",
      text: "Today is all about you.",
      subtext:
        "May this year bring you happiness, peace, beautiful memories, and everything your heart wishes for.",
      birthday: true,
    },

    {
      label: "ONE LAST THING",
      title: "I Kept Something For You ❤️",
      text: "Before this little story ends...",
      subtext:
        "There are a few moments I wanted you to see again. Not because they are perfect, but because they are ours.",
      memory: true,
    },
  ];

  const currentStory = stories[page];

  function nextPage() {
    if (page < stories.length - 1) {
      setPage(page + 1);
    }
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  /* =====================================================
     OPEN MEMORY SECTION
     ===================================================== */

  if (showMemory) {
    return <Memory />;
  }

  return (
    <div className="story-page">

      {/* =================================================
          SOFT BACKGROUND DECORATION
          ================================================= */}

      <div className="story-glow glow-one"></div>
      <div className="story-glow glow-two"></div>

      <div className="floating-heart heart-one">
        ❤️
      </div>

      <div className="floating-heart heart-two">
        ♡
      </div>

      <div className="floating-heart heart-three">
        ✦
      </div>


      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main className="story-content">

        {/* Progress */}

        <div className="story-progress-area">

          <p className="story-number">
            {String(page + 1).padStart(2, "0")}
            <span>/</span>
            {String(stories.length).padStart(2, "0")}
          </p>

          <div className="story-progress">
            <div
              className="story-progress-fill"
              style={{
                width: `${((page + 1) / stories.length) * 100}%`,
              }}
            ></div>
          </div>

        </div>


        {/* =================================================
            STORY CARD
            ================================================= */}

        <div
          className={`story-card ${
            currentStory.birthday ? "birthday-card" : ""
          } ${
            currentStory.memory ? "memory-card-intro" : ""
          }`}
        >

          {/* Small label */}

          <p className="story-small">
            {currentStory.label}
          </p>


          {/* Decorative line */}

          <div className="story-line"></div>


          {/* Title */}

          <h1 className="story-title">
            {currentStory.title}
          </h1>


          {/* Main text */}

          <p className="story-text">
            {currentStory.text}
          </p>


          {/* Supporting text */}

          <p className="story-subtext">
            {currentStory.subtext}
          </p>


          {/* Birthday decoration */}

          {currentStory.birthday && (
            <div className="birthday-message">
              <span>🎂</span>
              <span>✨</span>
              <span>❤️</span>
              <span>✨</span>
              <span>🎂</span>
            </div>
          )}


          {/* Memory decoration */}

          {currentStory.memory && (
            <div className="memory-teaser">

              <div className="memory-teaser-icon">
                ♡
              </div>

              <span>
                11 little memories
              </span>

            </div>
          )}

        </div>


        {/* =================================================
            NAVIGATION
            ================================================= */}

        <div className="story-navigation">

          {/* Previous */}

          <button
            className="story-arrow"
            onClick={previousPage}
            disabled={page === 0}
            aria-label="Previous"
          >
            ←
          </button>


          {/* Center action */}

          {currentStory.memory ? (

            <button
              className="story-main-button"
              onClick={() => setShowMemory(true)}
            >
              <span>
                Open our memories
              </span>

              <span className="button-arrow">
                →
              </span>
            </button>

          ) : (

            <button
              className="story-main-button"
              onClick={nextPage}
            >
              <span>
                Continue
              </span>

              <span className="button-arrow">
                →
              </span>
            </button>

          )}


          {/* Right side */}

          <div className="story-side-space">
            {page > 0 && (
              <span>
                {page === stories.length - 1
                  ? "The memories"
                  : "Keep reading"}
              </span>
            )}
          </div>

        </div>


        {/* =================================================
            CHAPTER INDICATORS
            ================================================= */}

        <div className="story-chapters">

          {stories.map((story, index) => (

            <button
              key={index}
              className={
                index === page
                  ? "chapter-dot active"
                  : "chapter-dot"
              }
              onClick={() => setPage(index)}
              aria-label={`Chapter ${index + 1}`}
            >

              <span></span>

            </button>

          ))}

        </div>


        {/* =================================================
            SMALL FOOTER
            ================================================= */}

        <p className="story-footer">
          made with a little love, just for you
        </p>

      </main>

    </div>
  );
}

export default BirthdayStory;

