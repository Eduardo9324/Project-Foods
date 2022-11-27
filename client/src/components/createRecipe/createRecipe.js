import "./createRecipe.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//IMPORT ACTIONS
import { getDiets, createRecipe, getAllRecipes } from "../../Redux/actions";

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
  if (!input.steps) {
    errors.steps = "Steps is required"; 
  }
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
    healthScore: 0,
    steps: "",
    image: "",
    diets: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input)
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(createRecipe(input))
    alert("Receta creada exitosamente !!!")
    setInput({
      name: "",
      summary: "",
      type: "",
      healthScore: 0,
      steps: "",
      image: "",
      diets: [],
    });

    history.push('/home')
    dispatch(getAllRecipes());
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((el) => el !== e),
    });
  };

  useEffect(() => {
    dispatch(getDiets())
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

          <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className="lab-name">Name</label>
              <input
                type={"text"}
                value={input.name}
                name="name"
                placeholder={"Nombre de la receta"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <br />

            <div className="summary">
              <label className="lab-summary">Summary</label>
              <input
                type={"text"}
                value={input.summary}
                name={"summary"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.summary && <p>{errors.summary}</p>}
            </div>

            <br />

            <div className="content-type">
              <label className="lab-type">Type: </label>
              <input
                type={"text"}
                value={input.type}
                name={"type"}
                onChange={(e) => handleChange(e)}
              />
              {errors.type && <p>{errors.type}</p>}
            </div>

            <br />

            <div className="hs">
              <label className="lab-hs">Health Score: </label>
              <input
                type={"number"}
                value={input.healthScore}
                name={"healthScore"}
                placeholder={"Numero entre 1 y 100"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.healthScore && <p>{errors.healthScore}</p>}
            </div>

            <br />

            <div className="steps">
              <label className="lab-steps">Steps</label>
              <input
                type={"text"}
                value={input.steps}
                name={"steps"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.steps && <p>{errors.steps}</p>}
            </div>

            <br />

            <div className="content-image">
              <label className="lab-image">Image: </label>
              <input
                type={"text"}
                value={input.image}
                name={"image"}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <br />

            <label>Diets</label>
            <select onChange={(e) => handleSelect(e)}>
              {diets?.map((e, index) => (
                <option key={index} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>

            <ul>
              <li>{input.diets.map((e) => e + " - ")}</li>
            </ul>

            <div className="btn-create">
              <button type={"submit"} className={"btn-c"}>
                Crear receta
              </button>
            </div>
          </form>

          {input.diets.length > 0 &&
            input.diets.map((e, index) => (
              <div key={index}>
                <p>{e}</p>
                <button className="btn-x" onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateRecipe;