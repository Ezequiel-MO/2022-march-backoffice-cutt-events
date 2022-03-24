import baseAPI from "../../../axios/axiosConfig";
import { initialProject } from "../../../dev-data/project-data";

const ProjectSpecs = () => {
  const handleProjectCreate = async () => {
    try {
      await baseAPI.post("/v1/projects", initialProject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleProjectCreate}>Create a new project</button>
    </>
  );
};

export default ProjectSpecs;
