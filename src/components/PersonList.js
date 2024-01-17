import AddItem from "./AddItem";
import { BASEURL } from "../data/ApiUrl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncCollaboraters,
  getAllCollaboraters,
} from "../redux/feactures/Collaborater.slice";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid } from "@mui/x-data-grid";

const PersonList = ({ data, title, link, detailLink }) => {
  const collaboraters = useSelector(getAllCollaboraters);
  const dispatch = useDispatch();

  const handleDelete = async (personId) => {
    try {
      await axios.delete(`${BASEURL}colaborateur/${personId}`);
      dispatch(deleteAsyncCollaboraters());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "photo",
      headerName: <span className="bold-header">PHOTO</span>,
      width: 150,
      height: 50,
      renderCell: (params) => (
        <img
          src={
            params.value
              ? `${BASEURL}${params.value}`
              : "/images/default-image.jpg"
          }
          alt=""
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "360px",
            border: "1px solid #cbd5e1",
          }}
        />
      ),
    },
    {
      field: "nom",
      headerName: <span className="bold-header">NOM</span>,
      width: 150,
    },
    {
      field: "prenoms",
      headerName: <span className="bold-header">PRENOMS</span>,
      width: 200,
    },
    {
      field: "poste.title",
      headerName: <span className="bold-header">POSTE</span>,
      width: 250,
      renderCell: (params) => <span>{params.row.poste.title}</span>,
    },
    {
      field: "email",
      headerName: <span className="bold-header">EMAIL</span>,
      width: 200,
    },
    {
      field: "actions",
      headerName: <span className="bold-header">ACTIONS</span>,
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <Link
            to={
              detailLink ? `${detailLink}/${params.row.id}` : `${params.row.id}`
            }
            className="details"
          >
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
    <div className="list personList main-shadow">
      <div className="header flex flex-between">
        <h2>{title}</h2>
        <div className="add-btn-ctn">
          <AddItem link={link} />
        </div>
      </div>
      <div className="table-ctn">
        <DataGrid
          rows={data ? data : collaboraters}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default PersonList;
