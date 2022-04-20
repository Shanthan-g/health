import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "react-phone-input-2/lib/style.css";
import axios from "../common/config/AxiosConfig";

const Questionnaire = (props) => {
  
  const [response, setResponse] = useState(props.currentQuestionnaireAnswers);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(response);

  const handleQButton = (e, key) => {
    console.log(response);
    setResponse({ ...response, [key]: e.target.value });
  };

  useEffect(() => {
    setResponse(props.currentQuestionnaireAnswers);
  }, [props.currentQuestionnaireAnswers]);

  const func = (e) => {
    console.log(e);
    // props.setQuestionnaireInUse(false);
    let responses = {
      answers: response ? response : props.currentQuestionnaireAnswers,
      questionnaire: props.currentQuestionnaire[0],
    };
    props.setResponseList([...props.responseList, responses]);
    setIsSubmitted(true);

    //Send api call and use for next questionnaire
    console.log(responses);
    axios
      .post("/v1/response/",responses)
      .then((res) => {
        console.log(res.data);
        if(res.data.nextQuestionnaire !== "none")
        props.setQuestionnaireNames([...props.questionnaireNames, res.data.nextQuestionnaire]);
        else if(res.data.Diagnosis !== "none") {
          props.setDiagnosis(res.data.Diagnosis)
          props.setQuestionnaireInUse(false);
        }
        if (res.data.Diagnosis !== "none"){
          props.setDiagnosis(res.data.Diagnosis);
        }
        if ((res.data.Referral !== "none")){
          props.setReferTo(res.data.Referral);
          props.setQuestionnaireInUse(false);
        }
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
    // if (props.name === "Common")
    //   props.setQuestionnaireNames([...props.questionnaireNames, "Stroke1"]);
    // else
    //   props.setQuestionnaireNames([...props.questionnaireNames, "Epilepsy1"]);
  };

  useEffect(() => {
    // console.log(props.formValues.responses[props.id], props.id);
    props.view
      ? setResponse(props.formValues.responses[props.id].answers)
      : setResponse(props.currentQuestionnaireAnswers);
  }, [props.view]);
  useEffect(() => {
    console.log("Response is changed",response);
  }, [response]);

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "10px" }}
        className="heading"
      >
        {props.name + " Questionnaire"}
      </h1>
      <div style={{ maxWidth: "100%", margin: "auto" }}>
        <Grid
          container
          spacing={3}
          // direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {props.currentQuestionnaire.map((data, key) => {
            console.log(data);
            return (
              <fieldset style={{ border: "none" }} disabled={props.view}>
                <form>
                  {/* onSubmit={func} */}
                  <div style={{ maxWidth: "80%", margin: "auto" }}>
                    <Grid
                      container
                      spacing={3}
                      // direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {Object.entries(props.currentQuestionnaire[0].questions).map(
                        ([key, data]) => {
                          if (data.options.length === 0 && !props.view) {
                            return (
                              <>
                                <Grid item xs={9} sm={9} md={9} xl={9}>
                                  <h3>{data.question}</h3>
                                </Grid>
                                <Grid>
                                  <TextField
                                    variant="outlined"
                                    id="age"
                                    name="age"
                                    label="Age"
                                    type="text"
                                    style={{ width: "100%" }}
                                    value={props.patient.age}
                                  />
                                </Grid>
                              </>
                            );
                          }
                          if (data.options.length <= 3) {
                            {console.log(response[key])}
                            return (
                              <>
                                <Grid item xs={9} sm={9} md={9} xl={9}>
                                  <h3>{data.question}</h3>
                                </Grid>
                                <Grid>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      aria-labelledby="response"
                                      name="response"
                                      value={response ? response[key] : "NA"}
                                      onChange={(e) => handleQButton(e, key)}
                                    >
                                      {data.options
                                        .filter((option) => {
                                          return option !== "NA";
                                        })
                                        .map((option, itr) => {
                                          return (
                                            <>
                                              <FormControlLabel
                                                value={option}
                                                control={<Radio />}
                                                label={option}
                                                labelPlacement="top"
                                              />
                                            </>
                                          );
                                        })}
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </>
                            );
                          }

                          return (
                            <>
                              <Grid item xs={9} sm={9} md={9} xl={9}>
                                <h3>{data.question}</h3>
                              </Grid>
                              <Grid>
                                <TextField
                                  variant="outlined"
                                  name="selectOption"
                                  label="select option"
                                  value={response ? response[key] : "NA"}
                                  type="text"
                                  InputProps={{ readOnly: props.view }}
                                  select
                                  style={{ width: "200px" }}
                                  onChange={(e) => handleQButton(e, key)}
                                >
                                  {data.options.map((option, itr) => {
                                    return (
                                      <MenuItem value={option}>
                                        {option}
                                      </MenuItem>
                                    );
                                  })}
                                </TextField>
                              </Grid>
                            </>
                          );
                        }
                      )}
                    </Grid>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      maxWidth: "400px",
                      margin: "50px auto",
                    }}
                  >
                    <Button
                      style={
                        props.view || isSubmitted
                          ? { display: "none" }
                          : { width: "200px" }
                      }
                      variant="contained"
                      color="primary"
                      onClick={func}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </fieldset>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
export default Questionnaire;