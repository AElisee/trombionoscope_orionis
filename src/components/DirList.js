import AddItem from "./AddItem";
import axios from "axios";
import { BASEURL } from "../data/ApiUrl";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DirList = ({ title, link, data }) => {
  const handleDelete = async (dirId) => {
    const thisdirection = await data?.find(
      (dir) => parseInt(dir.id) === parseInt(dirId)
    );
    if (thisdirection.departement.length > 0) {
      alert("Vous ne pouvez pas suprimer ce élément !");
    } else
      try {
        await axios.delete(`${BASEURL}direction/${dirId}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  };

  const columns = [
    {
      field: "poste",
      headerName: <span className="bold-header">DIRECTION</span>,
      width: 400,
      renderCell: (params) => <span> {params.row.nom}</span>,
    },
    {
      field: "description",
      headerName: <span className="bold-header">DESCRIPTION</span>,
      width: 500,
      renderCell: (params) => <span>{params.row.description}</span>,
    },
    {
      field: "actions",
      headerName: <span className="bold-header">ACTIONS</span>,
      width: 200,
      renderCell: (params) => (
        <div className="actions">
          <Link to={`${params.row.id}`} className="details">
            <Tooltip title="Détails">
              <IconButton>
                <InfoIcon style={{ color: "#0c4a6e" }} />
              </IconButton>
            </Tooltip>
          </Link>
          <span className="delete" onClick={() => handleDelete(params.row.id)}>
            <Tooltip title="Supprimer">
              <IconButton>
                <DeleteIcon style={{ color: "" }} />
              </IconButton>
            </Tooltip>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="list main-shadow">
      <div className="header flex flex-between">
        <h2 className="font-13">{title}</h2>
        <div className="add-btn-ctn">
          <AddItem link={link} />
        </div>
      </div>
      <div className="table-ctn">
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default DirList;
