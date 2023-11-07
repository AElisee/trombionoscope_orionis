import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import { fetchAsyncEmployees } from "../../redux/employee.Slice";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const employeesData = useSelector((state) => state.employees.employeesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncEmployees());
  }, [dispatch]);

  // Filtrer les employés pour la recherche
  const filteredEmployees = employeesData.filter((employee) => {
    const { lastName, firstName } = employee;
    const query = searchQuery.toLowerCase();

    return (
      lastName?.toLowerCase().includes(query) ||
      firstName?.toLowerCase().includes(query)
    );
  });
  return (
    <div className="searchComponent">
      <form className="search-form">
        <p>Rechercher : </p>
        <input
          type="text"
          placeholder="Par nom, prénom ou poste..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* section de recherche */}
      {searchQuery !== "" && (
        <div className="allEmployees search">
          <h3 className="section-title">Résultats de Recherche</h3>
          {filteredEmployees.length === 0 ? (
            <p className="search-notFound">
              Aucun résultat trouvé pour{" "}
              <span style={{ color: "#ef4444" }}>"{searchQuery}"</span>
            </p>
          ) : (
            <div className="card-container">
              {filteredEmployees.map((employee) => (
                <Link to={`/details/${employee.id}`} key={employee.id}>
                  <Card employee={employee} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
