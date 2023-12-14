import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import "./NotesSampler.css";

function NotesSampler({ inputSamples }) {
  const [sampler, setSampler] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);

  // sample of intruments
  const samples = [
    {
      name: "Casio",
      notes: ["A1", "A2", "B1", "C2", "D2"],
      url: "https://tonejs.github.io/audio/casio/",
    },
    {
      name: "Salamander",
      notes: ["A0", "A1", "A2", "A3", "A4"],
      url: "https://tonejs.github.io/audio/salamander/",
    },
  ];

  // const samples = inputSamples;

  
  // how to trigger the note for the second obj of samples?
  // loop the samples so that the notes can be trigger
  const loadSampler = () => {
    // let newSampler = new Tone.Sampler({
    //   urls: {
    //     A1: "A1.mp3",
    //     A2: "A2.mp3",
    //     B1: "B1.mp3",
    //     C2: "C2.mp3",
    //     D2: "D2.mp3",
    //   },

    //   // baseUrl can only use for different instruments sound
    //   baseUrl: "https://tonejs.github.io/audio/casio/",
    // }).toDestination();

    let urlsObj = {};
    if (selectedSample && selectedSample.notes) {
      selectedSample.notes.forEach((note) => {
        urlsObj[note] = `${note}.mp3`;
      });
    }

    let newSampler = new Tone.Sampler({
      urls: urlsObj,

      // baseUrl can only use for different instruments sound
      // checking if the selectedSample is a boolean
      baseUrl: selectedSample ? selectedSample.url : null,
    }).toDestination();
    setSampler(newSampler);
  };

  // sampler.onload = () => {
  //   sampler.triggerAttackRelease(["C3"]);
  // };

  useEffect(() => {
    loadSampler();
        // eslint-disable-next-line
  }, [selectedSample]);

  // select option of different notes
  function handleSelect(event) {
    const selected = samples.find((item) => item.name === event.target.value);
    setSelectedSample(selected);
    setNotes(selected.notes);
  }

  // note being able to play
  function handlePlay(note) {
    console.log(note);

    sampler.triggerAttackRelease([note], 1);
  }

  return (
    <div>
      <select className="select-sample" onChange={handleSelect}>
        <option>Select Sample</option>
        {samples.map((item) => (
          <option key={item.name}>{item.name}</option>
        ))}
      </select>

      {selectedSample &&
        notes.map((note, index) => (
          <div key={index}>
            <br />
            <button
              className="note-button"
              data-note={note}
              onClick={(event) => handlePlay(event.target.dataset.note)}
            >
              {note}
            </button>
          </div>
        ))}
    </div>
  );
}

export default NotesSampler;
