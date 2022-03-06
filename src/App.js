import { BrowserRouter, Route, Routes } from "react-router-dom";
// Todo refactor the filenames to define the login component on index file in ./pages/login/
import Login from "./Pages/login";
import Reset from "./Pages/reset";
import PageNotFound from "./Pages/common/errors/PageNotFound";
import Error from "./Pages/common/errors/Error";
import ChangePassword from "./Pages/changePassword";
import Projects from "./Pages/projects";
import ProjectsForm from "./Pages/projects/create";
import Resources from "./Pages/resources/index";
import ResourcesForm from "./Pages/resources/create";
import PendingApproval from "./Pages/projects/pendingApproval";
import Skillmodal from "./Components/Modals/SkillSet";
import Clients from "./Pages/clients";
import ClientsForm from "./Pages/clients/create";
import View from "./Pages/resources/view";
import ProjectView from "./Pages/projects/project-view";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import EditClientForm from "./Pages/clients/edit";
import ViewAccount from "./Pages/clients/view";

const queryClient = new QueryClient();

const env = process.env.NODE_ENV;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/skillmodal" element={<Skillmodal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/error" element={<Error />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/create-project" element={<ProjectsForm />} />
          <Route path="/employee" element={<Resources />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/create-employee" element={<ResourcesForm />} />
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="/employee/view" element={<View />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/client-form" element={<ClientsForm />} />
          <Route path="/editAccount/:id" element={<EditClientForm />} />
          <Route path="/viewAccounts/:id" element={<ViewAccount/>} />
          <Route path="/view-projects" element={<ProjectView />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {env === "development" && <ReactQueryDevtools />}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
