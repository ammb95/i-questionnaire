import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";

export default function UploadQuestions() {
  const handleChange = (target) => {
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = async function (progressEvent) {
      const lines = this.result.split("\n");
      const subjectName = file.name.slice(0, -4);

      const {
        data: { subject },
      } = await axios.post("http://localhost:3001/subjects", {
        title: subjectName,
      });

      const questions = lines.map((line, index) => ({
        number: index + 1,
        body: line,
        subject: subject._id,
      }));

      try {
        await Promise.all(
          questions.forEach(async (question) => {
            await axios.post("http://localhost:3001/questions", question);
          })
        );
      } catch (error) {
        console.log(`error`, error);
      }
    };

    reader.readAsText(file);

    target.value = null;

    // console.log(`questions`, questions);
  };

  return (
    <>
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <input
        accept=".txt"
        className={"d-none"}
        id="contained-button-file"
        multiple
        type="file"
        onChange={({ target }) => handleChange(target)}
      />
    </>
  );
}
