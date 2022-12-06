import "./createRecipe.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//IMPORT ACTIONS
import { getDiets, createRecipes } from "../../Redux/actions";

const validate = (input) => {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.summary) {
    errors.summary = "Summary is required";
  }
  if (!input.type) {
    errors.type = "Type is required";
  }
  if (!input.healthScore) {
    errors.healthScore = "Health score is required";
  }
  if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "invalid score";
  }
  if (!input.steps) {
    errors.steps = "Steps is required";
  }
  return errors;
};



const CreateRecipe = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    type: "",
    image: "",
    healthScore: 1,
    steps: "",
    diets: [],
    /* createInDb: true, */
  });

  // (PREV) es un callback, es mucho mas seguro para el manejo del estado
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input)
  };

  const handleSelect = (e) => {
    /* e.preventDefault(); */
    setInput((prev) => ({
      ...prev,
      diets: [...input.diets, e.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.summary ||
      !input.type ||
      !input.healthScore ||
      !input.steps ||
      !input.diets
    ) {
      return alert("No se puede crear reseta, no hay datos !!!");
    } else {
      alert("Receta creada exitosamente !!!");
    }
    console.log(input);
    dispatch(createRecipes(input))
    setInput({
      name: "",
      summary: "",
      type: "",
      image: "",
      healthScore: 1,
      steps: "",
      diets: [],
     /*  createInDb: true, */
    });

    history.push('/home')
    dispatch(getDiets());
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((el) => el !== e),
    });
  };

  useEffect(() => {
    if (!diets.length) {
      dispatch(getDiets());
    }
  }, [dispatch]);


  return (
    <React.Fragment>
      <div>
        <div className="btn-vol">
          <Link to={"/home"}>
            <button className="vol">Volver</button>
          </Link>
        </div>

        <div className="content-general">
          <h1 className="title-recipe">Crea tu reseta</h1>

          <form className="formulario" onSubmit={handleSubmit}>
            <div className="divName">
              <label className="lab-name">Name: </label>
              <input
                className="inputAll"
                type="text"
                value={input.name}
                name="name"
                placeholder={"Nombre de la receta"}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className="errors">{errors.name}</p>}
            </div>

            <br />

            <div className="divSummary">
              <label className="lab-summary">Summary: </label>
              <input
                className="inputAll"
                type="text"
                value={input.summary}
                name="summary"
                onChange={(e) => handleChange(e)}
              />
              {errors.summary && <p className="errors">{errors.summary}</p>}
            </div>

            <br />

            <div className="divImage">
              <label className="lab-image">Image: </label>
              <input
                className="inputAll"
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <br />

            <div className="divType">
              <label className="lab-type">Type: </label>
              <input
                className="inputAll"
                type="text"
                value={input.type}
                name="type"
                onChange={(e) => handleChange(e)}
              />
              {errors.type && <p className="errors">{errors.type}</p>}
            </div>

            <br />

            <div className="divHs">
              <label className="lab-hs">Score: </label>
              <input
                className="inputAll"
                type="number"
                value={input.healthScore}
                name="healthScore"
                placeholder={"Numero entre 1 y 100"}
                onChange={(e) => handleChange(e)}
              />
              {errors.healthScore && (
                <p className="errors">{errors.healthScore}</p>
              )}
            </div>

            <br />

            <div className="divSteps">
              <label className="lab-steps">Steps: </label>
              <input
                className="inputAll"
                type="text"
                value={input.steps}
                name="steps"
                onChange={(e) => handleChange(e)}
              />
              {errors.steps && <p className="errors">{errors.steps}</p>}
            </div>

            <br />

            <div className="divDiets">
              <label>Diets: </label>
              <select
                name="diets"
                className="inputAll"
                onChange={(e) => handleSelect(e)}
              >
                {diets.length &&
                  diets.map((e) => (
                    <option key={e.name} value={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>

            {input.diets && input.diets.map((el, index) => (
              <div>
                <p key={index}>{el}</p>{" "}
                <button type="button" onClick={() => handleDelete(el)}>
                  X
                </button>
              </div>
            ))}

            {/* <ul>
              <li className="lii">{input.diets.map((e) => e.name + " - ")}</li>
            </ul> */}

            <button type="submit" className="btn-c">
              Crear receta
            </button>
          </form>

          {/* {input.diets.length > 0 &&
            input.diets.map((e, index) => (
              <div key={index} className="diet">
                <p>{e}</p>
                <button className="btn-x" onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateRecipe;