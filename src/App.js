import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: `https://github.com/1bertomelo/desafio-conceitos-react-nivel1`,
      techs: [".net", "nodejs", "reactjs"]
    });

    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);
    const repositorieIndex = repositories.findIndex(respositorie => respositorie.id == id);
    repositories.splice(repositorieIndex, 1);
    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
