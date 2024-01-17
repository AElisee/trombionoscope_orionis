import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import Widget from "../components/Widget";
import { useSelector } from "react-redux";
import { getAllDirections } from "../redux/feactures/direction.Slice";
import { getAllDepartments } from "../redux/feactures/department.Slice.js";
import PersonList from "../components/PersonList";
import { getAllCollaboraters } from "../redux/feactures/Collaborater.slice";
import { getAllServices } from "../redux/feactures/services.Slice.js";
import { getAllJobs } from "../redux/feactures/job.Slice";
import { getAllDirectors } from "../redux/feactures/director.Slice.js";

const Home = () => {
  const directions = useSelector(getAllDirections);
  const departements = useSelector(getAllDepartments);
  const services = useSelector(getAllServices);
  const jobs = useSelector(getAllJobs);
  const collaboraters = useSelector(getAllCollaboraters);
  const directors = useSelector(getAllDirectors);

  // recupère les dernières personne
  const lastRecording = collaboraters.slice(-10);

  return (
    <div className="home flex">
      <SideBar />
      <div className="homeContainer flex-8">
        <Topbar />
        <div className="p20">
          <div className="widget-ctn flex">
            <Widget title={"Directions"} data={directions} page="direction" />
            <Widget
              title={"Départments"}
              data={departements}
              page="departement"
            />
            <Widget title={"Services"} data={services} page="service" />
            <Widget title={"Postes"} data={jobs} page="poste" />
            <Widget
              title={"collaborateurs"}
              data={collaboraters}
              page="collaborateur"
            />
            <Widget title={"Directeurs"} data={directors} page="directeur" />
          </div>
          <div className="latest-col main-shadow">
            <h2 className="font-15">Derniers enregistrements</h2>
            <PersonList detailLink="collaborateur" data={lastRecording} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
